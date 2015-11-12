$('.col').colorpicker();

var slugify = function(text) { return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');};

var geocoder = new google.maps.Geocoder();

var makeMap = function() {
    d3.select("svg").remove();

    var width = 960;
    var height = 500;
    var $bc = $("#background_color").val();
    var $dc = $("#dot_color").val();
    var $size = $("#dot_size").val();

    var projection = d3.geo.albersUsa()
        .scale(1000)
        .translate([width / 2, height / 2]);

    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select("#mapdiv").append("svg")
        .attr("id", "map")
        .attr("width", width)
        .attr("height", height);
    
    d3.json("js/usa.json", function(error, us) {
      if (error) throw error;
      svg.insert("path", ".graticule")
          .datum(topojson.feature(us, us.objects.land))
          .attr("fill", $bc)
          .attr("d", path);
          
      svg.insert("path", ".graticule")
          .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
          .attr("fill", "none")
          .attr("stroke", "#fff")
          .attr("stroke-width", 2)
          .attr("d", path);
      
    var address = document.getElementById('address').value;    
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var coords = [results[0].geometry.location.lng(), results[0].geometry.location.lat()];
            var point = projection(coords);
            svg.append("circle")
                .attr("cx", point[0])
                .attr("cy", point[1])
                .attr("r", $size)
                .style("fill", $dc);
        } else {
            alert('Sorry, couldn\'t map that address. Try again?');
        }
    });
    
  });
};

window.onload = makeMap();

$("#map_button").click(function() {
    makeMap();
});

$("#dl_button").click(function() { 
    var flapjack = Pancake("map");
    var fn, resp = prompt("name your file, yo");
    if (resp && resp !== "") {
        fn = slugify(resp);
    } else {
        var d = new Date();
        var datestring = d.getFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCDate();
        fn = datestring + "-svg";
    };        
    flapjack.download(fn + ".png");
});