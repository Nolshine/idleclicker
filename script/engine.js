var logs = [];

var clicks = 0;
var autoclickers = 0;

var got_ten_clicks = false;
var got_100_clicks = false;
var got_autoclickers = false;

var note = function (text) {
	if (logs.length < 14) {
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
}; // Eventually I'll use this to make sure there's only x lines ever in the log display.
var update_resource = function (variable, id) {
	$("#"+id).text(id+": "+variable);
};

$(document).ready(function () {
	console.log("so jquery works..");
	$(".resource").hide();
	$(".resource_rate").hide();
	/*$("#buy_autoclicker").css("display", "none");*/
	$("#buy_autoclicker").hide();

	$("#click").click(function () {
		clicks += 5;
		update_resource(clicks, "clicks");
		console.log(clicks);
		
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
	});

	$("#buy_autoclicker").click(function () {
		if (clicks > 99) {
			clicks -= 100;
			autoclickers += 1;
			if (got_autoclickers === false) {
				got_autoclickers = true;
				$("#autoclickers").show();
			}
			update_resource(clicks, "clicks");
			update_resource(autoclickers, "autoclickers");
			note("Someone is clicking for you, lazy bum!");
		}
		else {
			note("I'm afraid you're too poor! Welcome to the club.");
		}
	});
});
setInterval(function () {
	clicks += autoclickers;
	update_resource(clicks, "clicks");
	update_resource(autoclickers, "autoclickers");
}, 1000);