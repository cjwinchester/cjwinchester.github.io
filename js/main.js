    var apmonths = [ "Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec." ]

    var proj = '';    
    for (i=0;i<projects.length;i++) {
        var col_class, collab, tools = '';
        var d = new Date(projects[i].date);
        var thisdate = apmonths[d.getMonth()] + " " + (d.getUTCDate()) + ", " + d.getFullYear();
        if ( projects[i].type === "web" ) { col_class = '#4393c3' } else { col_class = '#de2d26' }
        if ( projects[i].collab ) { collab = ' With ' + projects[i].collab + '.' } else { collab = '' }
        if ( projects[i].tools ) {
            if ( projects[i].tools.constructor === Array ) {
                 for (z=0;z<projects[i].tools.length;z++) {
                    tools += [
                        '#' + projects[i].tools[z] + '&emsp;'
                    ].join('')
                 }
                }
            else {
                tools = '#' + projects[i].tools
                }
         }
        proj += [
        '<div class="col-md-7 item searchable ' + projects[i].type + '" data-index="' + projects[i].hed.toLowerCase() + '" style="border-left:6px solid ' + col_class + ';"><p class="smallblock bold" style="margin-bottom:-15px;">' + thisdate + '</p><h3 class="bold" style="color:' + col_class + '"><a href="' + projects[i].url + '" target="_blank">' + projects[i].hed + '</a></h3><p>' + projects[i].desc + collab + '</p><p class="smallblock italic">' + tools + '</p></div>'
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