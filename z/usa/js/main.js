var data = { names: [{name: 'cody'},{name: 'laurel'},{name:'julian'},{name: 'lucy'}]};

_.templateSettings.variable = "maps";
var template = _.template($( "script.template" ).html());
$('#main').html(template( data ));


window.onload = function() {
    $('div.map').hide();
    $('li').eq(0).addClass('selected');
    $('div.map').eq(0).show();
}

$('li').click(function() {
  $( 'li' ).removeClass('selected');
  $('div.map').hide();
  $( this ).addClass( 'selected' );
  var num = $( this ).index();
  $('div.map').eq(num).show();
});

$( window ).keyup(function() {
    var curr, next, previous;
        $( 'li' ).each(function() {
        if ( $(this).hasClass('selected') )
        { curr = this; }
    });    
    if ( event.keyCode === 39 ) {
      $( 'li' ).removeClass('selected');
      $('div.map').hide();
        if ( $(curr).index() + 1 > $('li').length -1 ) {
            next = 0;
            }
        else { next = $(curr).index() + 1 }
        $('li').eq(next).addClass('selected');
        $('div.map').eq(next).show();
    }
    else if ( event.keyCode === 37 ) {
        $( 'li' ).removeClass('selected');
        $('div.map').hide();
        if ( typeof $(curr).index() - 1 === "undefined" ) {
            previous = $('li').length;
            }
        else { previous = $(curr).index() - 1 }
        $('li').eq(previous).addClass('selected');
        $('div.map').eq(previous).show();
    }    
});   