import glob
import json

s = []

for item in glob.glob("*.mp3"):
    dict = {}
    x = item.split(".mp3")
    y = x[0]
    z = y.split("-")
    track = z[0].strip()
    artist = z[1].strip()
    song = z[2].strip()
    dict['track'] = track
    dict['artist'] = artist
    dict['song'] = song
    dict['file'] = "mp3/" + item
    s.append(dict)
    
with open('../js/goats.json', 'wb') as f:
    f.write(json.dumps(s))