function init() {
$('.col').colorpicker();

var slugify = function(text) {return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');};

var geocoder = new google.maps.Geocoder();

d3.json("js/usa.json", function(error, us) {
  if (error) throw error;

    var makeMap = function(map_width) {
        d3.select("svg").remove();

        var aspect_ratio = 960 / 500;
        var scale_ratio = 960 / 1000;

        var width = map_width;
        var height = width / aspect_ratio;
        var background_color = $("#background_color").val();
        var line_thickness = $("#line_thickness").val();
        var dot_color = $("#dot_color").val();
        var dot_size = $("#dot_size").val();

        var projection = d3.geo.albersUsa()
            .scale(width / scale_ratio)
            .translate([width / 2, height / 2]);

        var path = d3.geo.path()
            .projection(projection);

        var svg = d3.select("#mapdiv").append("svg")
            .attr("id", "map")
            .attr("width", width)
            .attr("height", height);

          svg.insert("path", ".graticule")
              .datum(topojson.feature(us, us.objects.land))
              .attr("fill", background_color)
              .attr("d", path);

          svg.insert("path", ".graticule")
              .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
              .attr("fill", "none")
              .attr("stroke", "#fff")
              .attr("stroke-width", line_thickness)
              .attr("d", path);


        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
               var lat = results[0].geometry.location.lat();
               var lng = results[0].geometry.location.lng();
               var coords = [lng, lat];
                var point = projection(coords);
                svg.append("circle")
                    .attr("cx", point[0])
                    .attr("cy", point[1])
                    .attr("r", dot_size)
                    .style("fill", dot_color);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });

      };

$("#map_button").on('click', function() {
        var output_width = $("#img_width").val();
        makeMap(output_width);
    });

    $("#img_width").on('input', function() {
        var aspect_ratio = 960 / 500;
        $("#img_height").val(Math.round(this.value / aspect_ratio));
    });

    $("#dl_button").click(function() {

        var format_type = $("input[name='formatoptions']:checked").val();
        var flapjack = Pancake("map", format_type);

        var fn, resp = prompt("name your file, yo");
        if (resp && resp !== "") {
            fn = slugify(resp);
        } else {
            var d = new Date().getTime();
            fn = d + "-map";
        }
        flapjack.download(fn);
        });
    window.onload = makeMap(960);
    });
};
