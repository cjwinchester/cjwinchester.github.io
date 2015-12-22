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
    track = z[0]
    song = z[1]
    dict['name'] = song
    dict['track'] = int(track)
    dict['file'] = "mp3/" + burrito
    s.append(dict)

sort = sorted(s, key=lambda k: k['track']) 
 
f.write(json.dumps(sort))

f.flush()
f.close()
