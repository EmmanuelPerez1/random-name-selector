(function(e) {
	var min = $('#minb'),
		max = $('#maxb'),
		results = $('#results'),
		result = $('#result');

	results.hide();

	$('#drop-dice').on('click', function(e) {
		results.show();
		result.text(rnd(min.val(), max.val()));
	});

	function mod(dividend, divisor) {
		while (dividend >= divisor)
			dividend -= divisor;

		return dividend;	// dividend % divisor;
	}

	function rnd(min, max) {
		var rnd = min - 1;

		while (rnd < min || rnd > max) {
			rnd = Math.random() * 100;
			rnd = mod(Math.floor(rnd), max + 1);
		}

		return rnd;
	}
})();
