$(document).ready(function() {
    $.getJSON('js/sets.json').success(function(data) {
            console.log(data);
            _.templateSettings.variable = "papaya";
            var template = _.template($( "script.template" ).html());
            $('#data').html(template( data ));
        }).then(function() {
            $('#loading').hide();
            $('#mainthing').fadeIn('fast');
        }).fail(function() {
            alert("Sorry, something went wrong. Try reloading the page.");
        });
});

var searchStyle = document.getElementById('search_style');
    document.getElementById('search').addEventListener('input', function() {
        if (!this.value) {
            searchStyle.innerHTML = "";
        return;
    }
        searchStyle.innerHTML = ".searchable:not([data-index*=\"" + this.value.toLowerCase() + "\"]) { display: none; }";
    });