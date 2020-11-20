// Add bubble to the top of the page.
var bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'popup');
document.body.appendChild(bubbleDOM);
console.log("Bro I work");

// Lets listen to mouseup DOM events.
document.addEventListener('mouseup', function (e) {
  var selection = window.getSelection().toString();
  if (selection.length > 0) {
    renderBubble(e.clientX, e.clientY, selection);
    console.log("I tried to render bro");
  }
}, false);


// Close the bubble when we click on the screen.
document.addEventListener('mousedown', function (e) {
  bubbleDOM.style.visibility = 'hidden';
  console.log("I hiding bro");
}, false);

// Move that bubble to the appropriate location.
function renderBubble(mouseX, mouseY, selection) {
  var client = new XMLHttpRequest();
  client.open('GET', 'popup/popup.html');
  client.onreadystatechange = function() {
    bubbleDOM.innerHTML = client.responseText;
    console.log("loading stuff bro");
  }
  client.send();  
  bubbleDOM.style.top = mouseY + 'px';
  bubbleDOM.style.left = mouseX + 'px';
  bubbleDOM.style.visibility = 'visible';
}
