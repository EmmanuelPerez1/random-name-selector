(function() {

var result = $('#result').hide(),
	loading = $('#loading').hide(),
	resultList = $('#result-list').hide(),
	span = $('span');

$('#throw-dice').click(function(e) {
	e.preventDefault();
	resultList.show();

	result.hide();
	loading.show();
	getRandInts(getMin(), getMax());
});

$('#erase-list').click(function(e) {
	resultList.html('');
	resultList.hide();
});

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
		console.log(data);

		if (rndId == data.id) {
			var rdata = data.result.random.data[0];
			span.text(rdata + ' (' + defRange(rdata) + ')');
			resultList.prepend(rdata + ' (' + defRange(rdata) + ')<br>');
		}
		loading.hide();
		result.show();
	});

}

function getMin() {
	var min = 0;

	min = parseInt(document.getElementById('min0').value);
	if (parseInt(document.getElementById('min1').value) < min)
		min = parseInt(document.getElementById('min1').value);
	if (parseInt(document.getElementById('min2').value) < min)
		min = parseInt(document.getElementById('min2').value);
	if (parseInt(document.getElementById('min3').value) < min)
		min = parseInt(document.getElementById('min3').value);

	return min;
}

function getMax() {
	var max = 0;

	max = parseInt(document.getElementById('max0').value);
	if (parseInt(document.getElementById('max1').value) > max)
		max = parseInt(document.getElementById('max1').value);
	if (parseInt(document.getElementById('max2').value) > max)
		max = parseInt(document.getElementById('max2').value);
	if (parseInt(document.getElementById('max3').value) > max)
		max = parseInt(document.getElementById('max3').value);

	return max;
}

function defRange(val) {
	var array = [],
		str = '';

	if (val <= parseInt(document.getElementById('max0').value) && val >= parseInt(document.getElementById('min0').value))
		array.push('Brandon');
	if (val <= parseInt(document.getElementById('max1').value) && val >= parseInt(document.getElementById('min1').value))
		array.push('Daniel');
	if (val <= parseInt(document.getElementById('max2').value) && val >= parseInt(document.getElementById('min2').value))
		array.push('Ingrid');
	if (val <= parseInt(document.getElementById('max3').value) && val >= parseInt(document.getElementById('min3').value))
		array.push('Ulises');

	// Format array as string
	for (i = 0; i < array.length; i++) {
		if ((i + 1) == array.length) {
			str += array[i];
		} else if ((i + 2) == array.length) {
			str += array[i] + ' y ';
		} else {
			str += array[i] + ', ';
		}
	}

	return str;
}

})();
