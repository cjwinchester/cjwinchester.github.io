for %%f in (*.svg) do (
            inkscape %%~nf.svg -e %%~nf.png
    )