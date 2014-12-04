var logs = [];

var mouse = {x: 0, y: 0};

document.addEventListener('mousemove', function(e){ 
    mouse.x = e.clientX || e.pageX; 
    mouse.y = e.clientY || e.pageY 
}, false);

// This is a collection of elementID:flavourText pairs
var tooltips = {
	"click":"Add to your cohesive click collection.",
	"buy_autoclicker":"Costs 100 clicks. +1 click/s."
};

var hoverIn = function () {
	$("#tooltip").css('top', (mouse.y+10)+"px");
	$("#tooltip").css('left', (mouse.x+10)+"px");
	$("#tooltip").text(tooltips[$(this).attr('id')])
	$("#tooltip").show();
};
var hoverOut = function () {
	$("#tooltip").hide();
	$("#tooltip").text("");
};

// Will store all button functions here, will look cleaner.
var button_actions = {
	"click": function () {
		clicks += 5;
		updateResource(clicks, "clicks");
		
		if (clicks > 0) {
			$("#clicks").show();
		}

		if (clicks > 10 && got_ten_clicks === false) {
			note("Surpassed ten clicks!");
			got_ten_clicks = true;

		}
		else if (clicks > 99 && got_100_clicks === false){
			got_100_clicks = true;
			$("#buy_autoclicker").show();
			note("Did you really just click 100 times in a shitty prototype?");
		}
	},
	"buy_autoclicker": function () {
		if (clicks > 99) {
			clicks -= 100;
			autoclickers += 1;
			if (got_autoclickers === false) {
				got_autoclickers = true;
				$("#autoclickers").show();
			}
			updateResource(clicks, "clicks");
			updateResource(autoclickers, "autoclickers");
			note("Someone is clicking for you, lazy bum!");
		}
		else {
			note("I'm afraid you're too poor! Welcome to the club.");
		}
	}
};

var clickHandler = function () {
	button_actions[$(this).attr('id')]();
};

var clicks = 0;
var autoclickers = 0;

var got_ten_clicks = false;
var got_100_clicks = false;
var got_autoclickers = false;

var note = function (text) {
	if (logs.length < 15) {
		logs.splice(0, 0, text);
	}
	else {
		logs.pop();
		logs.splice(0, 0, text);
	}

	$(".log_display").html("");
	for (var i = 0; i < logs.length; i++){
		$(".log_display").append("<p>"+logs[i]+"</p>");
	}
}; // Eventually I'll use this to make sure there's only x lines ever in the log display. **DONE**

var updateResource = function (variable, id) {
	$("#"+id).text(id+": "+variable);
};



$(document).ready(function () {
	console.log("so jquery works..");
	// hide tooltip element
	$("#tooltip").hide();

	// have a tooltip trigger for buttons
	$('button').hover(hoverIn, hoverOut)

	// hide resource counters and rates
	$(".resource").hide();
	$(".resource_rate").hide();

	// hide mysterious buttons
	$("#buy_autoclicker").hide();

	// button events
	$("#click").click(clickHandler);
	$("#buy_autoclicker").click(clickHandler);
});

//main 'loop' (ticker)
setInterval(function () {

	clicks += autoclickers;

	updateResource(clicks, "clicks");
	updateResource(autoclickers, "autoclickers");

}, 1000);