# serve.ps1 — Fast static server: HTTP caching + byte-range video streaming
param (
    [int]$Port = 3000,
    [string]$DocumentRoot = ""
)

# ── Resolve document root ────────────────────────────────────────────────────
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $ScriptDir) { $ScriptDir = $PSScriptRoot }
if (-not $ScriptDir) { $ScriptDir = (Get-Item -Path ".\").FullName }

if ([string]::IsNullOrEmpty($DocumentRoot)) {
    $DocumentRoot = if ((Split-Path -Leaf $ScriptDir) -eq "scratch") {
        Split-Path -Parent $ScriptDir
    } else { $ScriptDir }
}

Write-Host "Starting local web server..." -ForegroundColor Cyan
Write-Host "Document Root: $DocumentRoot" -ForegroundColor Cyan

# ── Find a free port ─────────────────────────────────────────────────────────
$listener = New-Object System.Net.HttpListener
$bound = $false
while (-not $bound -and $Port -lt 65535) {
    try {
        $listener.Prefixes.Clear()
        $listener.Prefixes.Add("http://localhost:$Port/")
        $listener.Start()
        $bound = $true
    } catch {
        Write-Host "Port $Port in use, trying $($Port+1)..." -ForegroundColor Yellow
        $Port++
    }
}
if (-not $bound) { Write-Error "No free port found."; exit 1 }

$url = "http://localhost:$Port/"
Write-Host "Server running at: $url" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop.`n" -ForegroundColor Yellow
try { Start-Process $url } catch {}

# ── MIME types ───────────────────────────────────────────────────────────────
$mimeTypes = @{
    ".html"=   "text/html; charset=utf-8"; ".htm"="text/html; charset=utf-8"
    ".css"=    "text/css";                  ".js"="application/javascript"
    ".mjs"=    "application/javascript";    ".json"="application/json"
    ".png"=    "image/png";                 ".jpg"="image/jpeg"
    ".jpeg"=   "image/jpeg";                ".gif"="image/gif"
    ".webp"=   "image/webp";                ".svg"="image/svg+xml"
    ".mp4"=    "video/mp4";                 ".webm"="video/webm"
    ".ico"=    "image/x-icon";              ".woff"="font/woff"
    ".woff2"=  "font/woff2";               ".ttf"="font/ttf"
    ".otf"=    "font/otf"
}

$cacheableExts = @(".webp",".png",".jpg",".jpeg",".gif",".svg",".mp4",".webm",".woff",".woff2",".ttf",".otf",".ico")
$CHUNK = 512 * 1024   # 512 KB streaming chunk

# ── Request handler ──────────────────────────────────────────────────────────
function Invoke-Request($ctx) {
    $req = $ctx.Request
    $res = $ctx.Response

    try {
        $rawPath = $req.Url.LocalPath
        if ($rawPath -eq "/") { $rawPath = "/index.html" }

        $relPath = [System.Uri]::UnescapeDataString(
            $rawPath.TrimStart('/').Replace('/', [IO.Path]::DirectorySeparatorChar))

        # File resolution: root → public/ → .html extension
        $fp = [IO.Path]::Combine($DocumentRoot, $relPath)
        if (!(Test-Path $fp -PathType Leaf)) {
            $pub = [IO.Path]::Combine($DocumentRoot, "public", $relPath)
            if (Test-Path $pub -PathType Leaf) { $fp = $pub }
        }
        if (!(Test-Path $fp -PathType Leaf)) {
            foreach ($c in @($fp+".html", [IO.Path]::Combine($DocumentRoot,"public",$relPath+".html"))) {
                if (Test-Path $c -PathType Leaf) { $fp = $c; break }
            }
        }
        if (!(Test-Path $fp -PathType Leaf)) {
            $res.StatusCode = 404
            $b = [Text.Encoding]::UTF8.GetBytes("404 Not Found: $rawPath")
            $res.ContentLength64 = $b.Length
            $res.OutputStream.Write($b, 0, $b.Length)
            Write-Host "  404 $rawPath" -ForegroundColor Yellow
            return
        }

        # MIME
        $ext  = [IO.Path]::GetExtension($fp).ToLower()
        $mime = if ($mimeTypes[$ext]) { $mimeTypes[$ext] } else { "application/octet-stream" }

        # ETag + Last-Modified
        $fi      = Get-Item $fp
        $lastMod = $fi.LastWriteTimeUtc
        $etag    = '"' + $fi.Length + '-' + $lastMod.Ticks.ToString("x") + '"'
        $size    = $fi.Length

        # Cache-Control
        $res.Headers["ETag"]          = $etag
        $res.Headers["Last-Modified"] = $lastMod.ToString("R")
        $res.Headers["Accept-Ranges"] = "bytes"
        if ($cacheableExts -contains $ext) {
            $res.Headers["Cache-Control"] = "public, max-age=604800, must-revalidate"
        } else {
            $res.Headers["Cache-Control"] = "no-cache"
        }

        # 304 Not Modified?
        $ifNone = $req.Headers["If-None-Match"]
        $ifMod  = $req.Headers["If-Modified-Since"]
        $hit304 = $false
        if ($ifNone -and $ifNone -eq $etag) { $hit304 = $true }
        elseif ($ifMod -and !$ifNone) {
            try {
                $cd = [DateTime]::ParseExact($ifMod,"R",
                    [Globalization.CultureInfo]::InvariantCulture,
                    [Globalization.DateTimeStyles]::AssumeUniversal).ToUniversalTime()
                if ($lastMod -le $cd) { $hit304 = $true }
            } catch {}
        }
        if ($hit304) {
            $res.StatusCode = 304
            Write-Host "  304 $rawPath" -ForegroundColor DarkGray
            return
        }

        # Byte-Range support (206 Partial Content for videos)
        $rh    = $req.Headers["Range"]
        $rFrom = 0L; $rTo = $size - 1L; $isRange = $false
        if ($rh -and $rh -match "bytes=(\d+)-(\d*)") {
            $isRange = $true
            $rFrom   = [long]$Matches[1]
            $rTo     = if ($Matches[2]) { [long]$Matches[2] } else { $size - 1L }
            if ($rTo -ge $size) { $rTo = $size - 1L }
        }

        $sendLen = $rTo - $rFrom + 1L
        $res.ContentType     = $mime
        $res.ContentLength64 = $sendLen
        if ($isRange) {
            $res.StatusCode = 206
            $res.AddHeader("Content-Range", "bytes $rFrom-$rTo/$size")
        } else {
            $res.StatusCode = 200
        }

        # Stream in chunks — never loads entire video into RAM
        $fs = [IO.File]::OpenRead($fp)
        try {
            if ($rFrom -gt 0) { [void]$fs.Seek($rFrom, [IO.SeekOrigin]::Begin) }
            $buf  = New-Object byte[] $CHUNK
            $left = $sendLen
            while ($left -gt 0) {
                $n = $fs.Read($buf, 0, [Math]::Min($CHUNK, $left))
                if ($n -le 0) { break }
                $res.OutputStream.Write($buf, 0, $n)
                $left -= $n
            }
            $code = if ($isRange) { "206" } else { "200" }
            Write-Host "  $code $rawPath" -ForegroundColor Green
        } finally {
            $fs.Close()
        }

    } catch {
        try {
            $res.StatusCode = 500
            $b = [Text.Encoding]::UTF8.GetBytes("500 Error: $_")
            $res.ContentLength64 = $b.Length
            $res.OutputStream.Write($b, 0, $b.Length)
        } catch {}
        Write-Host "  500 $($req.Url.LocalPath)" -ForegroundColor Red
    } finally {
        try { $res.Close() } catch {}
    }
}

# ── Main loop — synchronous but fast: 304s return instantly, streams chunk ──
try {
    while ($listener.IsListening) {
        try {
            $ctx = $listener.GetContext()
            Invoke-Request $ctx
        } catch [System.Net.HttpListenerException] {
            # Listener was stopped (Ctrl+C)
            break
        } catch {
            Write-Host "  Loop error: $_" -ForegroundColor Red
        }
    }
} finally {
    $listener.Stop()
    Write-Host "`nServer stopped." -ForegroundColor Yellow
}
