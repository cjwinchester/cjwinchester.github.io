import glob

f = open('../js/main.js', 'wb')

pre = '$(document).ready(function(){new jPlayerPlaylist({jPlayer: "#jquery_jplayer_1", cssSelectorAncestor: "#jp_container_1"}, ['

f.write(pre)

s = []

for burrito in glob.glob("*.mp3"):
    x = burrito.split(".")
    y = x[0]
    z = y.split(" - ")
    z = y.split(" - ")
    track = z[0]
    artist = z[1]
    song = z[2]
    ext = x[1]
    msg = '{title: "' + artist + " - " + song + '", free:true, mp3:"mp3/' + track + " - " + artist + " - " + song + "." + ext + '"}'
    s.append(msg)
    
f.write(",".join(s))
 
post = '], {swfPath: "js",supplied: "mp3",wmode: "window"});});' 

f.write(post)
 
f.flush()
f.close()