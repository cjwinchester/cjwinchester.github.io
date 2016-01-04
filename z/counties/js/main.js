var map = $("#map");
var targetWidth = $('#mapcontainer').width();
var targetHeight = $('#mapcontainer').height();
map.attr("width", targetWidth);
map.attr("height", targetHeight);

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
    .defer(d3.json, "js/counties.json")
    .await(ready);

function ready(error, us) {
    if (error) throw error;

    var counties = topojson.feature(us, us.objects.counties).features;
    var $c = $("#cn");
      
    var grouped_sorted = _.sortBy(_.groupBy(counties, function(z) { return z.properties['name'] }), function(q) { return q.length}).reverse();
  
    _.each(grouped_sorted, function(d) {
        $c.append("<tr class='searchable' data-index='" + d[0].properties['name'].toLowerCase() + "'><td class='click' data-attr='" + d[0].properties['name'] + "'>" + d[0].properties['name'] + " (" + d.length + ")</td></tr>");
    });
    
    $('.click').click(function() {
        var county = $(this).attr('data-attr');
        d3.selectAll("path")
        .each(function(d) {
            if (typeof d !== "undefined" && d.properties.name === county) {
                d3.select(this)
                    .classed("highlight", true);
            } else {
                d3.select(this)
                    .classed("highlight", false);
            };
        });
    });
  
  svg.append("g")
      .attr("class", "counties")      
    .selectAll("path")
      .data(counties)
    .enter().append("path")
      .attr("d", path);

};

var searchStyle = document.getElementById('search_style');
document.getElementById('search').addEventListener('input', function() {
	if (!this.value) {
		searchStyle.innerHTML = "";
	    return;
    }
    searchStyle.innerHTML = ".searchable:not([data-index*=\"" + this.value.toLowerCase() + "\"]) { display: none; }";
});

var updateLayout = _.debounce(function(e) {
    var targetWidth = $('#mapcontainer').width();
    $('#map').attr("width", targetWidth);
    $('#map').attr("height", targetWidth);
}, 500);

window.addEventListener("resize", updateLayout, false);
