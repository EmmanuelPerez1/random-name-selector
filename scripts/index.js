(function() {
    let resultDiv = document.getElementById('result'),
        loadingDiv = document.getElementById('loading'),
        errDiv = document.getElementById('error'),
        resultListDiv = document.getElementById('result-list'),
        namesList = document.getElementById('names-list'),
        span = document.getElementsByTagName('span')[0];

    /*
    * onclick listeners
    */
    document.getElementById('bt-throw-dice').onclick = function (e) {
        showElement(resultListDiv);

        hideElement(resultDiv);
        hideElement(errDiv);
        showElement(loadingDiv);
        getRandInts(getMax());
    }

    document.getElementById('bt-erase-list').onclick = function (e) {
        resultListDiv.innerHTML = '';
        hideElement(resultListDiv);
    }

    document.getElementById('bt-add').onclick = function (e) {
        let li = document.createElement('li'),
            input = document.createElement('input');
        
        input.type = 'text';
        input.placeholder = 'Nombre';

        li.appendChild(input);
        namesList.appendChild(li);
    }

    document.getElementById('bt-remove').onclick = function (e) {
        let size = namesList.children.length;

        if (size > 2) {
            namesList.children[size - 1].remove();
        }
    }

    /*
    * api function
    */
    function getRandInts(max) {
        // API Key: 3a1b27f9-9547-44a3-abf7-71ceb007f68e
        let rndId = Math.floor((Math.random() * 10000)),
            o = {
                'jsonrpc': '2.0',
                'method': 'generateIntegers',
                'params': {
                    'apiKey': '3a1b27f9-9547-44a3-abf7-71ceb007f68e',
                    'n': 1,
                    'min': 1,
                    'max': max
                },
                'id': rndId
            },
            xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);

                if (rndId == data.id && data.error == null) {
                    let rdata = data.result.random.data[0];
                    span.innerText = resolvWinner(rdata);
                    resultListDiv.innerHTML += (resolvWinner(rdata) + '<br>');

                    showElement(resultDiv);
                } else {
                    showElement(errDiv);
                    console.log(data.error);
                }

                hideElement(loadingDiv);
            }
        }

        xhr.open('POST', 'https://api.random.org/json-rpc/1/invoke');
        xhr.setRequestHeader('Content-Type', 'application/json-rpc');
        xhr.send(JSON.stringify(o));
    }

    /*
    * helper functions
    */
    function hideElement(element) {
        element.className += ' hidden';
    }

    function showElement(element) {
        let c = element.className.replace(/hidden/g, '');
        c = c.replace(/\s+/g, ' ');

        if (c.length == 1 && c == ' ')
            c = '';
        else {
            if(c.indexOf(' ') == 0)
                c = c.substr(1);
            if (c.lastIndexOf(' ') == c.length - 1)
                c = c.substr(0, c.length - 1);
        }

        element.className = c;
    }

    function getMax() {
        return namesList.children.length * 5;
    }

    function resolvWinner(val) {
        let size = namesList.children.length,
            i = (val - 1) % size;

        console.log(val + ' MOD ' + size + ' = ' + (i + 1) + ' :> ' +
            namesList.children[i].children[0].value);
        return namesList.children[i].children[0].value;
    }

    /*
     * onload
     */
    hideElement(resultDiv);
    hideElement(loadingDiv);
    hideElement(errDiv);
    hideElement(resultListDiv);
})();
