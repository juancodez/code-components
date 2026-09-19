@echo off
cd /d "%~dp0"
bun run build
start "" dist\index.html
