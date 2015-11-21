var l = [];

var labels = ["default", "primary", "success", "info", "warning", "danger"];

var kw = ["Reporting", "Writing", "Research", "Editing", "Dataviz", "HTML/CSS/JS", "Python/Django", "Shell scripts", "GIS", "SQL"];

var getLabel = function() {
    return _.sample(labels);
};    

_.each(kw, function(d) {
    l.push('<span class="label label-' + getLabel() + '">' + d.toUpperCase() + '</span>'); 
});

document.getElementById('kw').innerHTML = _.shuffle(l).join(" ");