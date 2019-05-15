(function() {
  var resultsPane = document.getElementById('results-pane'),
    result = document.getElementById('result'),
    resultHistory = document.getElementById('result-history'),
    resultList = document.getElementById('result-list'),
    nameList = document.getElementById('name-list'),
    resultName = document.getElementById('name');

  /*
  * onclick listeners
  */
  document.getElementById('bt-spin').onclick = function (e) {
    let n = Math.floor(Math.random() * getMax() + 1),
      li = document.createElement('li'),
      winnerName = resolvWinner(n);

    resultName.innerText = winnerName;

    li.innerText = winnerName;
    resultList.appendChild(li);

    showElement(resultsPane);
    showElement(result);
    showElement(resultHistory);
  }

  document.getElementById('bt-erase-list').onclick = function (e) {
    let size = resultList.children.length;

    for (let i = size - 1; i >= 0; i--)
      resultList.children[i].remove();

    hideElement(resultHistory);
  }

  document.getElementById('bt-add-name').onclick = function (e) {
    let li = document.createElement('li'),
      input = document.createElement('input');

    input.type = 'text';

    li.appendChild(input);
    nameList.appendChild(li);
  }

  document.getElementById('bt-remove-name').onclick = function (e) {
    let size = nameList.children.length;

    if (size > 2) {
      nameList.children[size - 1].remove();
    }
  }

  function getMax() {
    return nameList.children.length * 5;
  }

  function resolvWinner(val) {
    let size = nameList.children.length,
      i = (val - 1) % size;

    return nameList.children[i].children[0].value;
  }

  /*
   * onload
   */
  hideElement(resultsPane);
  hideElement(result);
})();
