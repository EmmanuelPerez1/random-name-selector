(function() {
  var resultsPane = document.getElementById('results-pane'),
    result = document.getElementById('result'),
    resultHistory = document.getElementById('result-history'),
    resultList = document.getElementById('result-list'),
    nameList = document.getElementById('name-list'),
    resultName = document.getElementById('name');

  /*
  * click listeners
  */
  document.getElementById('bt-spin').addEventListener('click', function (e) {
    if (validateState())
    {
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
  });

  document.getElementById('bt-erase-list').addEventListener('click', function (e) {
    let size = resultList.children.length;

    for (let i = size - 1; i >= 0; i--)
      resultList.children[i].remove();

    hideElement(resultHistory);
  });

  document.getElementById('bt-add-name').addEventListener('click', function (e) {
    let li = document.createElement('li'),
      input = document.createElement('input');

    input.type = 'text';

    li.appendChild(input);
    nameList.appendChild(li);

    input.focus();
  });

  document.getElementById('bt-remove-name').addEventListener('click', function (e) {
    let size = nameList.children.length;

    if (size > 2)
      nameList.children[size - 1].remove();
    else
      alert('No se pueden eliminar los dos primeros elementos')
  });

  function getMax() {
    return nameList.children.length * 5;
  }

  function resolvWinner(val) {
    let size = nameList.children.length,
      i = (val - 1) % size;

    return nameList.children[i].children[0].value;
  }

  function validateState() {
    let inputCollection = document.getElementsByTagName('input');

    for (let item of inputCollection)
      if (item.value.trim() == '')
        return false;

    return true;
  }

  /*
   * onload
   */
  hideElement(resultsPane);
  hideElement(result);
})();
