(function($, _) {

    var artist = "Swans";
    var title = "Blind";
    var url = "https://dl.dropboxusercontent.com/u/38884522/Swans%20-%20Blind.mp3";

    $("#player").html("listening to " + artist);

    var $player = $('#audio-player-front');

    var playPauseAudio = function(e) {
        e.preventDefault();
        var jPd = $player.data('jPlayer');
        if ( jPd.status.currentTime > 0 && jPd.status.paused === false ) {
            $player.jPlayer('pause');
        }
        else {
            $player.jPlayer('play');
        }
    };

    var setAudioMedia = function() {
        $player.jPlayer('setMedia', {
            mp3: url
        });
    };

    var onTimeupdate = function(e) {
        var timeNow = e.jPlayer.status.currentTime;
        var timeLeft = e.jPlayer.status.duration;
        var pctDone = (timeNow / timeLeft) * 100;
        var col1="#96bed4";
        var col2="#eaf2f7";
        var player_span = document.getElementById("player");
        player_span.style.background = "-webkit-gradient(linear, left top,right top, color-stop("+pctDone+"%,"+col1+"), color-stop("+pctDone+"%,"+col2+"))";
        player_span.style.background = "-moz-linear-gradient(left center,"+col1+" "+pctDone+"%, "+col2+" "+pctDone+"%)" ;
        player_span.style.background = "-o-linear-gradient(left,"+col1+" "+pctDone+"%, "+col2+" "+pctDone+"%)";
        player_span.style.background = "linear-gradient(to right,"+col1+" "+pctDone+"%, "+col2+" "+pctDone+"%)";
    };

    $(document).ready(function() {
        $player.jPlayer({
            supplied: 'mp3',
            swfPath: '/js/',
            timeupdate: onTimeupdate,
            loop: false,
            ended: function() {
                $('#player').css('background', '#eaf2f7');
                setAudioMedia();
            }
        });
        setAudioMedia();
        $('#player').on('click', playPauseAudio);
    });
})(jQuery, _);