var correct = 0;

var red = {
        backgroundColor: "red",
        color: "white",
        padding: "2px",
        borderRadius: "2px"
        };
        
var green = {
        backgroundColor: "green",
        color: "white",
        padding: "2px",
        borderRadius: "2px"
        };
        
var dud = {
backgroundColor: "#ccc",
cursor: "default"
};

function getScore () {

var total = ($(":radio").length / 4);
var checked = $(":radio:checked").length;
var unchecked = total - checked;

$('.score').css(dud);
if (($(":radio").val()) == 1) {$(".frank").css(green);};

$('.explainer').show('slow');

$(":radio:checked").each(function() {
correct += parseFloat($(this).val());
if (($(this).val()) == 1) {$(this).siblings().css(green);} else {$(this).siblings().css(red);};
});

$(":radio").each(function() {
var radioName = $(this).attr("name");
$(":radio[name='"+radioName+"']").attr("disabled", true);
});

if (checked !== 0) {correctpct = (correct / checked) * 100} else {correctpct = 0};

if (unchecked == 0) {remainder = ''} else {remainder = ' (you left ' + (unchecked.toString()).replace("1","one").replace("2","two").replace("3","three").replace("4","four").replace("5","five").replace("6","six").replace("7","seven").replace("8","eight").replace("9","nine") + ' blank)'};
   
$('#modal').prepend('<h4>Your score: ' + parseInt(correctpct) + '&#37;' + remainder  + '</h4>');

$('#modal').show(300);

correct = 0;

    $('#tweetBtn iframe').remove();
    var tweetBtn = $('<a></a>')
        .addClass('twitter-share-button')
        .attr('href', 'http://twitter.com/share')
        .attr('data-url', 'http://omaha.com')
        .attr('data-count', 'none')
        .attr('data-text', 'I scored ' + parseInt(correctpct) + '% on this week\'s @OWHnews quiz:' );
    $('#tweetBtn').append(tweetBtn);
    twttr.widgets.load();
    
   $('.score').attr('onclick','');
   
   }

function reset() {

$('.score').attr('onclick','getScore()');

var undud = {
backgroundColor: "#006CBD",
cursor: "pointer"
};

$(".answer").attr("style", '');
$(":radio").removeAttr("disabled").removeAttr("checked");
$('.explainer').hide();
$('#modal').hide('slow');
$('#modal').html('<div class="closeout">&#10006;</div>');
$('.score').css(undud);
};

function hide() {
$('#modal').hide();
$('#modal').html('<div class="closeout">&#10006;</div>');
}

$(function() {
	$(window).scroll(function() {
		if($(this).scrollTop() != 0) {
			$('#toTop').fadeIn();	
		} else {
			$('#toTop').fadeOut();
		}
	});
 
	$('#toTop').click(function() {
		$('body,html').animate({scrollTop:0},200);
	});	
});
