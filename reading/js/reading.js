function ellipses(d) {
    return d === 1 ? '..' :
           d === 2 ? '...' :
           d === 3 ? '' :
                     '.';
};

function slugify(text) {
  return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}

function womp(full) {
    var f = _(full).times(function() { return "<i class='fa fa-star'></i>" }).join('')
        , e = _(5-full).times(function() { return "<i class='fa fa-star-o'></i>" }).join('');
    return f+e;
};

var eldudebros = setInterval(function() {
    var el = document.getElementById('ellipses'),
        pses = ellipses(el.innerHTML.length);
    el.innerHTML = pses;
}, 200);

$(document).ready(function() {
    eldudebros;
    $.getJSON('js/books.json').success(function(data) {
        var template = _.template($('#template').html());
        $('#output').html(template(data));
    }).then(function() {
        $('#loading').fadeOut('fast');
        $('#output').fadeIn('fast');
        clearInterval(eldudebros);
    }).fail(function() { alert("Sorry, something went wrong. Try reloading the page."); });
});