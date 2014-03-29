    /*
 jQuery Plugin: Table Filter - version 0.2.1

 LICENSE: http://hail2u.mit-license.org/2009
*/
(function(a){a.fn.addTableFilter=function(d){var b=a.extend({},a.fn.addTableFilter.defaults,d),c,e;this.is("table")&&(this.attr("id")||this.attr({id:"t-"+Math.floor(99999999*Math.random())}),c=this.attr("id"),d=c+"-filtering",e=a("<label/>").attr({"for":d}).append(b.labelText),b=a('<input type="text" style="width:100%;" id="search">').attr({id:d,size:b.size}),a("<p/>").addClass("formTableFilter").append(e).append(b).insertBefore(this),a("#"+d).delayBind("keyup",function(){var b=a(this).val().toLowerCase().split(" ");a("#"+c+
" tbody tr").each(function(){var d=a(this).html().toLowerCase().replace(/<.+?>/g,"").replace(/\s+/g," "),c=0;a.each(b,function(){if(0>d.indexOf(this))return c=1,!1});c?a(this).hide():a(this).show()})},300));return this};a.fn.addTableFilter.defaults=a.fn.delayBind=function(d,b,c,e){a.isFunction(b)&&(e=c,c=b,b=void 0);var g=this,f=null;return this.bind(d,b,function(b){clearTimeout(f);f=setTimeout(function(){c.apply(g,[a.extend({},b)])},e)})}})(jQuery);

String.prototype.repeat = function(n){return new Array(isNaN(n) ? 1 : ++n).join(this);}

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
            var rating = "<i class='fa fa-star'></i>";
            var rating_rest = "<i class='fa fa-star-o'></i>";
                          
            table_content += [
            '<tr><td class="row" data=' + (pages_done / pages_total) * 100 + '><a href="' + link + '" target="_blank"><em>' + title + '</em></a>, by ' + author + '</td><td>' + rating.repeat(stars) + rating_rest.repeat(emptystars) + '</td></tr>'
            ].join('');

document.getElementById('whatreadingnow').innerHTML = 
'<table style="width:100%; border:none;">' + table_content + '</table>'

}

}