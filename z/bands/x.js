var bands = ['Studs McCallister and the Shinytown Plonkers','Groovy Dave Diamond\'s Willowstick Players','Captain Itchybottom\'s Electrothrash Revue','Percy Clamshell and the Paradiddle Terrorists','The Jugtown Stompers','Shitbiscuit','Crustfucker','Wendell Hargrove and His Purple Fingerlings','Velveeta Milkshake','Kidfiddle','Stinkthrust','Devon Helmshire and the Dewsbury Griddledicks','Shatterteeth','Glittercock','Duck Duck Noose','The Dork Rinds','Crunchbucket','Colby Judd and the Sasparilla Gang']

var albums = ['I & Wow! A pop tribute to the philosophy of Martin Buber','Noodlin\' on the Wu: A Jam Band Tribue to Method Man']

var a=b='';

for (i=0;i<bands.length;i++) {b+=['<h4>'+bands[i]+'</h4>'].join('');}
for (z=0;z<albums.length;z++) {a+=['<h4>'+albums[z]+'</h4>'].join('');}

document.getElementById('bands').innerHTML = '<h1>Bands I\'ve played in</h1>'+b;
document.getElementById('albums').innerHTML = '<h1>Albums I\'ve produced</h1>'+a;