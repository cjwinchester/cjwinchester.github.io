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

$('#projects > div > p > a').each(function() {
    var acol = $(this).parent().parent().css("border-left-color");
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

	var searchStyle = document.getElementById('search_style');
		document.getElementById('search').addEventListener('input', function() {
			if (!this.value) {
				searchStyle.innerHTML = "";
			return;
		}
			searchStyle.innerHTML = ".searchable:not([data-index*=\"" + this.value.toLowerCase() + "\"]) { display: none; }";
    });
        
function displayContent(json) {
    var list = ''
        , len = json.feed.entry.length
        , i = 0
        , arts = '';
    while ( i < 5 ) {
        var title = json.feed.entry[i].gsx$title.$t
            , url = json.feed.entry[i].gsx$url.$t
            , byline = json.feed.entry[i].gsx$byline.$t
            , date = json.feed.entry[i].gsx$date.$t;
        if ( byline === "Cody Winchester" ) {
            list += '<tr><td><div class="smallblock bold">' + apDate(date) + '</div><a href="' + url + '" target="_blank">' + title + '</a></td></tr>';
            i++
            }
        }
    $('#nerd').html('<table class="table">' + list + '</table>');
    };

$.getJSON( "http://cjwinchester.tumblr.com/api/read/json?callback=?", function( data ) {
    var list = '';
    for (i=0; i<5; i++) {
        var url = data.posts[i]['url']
            , title = data.posts[i]['regular-title']
            , date = data.posts[i]['date']
            , type = data.posts[i]['type']
            , content;
        if (title && url && type === "regular")
            { content = '<a href="' + url + '" target="_blank">' + title + '</a>'; }
        else if (type === "video")
            { content = data.posts[i]['video-player']; }
        else if (type === "link")
            { content = '<a href="' + data.posts[i]['link-url'] + '" target="_blank">' + data.posts[i]['link-text'] + '</a>';}
        else if (type === "audio") 
            { content = data.posts[i]['audio-player'];}
        else if (type === "photo") 
            { content = '<a href="' + url + '" target="_blank">' + '<img style="max-width:100%;" src="' + data.posts[i]['photo-url-400'] + '" /></a><div class="caption"><p>' + data.posts[i]['photo-caption'] + '</p>' }
        else if (type === "quote") 
            { content = "<blockquote class='small'>" + data.posts[i]['quote-text'] + "</blockquote><p class='small pull-right'>&mdash; " + data.posts[i]['quote-source'] + "</p>"};  
        list += '<tr><td style="padding-top:15px; padding-bottom:10px;"><div class="smallblock bold">' + apDate(date) + '</div>' + content + '</td></tr>';
    }
    $('#nonnerd').html('<table class="table">' + list + '</table>');
});