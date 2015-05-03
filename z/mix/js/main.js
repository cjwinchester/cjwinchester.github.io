var template = _.template($( "script.template" ).html());            
$('#playlist').html(template( songs ));

var playPauseAudio = function(e) {
    var jPd = $('#audio-player').data('jPlayer');
    if ( jPd.status.currentTime > 0 && jPd.status.paused === false ) {
        $('#audio-player').jPlayer('pause');
        $('#playpauseicon').removeClass('fa fa-pause').addClass('fa fa-play');
     }
    else {
    $('#audio-player').jPlayer('play');
    $('#playpauseicon').removeClass('fa fa-play').addClass('fa fa-pause');
    }
}

var setAudioMedia = function(x) {
    $('title').html("&#9835; " + songs[x].name + " &#9835;");
    $('#audio-player').jPlayer('setMedia', {
        mp3: songs[x].file
        });
    };

var boldList = function(x) {
    $('td').each(function() {
        $(this).removeClass('bold');
    });
    $('td').eq(x).addClass('bold');
}

var getCurrent = function() {
    var now = 0;
    $('td').each(function() {
        if ($(this).hasClass('bold')) {
            now = this.id;
        }
    });
    return Number(now);
}
   
var advanceMedia = function() {
    var now = getCurrent();
    try { 
        setAudioMedia(now+1);
        $('#audio-player').jPlayer('play');
        $('#playpauseicon').removeClass('fa fa-pause').addClass('fa fa-pause');
        boldList(now+1);
        }
    catch(err) {
        setAudioMedia(0);
        $('#audio-player').jPlayer('play');
        $('#playpauseicon').removeClass('fa fa-pause').addClass('fa fa-pause');
        boldList(0);
    }
}

var rewindMedia = function() {
    var len = songs.length, now = getCurrent();
    try {
        setAudioMedia(now-1);
        $('#audio-player').jPlayer('play');
        $('#playpauseicon').removeClass('fa fa-pause').addClass('fa fa-pause');
        boldList(now-1);
        }
    catch(err) {
        setAudioMedia(len-1);
        $('#audio-player').jPlayer('play');
        $('#playpauseicon').removeClass('fa fa-pause').addClass('fa fa-pause');
        boldList(len-1);
        }
};

var onTimeupdate = function(e) {
    var timeNow = e.jPlayer.status.currentTime
        , timeLeft = e.jPlayer.status.duration
        , pctDone = (timeNow / timeLeft) * 100;
        $('#progress').css('width', pctDone + "%");
}

var stillWaiting = function() {
    $('title').text('Waiting ...');
}

$(document).ready(function() {
    $('#top').affix();
    $('#audio-player').jPlayer({
        supplied: 'mp3',
        swfPath: 'js/swf',
        timeupdate: onTimeupdate,
        ended: advanceMedia,
        waiting: function() {
            $('#waiting').show();
            $('#playlist').fadeTo('fast', 0.4);
        },
        canplay: function() {
            $('#waiting').fadeOut('fast');
            $('#playlist').fadeTo('fast', 1.0);
            }
    });
    setAudioMedia(0);
    boldList(0);
    $('.playpause').on('click', playPauseAudio);
    $('.next').on('click', advanceMedia);
    $('.prev').on('click', rewindMedia);
    
});

$( ".button" ).hover(
  function() {
    $( this ).addClass( "hover" );
  }, function() {
    $( this ).removeClass( "hover" );
  }
);

$('td').on('click', function() {
    boldList(this.id);
    setAudioMedia(this.id);    
    $('#audio-player').jPlayer('play');
    $('#playpauseicon').removeClass('fa fa-pause').addClass('fa fa-pause');
});