    var headers = ['Candy', 'Julian', 'Lucy'];

    function swapTable(year) {
            var check_table = d3.select('table');
            if (!check_table.empty()) {check_table.remove()}
            var newhed = $('#change_year option:selected').text();
            $('#tablehed').html(newhed);
            d3.text("./data/candy_" + year + ".csv", function(data) {
                var parsedCSV = d3.csv.parseRows(data);
                var table = d3.select("#candytable")
                    .append("table")
                    .attr("class", "table");
                    
                    table.append("thead")
                         .append('tr')
                         .selectAll("th")
                         .data(headers).enter()
                         .append('th')
                         .text(function(d) { return d; });
                    
                    table.append("tbody")
                        .selectAll("tr")
                        .data(parsedCSV).enter()
                        .append("tr")
                        .selectAll("td")
                        .data(function(d) { return d; }).enter()
                        .append("td")
                        .text(function(d) { return d; });
                    });
                    
                    document.title = "Halloween " + year
                }

swapTable('2014');