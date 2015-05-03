import glob
import json

f = open('../js/mix.js', 'wb')
f.write('var songs = ')

s = []

for burrito in glob.glob("*.mp3"):
    dict = {}
    x = burrito.split(".mp3")
    y = x[0]
    z = y.split(" - ")
    z = y.split(" - ")
    track = z[0]
    artist = z[1]
    song = z[2]
    ext = x[1]
    dict['name'] = artist + " - " + song
    dict['file'] = "mp3/" + track + " - " + artist + " - " + song + ".mp3"
    s.append(dict)
    
f.write(json.dumps(s))

f.flush()
f.close()