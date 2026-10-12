# Kill anything listening on -Port (and leftover Vite for this project). Always exits 0.
param(
  [Parameter(Mandatory = $true)]
  [int]$Port,
  [string]$ProjectRoot = ""
)

$ErrorActionPreference = "SilentlyContinue"

function Get-ListenPids([int]$p) {
  $ids = New-Object "System.Collections.Generic.HashSet[int]"
  try {
    Get-NetTCPConnection -LocalPort $p -State Listen -ErrorAction SilentlyContinue |
      ForEach-Object { [void]$ids.Add([int]$_.OwningProcess) }
  } catch {}

  netstat -ano 2>$null | ForEach-Object {
    $line = $_.ToString()
    if ($line -notmatch "LISTENING") { return }
    if ($line -notmatch (":$p\s")) { return }
    if ($line -match "\s(\d+)\s*$") { [void]$ids.Add([int]$Matches[1]) }
  }
  return @($ids | Where-Object { $_ -gt 0 })
}

function Stop-Tree([int]$procId) {
  if ($procId -le 0) { return }
  & taskkill.exe /F /T /PID $procId 2>$null | Out-Null
  Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
}

Write-Host "[..] Closing old game server on port $Port ..."

for ($round = 1; $round -le 5; $round++) {
  $pids = Get-ListenPids $Port
  if (-not $pids -or $pids.Count -eq 0) { break }
  foreach ($id in $pids) {
    Write-Host "    closing PID $id"
    Stop-Tree $id
  }
  Start-Sleep -Milliseconds 400
}

if ($ProjectRoot) {
  $root = [IO.Path]::GetFullPath($ProjectRoot).TrimEnd("\", "/")
  $rootEsc = [regex]::Escape($root)
  Get-CimInstance Win32_Process -Filter "Name = 'node.exe'" -ErrorAction SilentlyContinue | ForEach-Object {
    $cmd = $_.CommandLine
    if (-not $cmd) { return }
    if ($cmd -notmatch $rootEsc) { return }
    if ($cmd -notmatch "vite") { return }
    Write-Host "    closing leftover $($_.ProcessId)"
    Stop-Tree ([int]$_.ProcessId)
  }
}

Start-Sleep -Milliseconds 500

$left = Get-ListenPids $Port
if ($left -and $left.Count -gt 0) {
  Write-Host "[!] Port $Port still busy after cleanup - will retry at launch."
} else {
  Write-Host "[OK] Port $Port is clear."
}

exit 0
