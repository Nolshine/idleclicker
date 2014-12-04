var clicks = 0

$(document).ready(function () {
	$("#clicks").hide();

	$("#click").click(function () {
		clicks += 1;
		$("#clicks").text("Clicks: " + clicks);
		console.log(clicks);
		
		if (clicks === 1) {
			$("#clicks").show();
		}

		if (clicks === 11) {
			$(".log_display").append("<p>Surpassed ten clicks!</p>");
		}
		else if (clicks === 101){
			$(".log_display").append("<p>Did you really just click 100 times in a shitty prototype?</p>");
		}
	});
});