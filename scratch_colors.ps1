Add-Type -AssemblyName System.Drawing
$img1 = [System.Drawing.Bitmap]::FromFile('C:\Users\HP\.gemini\antigravity\brain\46141a19-663a-467d-a914-c18387836aa1\media__1777496900153.png')
$img2 = [System.Drawing.Bitmap]::FromFile('C:\Users\HP\.gemini\antigravity\brain\46141a19-663a-467d-a914-c18387836aa1\media__1777496903326.png')
$c1 = $img1.GetPixel(0,0)
$c2 = $img2.GetPixel(0,0)
$hex1 = "#{0:X2}{1:X2}{2:X2}" -f $c1.R, $c1.G, $c1.B
$hex2 = "#{0:X2}{1:X2}{2:X2}" -f $c2.R, $c2.G, $c2.B
Write-Host "Color 1: $hex1"
Write-Host "Color 2: $hex2"
