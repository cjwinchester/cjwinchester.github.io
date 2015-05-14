var apmonths = [ "Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec." ];

var backs = ['waves.gif','feet.gif','lines.gif'];

var x = backs[Math.floor(Math.random() * backs.length)];

$('#projects').css({
    'background': 'url("../img/' + x + 'waves.gif")',
    'background-size': '100% 100%'
    });

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

$('#namehed').bigtext();

_.templateSettings.variable = "banana";
var template = _.template($( "script.template" ).html());            
$('#projects').html(template( data ));

$('#projects > div > p > a').each(function() {
    var acol = $(this).parent().parent().css("border-top-color");
    $(this).css('color', acol);        
});

$('#projects').fadeIn();

$('.clicker').click(function() {
    var buttclass = ($(this).children('i').attr('class'));
    var ent = $(this).attr('id');
        if (buttclass.indexOf("check") > -1 == true)
            { $(this).children('i').attr('class', 'fa fa-circle-o') 
            $('.' + ent).fadeOut(200);
            $(this).css('opacity', 0.6);
            }
        else
            { $(this).children('i').attr('class', 'fa fa-check-circle-o');
            $('.' + ent).fadeIn(200);
            $(this).css('opacity', 1.0);
            }
});