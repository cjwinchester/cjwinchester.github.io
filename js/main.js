var con = "                                 .__                              \n" + "  ________________  ______  __ __|  |   ____   ____   ____  ____  \n" + "_/ ___\\_  __ \\__  \\ \\____ \\|  |  \\  | _/ __ \\ /    \\_/ ___\\/ __ \\ \n" + "\\  \\___|  | \\// __ \\|  |_> >  |  /  |_\\  ___/|   |  \\  \\__\\  ___/ \n" + " \\___  >__|  (____  /   __/|____/|____/\\___  >___|  /\\___  >___  >\n" + "     \\/           \\/|__|                   \\/     \\/     \\/    \\/ ";

console.log(con);

var apmonths = [ "Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec." ],
    backs = ['http://media.giphy.com/media/ToMjGpjvtPpCjbKjI2I/giphy.gif', 'http://media.giphy.com/media/UOFI4WxlLXVmg/giphy.gif', 'http://media.giphy.com/media/13PHkXLqgibfRC/giphy.gif', 'http://media.giphy.com/media/ToMjGplujsIS6kHzUPK/giphy.gif', 'http://media.giphy.com/media/aT6DAGys8Rt2U/giphy.gif', 'http://media.giphy.com/media/ToMjGpsUIlXEkRCmDdK/giphy.gif', 'http://media.giphy.com/media/5xtDarsbK3xLOABUFOM/giphy.gif', 'http://media.giphy.com/media/319NQsKn6ij16/giphy.gif', 'http://media.giphy.com/media/qcksgcyfZGWNq/giphy.gif'],    
    x = backs[Math.floor(Math.random() * backs.length)];

function apDate(dateobj) {
    var d = new Date(dateobj), thisdate = apmonths[d.getUTCMonth()] + " " + d.getUTCDate() + ", " + d.getUTCFullYear();
    return thisdate;
  };
  
function collab(arr) {
    var linkAdd = [];
    $.each(arr, function(index, value) {
        linkAdd.push('<a href="http://www.twitter.com/' + value + '">@' + value + "</a>")
    });
    return linkAdd.join(" and ");
};

function tools(arr) {
    var formatted = [];
    $.each(arr, function(index, value) {
        formatted.push('#' + value);
    });
    return formatted.join('&emsp;');
};

$(document).ready(function() {
    $.getJSON('js/projects.json').success(function(data) {
            _.templateSettings.variable = "banana";
            var template = _.template($( "script.template" ).html());
            $('#projects').html(template( data ));
        }).then(function() {
            $('#projects > div > p > a').each(function() {
            var acol = $(this).parent().parent().css("border-top-color");
                $(this).css('color', acol);        
            });
            $('#projects').css({
                'background': 'url("' + x + '")',
                'background-size': '100%'
                });
            $('#loading').hide();
            $('#namehed').bigtext().css('opacity',1.0);
            $('#projects').fadeIn('fast');
        }).fail(function() {
            alert("Sorry, something went wrong. Try reloading the page.");
        });
});

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