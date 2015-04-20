var template = _.template($('#template').html());
$('#output').html(template(recipes));

function joinBr(x) {
    return x.join('<br>');
}

$('input[type=checkbox]').change(function() {
    var that = this.id;
    if (this.checked) {
        $('.' + that).fadeIn('fast');
    }
    else {
        $('.' + that).fadeOut('fast');
    }
});

/*
var searchStyle = document.getElementById('search_style');
document.getElementById('search').addEventListener('input', function() {
    if (!this.value) {
        searchStyle.innerHTML = "";
        return;
    }
    searchStyle.innerHTML = ".searchable:not([data-index*=\"" + this.value.toLowerCase() + "\"]) { display: none; }";
});

document.getElementById('search').focus();
*/