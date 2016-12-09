(function() {
  var ctx = (document.getElementById('c')).getContext('2d');
  var audio = document.getElementById('a');

  // http://www.pixelstech.net/article/1335200166-How-to-draw-pentagram-in-HTML5-canvas
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
  }

  function throned_in_blood() {
    pentagram (ctx, 200, 200, 170, Math.PI/2, 7, 'red', true);
    audio.play();
  }

  var keys = '';
  var _666 = 'hailsatan';

  document.addEventListener('keydown', function(e) {
    if (keys.length > 50) {
      keys = '';
    }
    keys += e.key;
    if (keys.indexOf(_666) > -1) {
      throned_in_blood();
    }
  });
})();