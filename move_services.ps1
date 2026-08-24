$lines = Get-Content 'index.html' -Encoding UTF8

$servicesStart = 642
$servicesEnd = 1056

$testimonialsStart = 1889

# Extract chunk
$chunk = $lines[$servicesStart..$servicesEnd]

# Process chunk colors
$newChunk = @()
foreach ($line in $chunk) {
    $l = $line

    # Button specific classes
    $l = $l -replace 'bg-\[#1B1717\] text-white', 'bg-white text-[#1B1717]'

    # Swap background colors
    $l = $l -replace 'bg-\[#EDEBDD\]', 'TEMP_BG_DARK'
    $l = $l -replace 'bg-\[#1B1717\]', 'TEMP_BG_LIGHT'
    $l = $l -replace 'TEMP_BG_DARK', 'bg-[#1B1717]'
    $l = $l -replace 'TEMP_BG_LIGHT', 'bg-[#EDEBDD]'

    # Swap text colors
    $l = $l -replace 'text-\[#1B1717\]', 'TEMP_TEXT_LIGHT'
    $l = $l -replace 'text-white', 'TEMP_TEXT_DARK'
    $l = $l -replace 'TEMP_TEXT_LIGHT', 'text-white'
    $l = $l -replace 'TEMP_TEXT_DARK', 'text-[#1B1717]'

    # Borders
    $l = $l -replace 'border-zinc-100', 'border-white/10'
    $l = $l -replace 'border-zinc-200', 'border-white/20'

    # Muted text
    $l = $l -replace 'text-zinc-600', 'text-zinc-400'

    $newChunk += $l
}

# Rebuild the file
$part1 = $lines[0..($servicesStart - 1)]
$part2 = $lines[($servicesEnd + 1)..($testimonialsStart - 1)]
$part3 = $newChunk
$part4 = $lines[$testimonialsStart..($lines.Count - 1)]

$final = $part1 + $part2 + $part3 + $part4

[System.IO.File]::WriteAllLines('index.html', $final, [System.Text.Encoding]::UTF8)
Write-Host "Done moving and restyling services section!"
