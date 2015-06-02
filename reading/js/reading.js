function slugify(text) {
  return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}

function womp(full) {
    var f = _(full).times(function() { return "<i class='fa fa-star'></i>" }).join('')
        , e = _(5-full).times(function() { return "<i class='fa fa-star-o'></i>" }).join('');
    return f+e;
};

$(document).ready(function() {
    $.getJSON('js/books.json').success(function(data) {
        var template = _.template($('#template').html());
        $('#output').html(template(data));
    }).then(function() {
        $('#loading').hide();
        $('#output').fadeIn('fast');
    }).fail(function() { alert("Sorry, something went wrong. Try reloading the page."); });
});