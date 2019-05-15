(function(e) {
  var min = document.getElementById('minb'),
    max = document.getElementById('maxb'),
    results = document.getElementById('results'),
    result = document.getElementById('result');

  hideElement(results);

  document.getElementById('drop-dice').onclick = function(e) {
    showElement(results);
    result.innerText = rnd(min.value, max.value);
  }

  function mod(dividend, divisor) {
    while (dividend >= divisor)
      dividend -= divisor;

    return dividend;  // dividend % divisor;
  }

  function rnd(min, max) {
    let rnd = min - 1;

    while (rnd < min || rnd > max) {
      rnd = Math.random() * 100;
      rnd = mod(Math.floor(rnd), max + 1);
    }

    return rnd;
  }
})();
