// add comma separators
function addCommas(nStr) {
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

var data = [
{'year': 2003, 'Buried': 2538, 'Cremated': 951, 'Donated': 69, 'Entombed': 0, 'Removed': 65, 'Other/Unknown': 11},
{'year': 2004, 'Buried': 2389, 'Cremated': 985, 'Donated': 63, 'Entombed': 0, 'Removed': 65, 'Other/Unknown': 3},
{'year': 2005, 'Buried': 2251, 'Cremated': 1111, 'Donated': 69, 'Entombed': 38, 'Removed': 62, 'Other/Unknown': 5},
{'year': 2006, 'Buried': 2249, 'Cremated': 1112, 'Donated': 86, 'Entombed': 39, 'Removed': 68, 'Other/Unknown': 5},
{'year': 2007, 'Buried': 2138, 'Cremated': 1221, 'Donated': 85, 'Entombed': 51, 'Removed': 78, 'Other/Unknown': 13},
{'year': 2008, 'Buried': 2219, 'Cremated': 1280, 'Donated': 80, 'Entombed': 53, 'Removed': 61, 'Other/Unknown': 7},
{'year': 2009, 'Buried': 1903, 'Cremated': 1346, 'Donated': 76, 'Entombed': 44, 'Removed': 49, 'Other/Unknown': 5},
{'year': 2010, 'Buried': 2000, 'Cremated': 1456, 'Donated': 61, 'Entombed': 66, 'Removed': 43, 'Other/Unknown': 7},
{'year': 2011, 'Buried': 1985, 'Cremated': 1598, 'Donated': 94, 'Entombed': 33, 'Removed': 66, 'Other/Unknown': 3},
{'year': 2012, 'Buried': 1863, 'Cremated': 1760, 'Donated': 74, 'Entombed': 67, 'Removed': 63, 'Other/Unknown': 5},
]

// initialize slider
  $(function() {
    $( "#slider" ).slider({
      value: 2003,
      min: 2003,
      max: 2012,
      step: 1,
      animate: 'fast',
      slide: function( event, ui ) {
        var thisn = ui.value;
        $('#hed_yr').html(thisn);        
        for (var i=0; i<data.length; i++) {
        if (data[i]['year'] == thisn) {
            var total = 0;
            for (var key in data[i]) {
                if (data[i].hasOwnProperty(key) && key !== 'year') {
                total = total + data[i][key]
                }
                }                
        for (var key in data[i]) {
        if (data[i].hasOwnProperty(key) && key !== 'year') {
            $('.' + key.toLowerCase().replace('/','')).animate({width: (data[i][key] / total) * 100 + '%'}, 'fast');
            $('#num_' + key.toLowerCase().replace('/','')).html(addCommas(data[i][key]));
            $('#pct_' + key.toLowerCase().replace('/','')).html(((data[i][key] / total) * 100).toFixed(1));
         }
            }
            }
        }                
      }
    })
    // add labels
    .each(function() {
    var min = $( "#slider" ).slider( "option", "min" );
    var max = $( "#slider" ).slider( "option", "max" );
    var vals = max - min;
  for (var i = 0; i <= vals; i++) {
    var el = $('<label>' + min + '</label>').css('left', (i/vals * 100) + '%');
  $( "#slider" ).append(el);
    min++;
  }
});
  });

// initial table state
$('document').ready(function() {
    for (var i=0; i<data.length; i++) {
        if (data[i]['year'] == $( "#slider" ).slider( "option", "min" )) {
            var total = 0;
            for (var key in data[i]) {
                if (data[i].hasOwnProperty(key) && key !== 'year') {
                total = total + data[i][key]
                }
                }
            for (var key in data[i]) {
                if (data[i].hasOwnProperty(key) && key !== 'year') {
                   $('#breakdown').append('<tr><td style="padding-right:8px;" class="descrip"><strong>' + key + ':</strong> <span id="num_' + key.toLowerCase().replace('/','') + '">' + addCommas(data[i][key]) + '</span> (<span id="pct_' + key.toLowerCase().replace('/','') + '">' + ((data[i][key] / total) * 100).toFixed(1) + '</span>%)</td><td style="background:#f5f5f5;"><div class="' + key.toLowerCase().replace('/','') + '" style="width:' + (data[i][key] / total) * 100 + '%; background:#008cba;">&nbsp;</div></td></tr><tr><td class="spacer">&nbsp;</td></tr>')
                     }
               }
            }
       }
});