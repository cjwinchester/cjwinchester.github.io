function displayContent(json) { 
        var sourcedata='';
        var notedata='';
        var timelinedata='';
        var len = json.feed.entry.length;
         
        for (var i=0; i<len; i++) {
        var year = new Date(Date.parse(json.feed.entry[i].gsx$date.$t)).getFullYear();

document.getElementById('sourcepane').innerHTML = "Contact info for sources would go here."

if (json.feed.entry[i].gsx$note.$t == '') {notedata=''} else {

notedata += [
'<div class="well ',
json.feed.entry[i].gsx$category.$t,
'"><p>',
json.feed.entry[i].gsx$note.$t,
'<p/><p><small><em>&mdash; ',
json.feed.entry[i].gsx$yourname.$t,
'</em></small></p></div>'
].join('');  

document.getElementById('notepane').innerHTML = notedata
}

if (json.feed.entry[i].gsx$date.$t == '' && json.feed.entry[i].gsx$timelinehed.$t == '' && json.feed.entry[i].gsx$timelinetext.$t == '') {timelinedata == ''} else {

var realdate = json.feed.entry[i].gsx$date.$t.replace("'","");

timelinedata += [
'<div class="timeline ',
json.feed.entry[i].gsx$category.$t,
'" data-date="',
realdate,
'"><h1 style="background:#000; color:#fff; text-align:center;">',
realdate,
'</h1><div style="margin-bottom:70px;" class="well"><h3>',
json.feed.entry[i].gsx$timelinehed.$t,
'</h1><p>',
json.feed.entry[i].gsx$timelinetext.$t,
'</p></div></div>'
].join('');

document.getElementById('timelineentries').innerHTML = timelinedata
}

}
};
