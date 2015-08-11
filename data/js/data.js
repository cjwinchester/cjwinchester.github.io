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
    
/*{"name":"Meatball surgery","updated":"8/9/2015","desc":"One of my favorite tropes from the sitcom M*A*S*H is when the surgeons amble out of the operating room, stretch, and say something like, \"Man, I'm beat. Eighteen hours of meatball surgery.\" Gets me every time. Anyway, Netflix has all 11 seasons now, so I watched all of them and kept track of every time I heard the phrase \"meatball surgery.\"","format":"json","url":"meatball-surgery.json"},*/