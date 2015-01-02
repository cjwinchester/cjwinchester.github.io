var apmonths = [ "Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec." ]

    var proj = '';
    for (i=0;i<projects.length;i++) {
        var col_class = '';
        var morekeys = [];
        var d = new Date(projects[i].date);
        var thisdate = apmonths[d.getMonth()] + " " + d.getUTCDate() + ", " + d.getFullYear();
        if ( projects[i].type === "web" ) { col_class = '#4393c3' } else { col_class = '#de2d26' }
        
        if ( projects[i].collab ) { 
            if ( projects[i].collab.length > 1 ) {
            var collab = [];
                for (q=0;q<projects[i].collab.length;q++) {
                    collab.push('<a href="http://www.twitter.com/' + projects[i].collab[q].twitter + '" target="_blank">@' + projects[i].collab[q].twitter + '</a>');
                    }
                collab = ' With ' + collab.join(' and ') + '.';
            }
            else { var collab = ' With <a href="http://www.twitter.com/' + projects[i].collab[0].twitter + '" target="_blank">@' + projects[i].collab[0].twitter + '</a>' + '.'} 
        } else { var collab = '' };

       if ( projects[i].tools ) {
            if ( projects[i].tools.constructor === Array ) {
            var tools = [];
                for (z=0;z<projects[i].tools.length;z++) {
                tools.push('#' + projects[i].tools[z]);
                morekeys.push(projects[i].tools[z].toLowerCase());
                }
                tools = '<p class="smallblock italic">' + tools.join('&emsp;') + '</p>';
            }        
            else { 
            morekeys.push(projects[i].tools.toLowerCase());
            var tools = '<p class="smallblock italic">#' + projects[i].tools + '</p>'} 
      } else { var tools = '' }
         
        proj += [
        '<div class="col-md-7 item searchable ' + projects[i].type + '" data-index="' + projects[i].hed.toLowerCase() + " " + morekeys.join(' ') + '" stywle="border-left:6px solid ' + col_class + ';"><p class="smallblock bold" style="margin-bottom:-15px;">' + thisdate + '</p><h3 class="bold" style="color:' + col_class + '"><a href="' + projects[i].url + '" target="_blank">' + projects[i].hed + '</a></h3><p>' + projects[i].desc + collab + '</p>' + tools + '</div>'
        ].join('');
    }

    document.getElementById('projects').innerHTML = proj;
    
    $('#projects > div > p > a').each(function() {
        var acol = $(this).parent().parent().css("border-left-color");
        $(this).css('color', acol);        
    });
        
    $('#projects').fadeIn();
    
    $('.clicker').click(function() {
        var buttclass = ($(this).children('i').attr('class'));
        var ent = $(this).attr('id');
            if (buttclass.indexOf("check") > -1 == true)
                { $(this).children('i').attr('class', 'fa fa-circle-o') 
                $('.' + ent).fadeOut(200);
                $(this).css('opacity', 0.6);
                }
            else
                { $(this).children('i').attr('class', 'fa fa-check-circle-o');
                $('.' + ent).fadeIn(200);
                $(this).css('opacity', 1.0);
                }
    });  

	var searchStyle = document.getElementById('search_style');
		document.getElementById('search').addEventListener('input', function() {
			if (!this.value) {
				searchStyle.innerHTML = "";
			return;
		}
			searchStyle.innerHTML = ".searchable:not([data-index*=\"" + this.value.toLowerCase() + "\"]) { display: none; }";
    });