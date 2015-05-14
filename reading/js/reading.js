$(document).ready(function() {
    $.getJSON('js/books.json').success(function(data) {
        var template = _.template(document.getElementById('template').innerHTML);            
        document.getElementById('output').innerHTML = template(data);
    }).then(function() {
        $('#loading').fadeOut('fast');
        $('#output').fadeIn('fast');
    }).fail(function() { alert("Sorry, something went wrong. Try reloading the page."); });;
});

function womp(full) {
    var f = _(full).times(function() { return "&starf;" }).join('')
        , e = _(5-full).times(function() { return "&star;" }).join('');
    return f+e;
};