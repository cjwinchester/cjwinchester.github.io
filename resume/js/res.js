var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

var getDate = function(x) {
    if (x) {
        var d = new Date(x), thisdate = months[d.getUTCMonth()] + " " + d.getUTCFullYear();
        return thisdate;
    } else {
        var d = new Date(), thisdate = months[d.getUTCMonth()] + " " + d.getUTCFullYear();
        return thisdate;
    };
};

$(document).ready(function() {
    $.getJSON('js/winchester-resume.json').success(function(data) {
        _.templateSettings.variable = "bananagram";
        var template = _.template($( "script.template" ).html());
        $('#out').html(template( data ));
    }).then(function() {
        $('#loading').hide();
        $('#main').fadeIn('fast');
    }).fail(function() {
        alert('Sorry, something went wrong. Try reloading the page.');
    });
});