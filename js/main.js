var apmonths = [ "Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec." ];

function apDate(dateobj) {
    var d = new Date(dateobj), thisdate = apmonths[d.getMonth()] + " " + d.getUTCDate() + ", " + d.getFullYear();
    return thisdate;
  };
  
function collab(arr) {
    var linkAdd = [];
    $.each(arr, function(index, value) {
        linkAdd.push('<a href="http://www.twitter.com/' + value + '">@' + value + "</a>")
    });
    return linkAdd.join(" and ");
}

function tools(arr) {
    var formatted = [];
    $.each(arr, function(index, value) {
        formatted.push('#' + value);
    });
    return formatted.join('&emsp;');
};

_.templateSettings.variable = "banana";
var template = _.template($( "script.template" ).html());            
$('#projects').html(template( data ));

var container = document.querySelector('#projects');
var msnry;
imagesLoaded( container, function() {
  msnry = new Masonry( container, {
          columnWidth: 100,
          itemSelector: '.item'
        });
});

$('#projects').fadeIn();   