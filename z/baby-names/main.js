var letters=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    , names=['Arthur','Elliott','Ervin','Abel','Albert','Akron','Miles','Gabriel','Larry','Ward','Walker','Ambrose','Kenneth','Kurt','Norman','Alejandro','Alvin','Anthony','Quincy'];

for (i=0;i<letters.length;i++) {
    var x = document.getElementById('names');
    var y = document.createElement('div');
    y.setAttribute('id', letters[i]);
    y.setAttribute('class', 'namerdude');
    y.innerHTML += '<h1 style="margin-bottom:5px;">' + letters[i] + '</h1>';
    x.appendChild(y);
}

for (i=0;i<names.length;i++) {
    var q = document.getElementsByClassName('namerdude')
        , first = names[i].split("")[0].toUpperCase();
    for (z=0;z<q.length;z++) {
        if (first === q[z].id) {
            q[z].innerHTML += names[i] + '<br>';
        }
    }
}