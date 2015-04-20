@echo off
python map-parser.py
for %%f in (*.svg) do (
            ( echo "%%f" | FIND /I "state" 1>NUL ) || ( inkscape %%~nf.svg -e %%~nf.png )
            ( echo "%%f" | FIND /I "state" 1>NUL ) || ( del %%~nf.svg )
    )