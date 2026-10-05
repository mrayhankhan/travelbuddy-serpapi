$output = & node test_scoring.js
$output | Out-File -FilePath "test_output.txt" -Encoding UTF8
Write-Host "Done. Output saved to test_output.txt"
