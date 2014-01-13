String.prototype.repeat = function(n){return new Array(isNaN(n) ? 1 : ++n).join(this);}

var colorArray = ["CB181D,FCBBA1", "006D2C,99D8C9", "08519C,9ECAE1", "A63603,FDAE6B", "54278F,BCBDDC", "A50F15,FC9272"];

var randomcolor = colorArray[Math.floor(Math.random() * colorArray.length)];

var darkcol = randomcolor.substring(0,6);
var lightcol = randomcolor.substring(7);

function displayContent(json) {
            var table_content='';
            var len = json.feed.entry.length;
     for (var i=0; i<len; i++) {        
            var title = json.feed.entry[i].gsx$title.$t;
            var author = json.feed.entry[i].gsx$author.$t;
            var link = json.feed.entry[i].gsx$url.$t;
            var pages_done = parseFloat(json.feed.entry[i].gsx$done.$t);
            var pages_total = parseFloat(json.feed.entry[i].gsx$total.$t);
            var stars = parseInt(json.feed.entry[i].gsx$stars.$t);
            var emptystars = parseInt(json.feed.entry[i].gsx$empties.$t);
            var rating = "<i class='icon-star'></i>";
            var rating_rest = "<i class='icon-star-empty'></i>";
            
            var sugg = '<style>a {color:#' + darkcol + ';}a:visited {color:#' + lightcol + ';}</style><table><tr style="border-top:none; border-bottom:none;"><td colspan="3"><h2>What am I reading?</h2><div style="text-align:center; padding-top:10px; padding-bottom:10px; font-size:90%"><script type="text/javascript">var submitted=false;</script><iframe name="hidden_iframe" id="hidden_iframe" style="display:none;" onload="if(submitted) {window.location.reload()}"></iframe><form action="https://docs.google.com/forms/d/1eK0Dch0MNPG8lghTlTPZp-kXxjUJVmxEwLABcSyFTVg/formResponse" method="POST" target="hidden_iframe" onsubmit="submitted=true;">Also, what <em>should</em> I be reading?<br/><input type="text" style="width:120px;" name="entry.1059936569" value="" class="ss-q-short" id="entry_1059936569" dir="auto"><a class="fakebutton" type="submit" name="submit" style="vertical-align:7%; margin-left:5px; background:#' + darkcol + '">Submit &raquo;</a></form></div></td></tr>'
            
            if (pages_done == pages_total) {fraction = "Finished"} else if (pages_done == 0) {fraction = "Not started"} else {fraction = ((pages_done / pages_total) * 100).toFixed(0) + '&#37; done"'};
            
            table_content += [
            '<tr><td><a href="' + link + '" target="_blank"><em><strong>' + title + '</strong></em></a>, by ' + author + '</td><td>' + '<img class="imagechart" src="http://chart.googleapis.com/chart?chxs=0,00000000,11.5,0,_,00000000|1,00000000,11.5,0,t,00000000&chxt=x,y&chbh=a&chs=200x50&cht=bhs&chco=' + randomcolor + '&chds=0,' + pages_total + ',0,' + pages_total + '&chd=t:' + pages_done + '|' + (pages_total - pages_done) + '" title="' + fraction + '" alt="' + fraction + '"/>' + '</td><td style="width:70px;">' + rating.repeat(stars) + rating_rest.repeat(emptystars) + '</td></tr>'
].join('');
                        
document.getElementById('whatreadingnow').innerHTML = 
sugg + table_content + '</table>'

}

}
