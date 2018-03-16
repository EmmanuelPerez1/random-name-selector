(function() {
	var result = $('#result').hide(),
		loading = $('#loading').hide(),
		err = $('#error').hide(),
		resultList = $('#result-list').hide(),
		span = $('span'),
		table = $('table');

	/*
	 * ########## onclick listeners ##########
	 */

	$('#throw-dice').click(function(e) {
		e.preventDefault();
		resultList.show();

		result.hide();
		err.hide();
		loading.show();
		getRandInts(getMin(), getMax());
	});

	$('#erase-list').click(function(e) {
		resultList.html('');
		resultList.hide();
	});

	$('#ad').click(function(e) {
		e.preventDefault();

		table.append($('<tr><td><input type=\"text\" placeholder=\"Nombre\"></td><td><input type=\"number\" id=\"min\" min=\"0\" max=\"200\" placeholder=\"Mínimo\"> - <input type=\"number\" id=\"max\" min=\"0\" max=\"200\" placeholder=\"Máximo\"></td></tr>'));
	});

	$('#as').click(function(e) {
		e.preventDefault();

		var o = table.find('tr'),
			i = o.length;

		if (i > 2)
			o[i - 1].remove();
	});

	/*
	 * ########## api function ##########
	 */

	function getRandInts(min, max) {
		// API Key: 3a1b27f9-9547-44a3-abf7-71ceb007f68e
		var rndId = Math.floor((Math.random() * 10000)),
			o = {
			'jsonrpc': '2.0',
			'method': 'generateIntegers',
			'params': {
				'apiKey': '3a1b27f9-9547-44a3-abf7-71ceb007f68e',
				'n': 1,
				'min': min,
				'max': max
			},
			'id': rndId
		};

		$.ajax({
			'url': 'https://api.random.org/json-rpc/1/invoke',
			'type': 'POST',
			'contentType': 'application/json-rpc',
			'data': JSON.stringify(o)
		})
		.done(function(data) {
			if (rndId == data.id && data.error == null) {
				var rdata = data.result.random.data[0];
				span.text(rdata + ' (' + defRange(rdata) + ')');
				resultList.prepend(rdata + ' (' + defRange(rdata) + ')<br>');

				result.show();
			} else {
				err.show();
				console.log(data.error);
			}

			loading.hide();
		});
	}

	/*
	 * ########## helper functions ##########
	 */

	function getMin() {
		var min = 0,
			num;

		$.each(table.find('tr'), function(i, v) {
			num = parseInt($(v).find('#min')[0].value);

			if (i == 0)
				min = num;
			else if (num < min)
				min = num;
		});

		return min;
	}

	function getMax() {
		var max = 0,
			num;

		$.each(table.find('tr'), function(i, v) {
			num = parseInt($(v).find('#max')[0].value);

			if (i == 0)
				max = num;
			else if (num > max)
				max = num;
		});

		return max;
	}

	function defRange(val) {
		var array = [], str = '',
			min, max, name;

		$.each(table.find('tr'), function(i, v) {
			min = parseInt($(v).find('#min')[0].value);
			max = parseInt($(v).find('#max')[0].value);
			name = $(v).find('input')[0].value;

			if (val <= max && val >= min)
				array.push(name);
		});

		// Format array as string
		for (i = 0; i < array.length; i++) {
			if ((i + 1) == array.length)
				str += array[i];
			else if ((i + 2) == array.length)
				str += array[i] + ' y ';
			else
				str += array[i] + ', ';
		}

		return str;
	}
})();
