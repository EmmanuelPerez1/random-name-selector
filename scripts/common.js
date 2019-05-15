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
