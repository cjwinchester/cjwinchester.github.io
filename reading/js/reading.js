function ellipses(d) {
    return d === 1 ? '..' :
           d === 2 ? '...' :
           d === 3 ? '' :
                     '.';
}

var eldudebros = setInterval(function() {
    var el = document.getElementById('ellipses'),
        pses = ellipses(el.innerHTML.length);
    el.innerHTML = pses;
}, 200);

window.onload = eldudebros;

$.getJSON('js/books.json').success(function(data) {
    var template = _.template(document.getElementById('template').innerHTML);            
    document.getElementById('output').innerHTML = template(data);
}).then(function() {
    $('#loading').fadeOut('fast');
    $('#output').fadeIn('fast');
    clearInterval(eldudebros);
}).fail(function() { alert("Sorry, something went wrong. Try reloading the page."); });

function womp(full) {
    var f = _(full).times(function() { return "&starf;" }).join('')
        , e = _(5-full).times(function() { return "&star;" }).join('');
    return f+e;
};