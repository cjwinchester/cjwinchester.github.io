var ctx = (document.getElementById("c")).getContext("2d");

// from: http://www.pixelstech.net/article/1335200166-How-to-draw-pentagram-in-HTML5-canvas
function pentagram(ctx, x, y, radius, rotate, linewidth, linecolor, circle) {
    ctx.lineWidth = linewidth;
    ctx.strokeStyle = linecolor;
    ctx.beginPath();
    for ( var i = 0; i <= 4 * Math.PI; i += ( 4 * Math.PI ) / 5 ) {
        ctx.lineTo( x + radius * Math.cos(i + rotate), y + radius * Math.sin(i + rotate));
    }
    if ( circle ) {
        ctx.moveTo( x + radius, y );
    ctx.arc(x, y, radius, 0, Math.PI*2, false);
    }
    ctx.stroke();
};

var throned_in_blood = function() {        
    pentagram (ctx, 200, 200, 170, Math.PI/2, 7, "red", true);
            var playPauseAudio = function(e) {
    var jPd = $('#audio-player').data('jPlayer');
    if ( jPd.status.currentTime > 0 && jPd.status.paused === false ) {
        $('#audio-player').jPlayer('pause');
     }
    else {
    $('#audio-player').jPlayer('play');
    }
};

var setAudioMedia = function(x) {
$('#audio-player').jPlayer('setMedia', {
    mp3: x
    });
};

$('#audio-player').jPlayer({
    supplied: 'mp3',
    swfPath: 'js/swf',
    });
setAudioMedia('tib.mp3')
$('#c').attr("style","cursor:pointer;").on('click', playPauseAudio);
$('#c').trigger('click');
};
    
var kkeys = [];
var tib = "72,65,73,76,83,65,84,65,78,54,54,54";

$(document).keydown(function(e) {
  kkeys.push( e.keyCode );
  if ( kkeys.toString().indexOf( tib ) >= 0 ) {
    $(document).unbind('keydown',arguments.callee);            
    throned_in_blood();
  };
});