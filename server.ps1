$port = 8000
$root = $pwd.Path
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Listening on http://localhost:$port/"
while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    $path = $request.Url.LocalPath
    if ($path -eq "/") { $path = "/index.html" }
    
    # Secure path to prevent directory traversal
    $filepath = Join-Path $root $path.TrimStart('/')
    
    if (Test-Path $filepath -PathType Leaf) {
        $bytes = [System.IO.File]::ReadAllBytes($filepath)
        $response.ContentLength64 = $bytes.Length
        
        $ext = [System.IO.Path]::GetExtension($filepath).ToLower()
        $contentType = "application/octet-stream"
        switch ($ext) {
            ".html" { $contentType = "text/html" }
            ".css"  { $contentType = "text/css" }
            ".js"   { $contentType = "application/javascript" }
            ".mjs"  { $contentType = "application/javascript" }
            ".png"  { $contentType = "image/png" }
            ".jpg"  { $contentType = "image/jpeg" }
            ".jpeg" { $contentType = "image/jpeg" }
            ".webp" { $contentType = "image/webp" }
            ".svg"  { $contentType = "image/svg+xml" }
            ".json" { $contentType = "application/json" }
            ".woff" { $contentType = "font/woff" }
            ".woff2"{ $contentType = "font/woff2" }
        }
        $response.ContentType = $contentType
        
        try {
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } catch {
            # Client might have disconnected
        }
    } else {
        $response.StatusCode = 404
    }
    $response.Close()
}
