var goats = [
    'https://media.giphy.com/media/zVCCzF1PES4A8/giphy.gif',
    'https://media.giphy.com/media/rAQeDchTzR3RS/giphy.gif',
    'https://media.giphy.com/media/m3PODyDsvvPgs/giphy.gif',
    'https://media.giphy.com/media/Akg2CSPLIl7Ne/giphy.gif',
    'https://media.giphy.com/media/qdm11huUHB8ys/giphy.gif',
    'https://media.giphy.com/media/9Mc3m9chmmJC8/giphy.gif',
    'https://media.giphy.com/media/2Xskf18mVqpQjf0TFKg/giphy.gif',
    'https://media.giphy.com/media/PHpslwBt4E2hW/giphy.gif',
    
    ];



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

var setAudioMedia = function(x, ls) {
    $('title').html("&#9835; " + ls[x].name + " &#9835;");
    $('#audio-player').jPlayer('setMedia', {
        mp3: ls[x].file
        });
    };
    
var boldList = function(x) {
    $('.cl').each(function() {
        $(this).removeClass('bold');
        $(this).parent().css('background', '#fff');
    });
    $('.cl').eq(x).addClass('bold');
}

var getCurrent = function() {
    var now = 0;
    $('.cl').each(function() {
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
        var now = getCurrent();
        var col1="#eee";
        var col2="#fff";
        var topper = document.getElementById(now).parentNode;
        topper.style.background = "-webkit-gradient(linear, left top,right top, color-stop("+pctDone+"%,"+col1+"), color-stop("+pctDone+"%,"+col2+"))";
        topper.style.background = "-moz-linear-gradient(left center,"+col1+" "+pctDone+"%, "+col2+" "+pctDone+"%)" ;
        topper.style.background = "-o-linear-gradient(left,"+col1+" "+pctDone+"%, "+col2+" "+pctDone+"%)";
        topper.style.background = "linear-gradient(to right,"+col1+" "+pctDone+"%, "+col2+" "+pctDone+"%)";        
};

$(document).ready(function() {
    $.getJSON('js/goats.json').success(function(song) {
        console.log(song);
    }).fail(function() {
        alert("Sorry, something went wrong. Try reloading the page.");
    });
});