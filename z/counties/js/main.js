var map = $("#map");
var targetWidth = $('#mapcontainer').width();
map.attr("width", targetWidth);
map.attr("height", targetWidth);

var width = 960;
var height = 600;

var projection = d3.geo.albersUsa()
    .scale(1280)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("svg");
var g = svg.append("g");

queue()
    .defer(d3.json, "js/us.json")
    .await(ready);

function ready(error, us) {
  if (error) throw error;
  
  svg.append("g")
      .attr("class", "counties")      
    .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
      .attr("d", path)
      .attr("id", function(d) { return d.id });

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path);
};

var highlight = function(idlist) {
    d3.selectAll("path")
        .each(function(d) {
            if (_.contains(idlist, d.id)) {
                d3.select(this)
                    .classed("highlight", true);
            } else {
                d3.select(this)
                    .classed("highlight", false);
            };
        });    
};

$(document).ready(function() {
    var $c = $("#cn");
    $.getJSON('js/fips.json').success(function(z) {
        var grouped_sorted = _.sortBy(_.groupBy(z, "county"), function(q) { return q.length}).reverse();
        _.each(grouped_sorted, function(d) {
            $c.append("<tr class='searchable' data-index='" + d[0].county.toLowerCase() + "'><td class='click' data-attr='" + d[0].county + "'>" + d[0].county + " (" + d.length + ")</td></tr>");
        });
    
    $('.click').click(function() {
        var county = $(this).attr('data-attr');
        var matches = _.where(z, {'county': county});
        var ls = [];
        _.each(matches, function(x) {
            ls.push(Number(x.scode + x.ccode));
        });
        highlight(ls);
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
});


var updateLayout = _.debounce(function(e) {
    var targetWidth = $('#mapcontainer').width();
    $('#map').attr("width", targetWidth);
    $('#map').attr("height", targetWidth);
}, 500);

window.addEventListener("resize", updateLayout, false);