python map-parser.py

for f in *_visit.svg
do
    n=${f%.*}
    echo $n
    rsvg -w 960 $f -o $n.png
    rm $f
done
