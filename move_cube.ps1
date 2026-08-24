$lines = Get-Content 'index.html' -Encoding UTF8

$servicesStart = 1474
$servicesEnd = 1799
$carouselEnd = 639

# Extract chunk
$chunk = $lines[$servicesStart..$servicesEnd]

# Revert chunk colors
$newChunk = @()
foreach ($line in $chunk) {
    $l = $line

    $l = $l -replace 'bg-\[#1B1717\]', 'bg-[#EDEBDD]'
    $l = $l -replace 'text-white', 'text-[#1B1717]'
    $l = $l -replace 'border-white/10', 'border-zinc-100'
    $l = $l -replace 'border-white/20', 'border-zinc-200'
    $l = $l -replace 'text-zinc-400', 'text-zinc-600'

    $newChunk += $l
}

# Rebuild the file
# We are moving it UP from 1474 to 640.
$part1 = $lines[0..$carouselEnd]
$part2 = $newChunk
$part3 = $lines[($carouselEnd + 1)..($servicesStart - 1)]
$part4 = $lines[($servicesEnd + 1)..($lines.Count - 1)]

$final = $part1 + $part2 + $part3 + $part4

[System.IO.File]::WriteAllLines('index.html', $final, [System.Text.Encoding]::UTF8)
Write-Host "Done moving cube section back!"
