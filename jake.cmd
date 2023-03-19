@echo off

if not exist node_modules\simplebuild-karma goto :npm_rebuild

if exist node_modules\.bin\jake goto :run_jake

:npm_rebuild
echo Building npm modules:
call npm install
call npm rebuild

:run_jake
call node_modules\.bin\jake %*
