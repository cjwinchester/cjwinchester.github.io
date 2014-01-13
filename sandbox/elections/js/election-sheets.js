// regex function to add commas to numbers that needs 'em
        function addCommas(nStr)
        {
        	nStr += '';
        	x = nStr.split('.');
        	x1 = x[0];
        	x2 = x.length > 1 ? '.' + x[1] : '';
        	var rgx = /(\d+)(\d{3})/;
        	while (rgx.test(x1)) {
        		x1 = x1.replace(rgx, '$1' + ',' + '$2');
        	}
        	return x1 + x2;
        }

// main function to pull spreadsheet content and serve as JSON
// column names are inserted between .gsx$ and $t
        function displayContent(json) {            
            
            // Get the current time
            var now = new Date();
            
            // Get the timestamp entry
            var lastupdated = new Date(json.feed.entry[3].gsx$currentdatetime.$t);        
            var pre_html = '<h2>Nebraska election results 2012</h2><div style="text-align:center; margin-top:-30px; margin-bottom:50px;"><span class="highlight">Updated ' + 
            
            // (now - lastupdated) * 60000 (e.g., 1,000 milliseconds * 60 seconds in a minute) = data freshness, in minutes 
            Math.round((Math.abs(now - lastupdated)) / 60000) + ' minutes ago</span></div>' + 
            
            // Start the table, add header rows
            '<table id = "election" style="width:100%;"><thead><tr><th class="r" style="text-align:left">Race</th><th class="r" style="text-align:left;">Candidate</th><th class="r">Votes</th><th class="rw">Percentage</th><th class="r">Precincts reporting</th><th class="r">Pie!</th><th>Winner?</th></tr></thead><tbody>';
            var table_content='';
            var post_html = '</tbody></table>'
            var len = json.feed.entry.length
            //loop through the entire spreadsheet to count cands that belong to dif races
            //create empty object to hold our counts - we use object because we want to attach counts to various ids, with lists, we can't attach our numbers to a specific race id as easily
            var candidateCountLists = {}
            //loop through all entries, this is a jquery loop
            $.each(json.feed.entry, function(index, item){
                //if the candCountList object does not contain a key (or name) equivalent to a race id...
                if (!candidateCountLists[item.gsx$raceid.$t]) {
                    // then create an empty list to store candidates in this race
                    candidateCountLists[item.gsx$raceid.$t] = []
                }
                //for every candidate, add an object with a candidate id, and its percentage, to its race list
                candidateCountLists[item.gsx$raceid.$t].push({'candid': item.gsx$candidateid.$t, 'percentage': item.gsx$candidatepercentage.$t})
                
            })

            // the thing to loop through the data and add to table rows
            // we're starting with i=1 rather than i=0 to skip the useless second row of "headers" that don't parse into JSON because they are continuations of the import formula
            for (var i=1; i<len; i++) {
            
// find the number of precincts reporting and store as a number
            var precinctsin = parseInt(json.feed.entry[i].gsx$precinctsreporting.$t.substr(0,((json.feed.entry[i].gsx$precinctsreporting.$t).search("/"))));
            
// find the total number of precincts and store as a number
            var precinctsout = parseInt(json.feed.entry[i].gsx$precinctsreporting.$t.substr(json.feed.entry[i].gsx$precinctsreporting.$t.search("/")+1,999));
// if all the precincts are in and the candidate has a majority, pop in a dud checkmark. If not, return an empty box.
            // added a bit to grab candidate count from our object created at top, dig in to get count for the current race id, use that as you were trying to use the variable

            //get ahold of the current race we want to find majority percent of
            var currentRace = candidateCountLists[json.feed.entry[i].gsx$raceid.$t]
            //initialize a var to hold the largest percent we've seen in loop, (currently 0 since we haven't started)
            //also initialize var to hold object w/info about largest cand
            var largestPercent = 0;
            var largestCandidate;
            //loop through all candidates our little object has stored on a race
            $.each(currentRace, function(index, item){
                //if the stored percent in our custom object is bigger than the largestPercent var's contents...
                if (parseFloat(item['percentage']) > largestPercent) {
                    //change largest percent to THIS number...
                    largestPercent = parseFloat(item['percentage'])
                    //and store current item in loop as largest candidate
                    largestCandidate = item
                }
            })
            //if the largest candidate we just got for a race, from our loop, matches the current cand we are looking at in overall spreadsheet..
            if (largestCandidate['candid'] == json.feed.entry[i].gsx$candidateid.$t) {
                //set a var which will tell us we SHOULD display check
                checkmark = true
            } else {
                //if we're not currently on largest cand, set the checked variable to NOT display
                checkmark = false
            }

            //the second condition is now merely if a checkmark should show up, which we determined with above logic
            //if we should use a checkmark, then display one
            if (precinctsin == precinctsout && checkmark){winner="<input type='checkbox' onclick='return false' checked />";}else{winner="<input type='checkbox' onclick='return false' unchecked />";};

            table_content += [
                    '<tr><td style="text-align:left;">',
                    
                    // replace some clunky wording in the first entry
                    ((json.feed.entry[i].gsx$racename.$t).replace("For ","").replace("President and Vice President of the United States","President/Vice President").replace("United States","U.S.").replace("Representative in Congress","U.S. Rep.").replace("Member of the Legislature","Unicameral").replace("Member of the","").replace("Natural Resources District","NRD").replace("Board of Directors","Board")).trim(),
                    ' ',
                    (json.feed.entry[i].gsx$areanum.$t).trim(),
                    '</td><td style="text-align:left;">',
                    (json.feed.entry[i].gsx$candidatename.$t).trim(),
                    '</td><td>',
                    addCommas(json.feed.entry[i].gsx$candidatevotes.$t),
                    '</td><td class="total">',
                    
                    // make the percentage readable by humans
                    (json.feed.entry[i].gsx$candidatepercentage.$t * 100).toFixed(2) + '&#37;',
                    '</td><td>',
                    json.feed.entry[i].gsx$precinctsreporting.$t,
                    '</td><td>',
                    
                    // pop in a small pie chart using the Google Image Charts API
                    // https://developers.google.com/chart/image/
                    // add title and alt properties for tooltips
                    '<img src="http://chart.googleapis.com/chart?chs=45x45&cht=p&chco=084594&chd=t:' + parseFloat(json.feed.entry[i].gsx$candidatepercentage.$t) + ',' + (1.00 - parseFloat(json.feed.entry[i].gsx$candidatepercentage.$t)) + '" alt="' + (json.feed.entry[i].gsx$candidatename.$t).trim() + ': ' + (json.feed.entry[i].gsx$candidatepercentage.$t * 100).toFixed(2) + '&#37;' + '" title="' + (json.feed.entry[i].gsx$candidatename.$t).trim() + ': ' + (json.feed.entry[i].gsx$candidatepercentage.$t * 100).toFixed(2) + '&#37;' + '" />',
                    '</td><td>',
                    winner,
                    '</td></tr>'
                    
                    // insert HTML into empty string we created up top
                ].join('');  
            }
            
            // populate the 'results' div with the HTML
            document.getElementById('results').innerHTML = pre_html + table_content + post_html 
        }
        
        // add the table filter
        $(function () {
        $("table").addTableFilter();
      });
      
      // initiate jquery UI tooltips 
      $(function() {
    $( document ).tooltip({ track: true });
  });
