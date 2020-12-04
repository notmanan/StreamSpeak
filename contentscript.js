var bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'popup-container');
bubbleDOM.setAttribute('id', 'popup-container');
document.body.appendChild(bubbleDOM);

var twitchChat = document.getElementsByClassName("simplebar-content");
console.log(twitchChat);

// Lets listen to mouseup DOM events.
document.addEventListener('mouseup', function (e) {
  var selection = window.getSelection().toString();
  console.log(selection);
  
  selection.split(" ").join("");
  if (selection.length > 0 && selection != null && e.target.className.includes("text-fragment")) {

    fetch("https://mashape-community-urban-dictionary.p.rapidapi.com/define?term="+selection, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "dad8496964mshaf6afb73ab66a72p130bc8jsn1b8bd2f19908",
		"x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(data => {
    console.log(data);
    meaning = data.list[0]["definition"];
    renderBubble(e.clientX, e.clientY, selection, meaning);
    bubbleDOM.style.display = 'block';
    }
)
.catch(err => {
	console.error(err);
});
    console.log("bruh moment 1");
  }
}, false);

var expandIcon = document.getElementById("expand-icon");

// Close the bubble when we click on the screen.
document.addEventListener('mousedown', function (e) {
    // if (isDown != true) {
        var elementId = (e.target).id;
        var elementClass = (e.target).className;
        console.log(elementId);
        console.log("class", elementClass);
        if (!e.target.className.includes("popup") && !e.target.className.includes("selection") && !e.target.className.includes("expand-icon") && !e.target.className.includes("cursorsHover")) {
            console.log("hiding it rn");
            bubbleDOM.style.visibility = 'hidden';
            bubbleDOM.style.display = 'none';
            console.log("bruh moment 2");
            let sel = document.getSelection();
            sel.removeAllRanges();
        } else if (elementId == "expand-icon") {
            var collapseMenu = document.getElementById("collapse");

            console.log("bruh moment 3");
            if(collapseMenu.style.visibility == 'hidden') {
                collapseMenu.style.visibility = 'visible';
            } else {
                collapseMenu.style.visibility = 'hidden';
            }
        }
}, false);


// Close the bubble when we click on the screen.
document.addEventListener('mousedown', function (e) {
    // if (isDown != true) {
        var elementId = (e.target || e.srcElement).id;
        console.log(elementId);
        if (elementId == "pPost") {
            bubbleDOM.style.visibility = 'hidden';
            bubbleDOM.style.display = 'none';
            console.log("bruh moment 2");
        }
}, false);

// Move that bubble to the appropriate location.
function renderBubble(mouseX, mouseY, selection, meaning) {
  bubbleDOM.innerHTML = `<style>
  .popup {
      position: absolute;
      display: inline-block;
      cursor: pointer;
      visibility: visible;
  }

  /* The actual popup (appears on top) */
  .popup {
      visibility: visible;
      width: 100%;
      color: #fff;
      text-align: left;
      border-radius: 4px;
      z-index: 1;
      font-family: 'Inter', sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      cursor: pointer;
  }

  .popup-header {
    padding: 8px 15px;
    background-color: #464649;
    vertical-align: middle;
    border-radius: 4px 4px 0 0;
  }

  .popup-content {
    // display: none;
    background-color: #535361;
    padding: 8px;
    border-radius: 0px 0px 4px 4px;
    // visibility: hidden;
}

.popup-content .popup-action-option {
    padding: 8px
}

  .popup .popup-image {
    max-width: 20px;
  }

  .selection-name, .images-container {
      display: inline-block;
  }

  .images-container {
      float: right;
  }

  .popup-image:not(:last-child) {
      margin: 0 3px;
  }

  .selection-name {
      vertical-align: middle;
  }

  #collapse {
      visibility: hidden;
  }

//   .spacingExtra {
//       padding: 16px 0 8px 0;
//   }

//   .spacingExtra:hover {
//       background-color: #535361;
//   }

//   .spacingReport {
//       padding: 8px 0 16px 0;
//   }

//   .spacingReport:hover {
//       background-color: #535361;
//   }

  /* Popup arrow
  .popup .popuptext::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #555 transparent transparent transparent;
  } */

  /* Toggle this class when clicking on the popup container (hide and show the popup) */
  .popup .show {
      visibility: visible;
      -webkit-animation: fadeIn 1s;
      animation: fadeIn 1s
  }

  /* Add animation (fade in the popup) */
  @-webkit-keyframes fadeIn {
      from {opacity: 0;}
      to {opacity: 1;}
  }

  @keyframes fadeIn {
      from {opacity: 0;}
      to {opacity:1 ;}
  }
</style>

<div class="popup">
    <div class="popup-header">
    <span class="selection-name"><b>`+selection+`: </b></span>
    <span class="selection-def"><b>`+meaning+`</b></span>
        <span class="images-container">
            <img class="popup-image" id="save-icon;" src="https://emenimor.sirv.com/StreamSpeak/Icon_save_outline.png"" width="24px" height="24px">
            <img class="popup-image" id="expand-icon" src="https://emenimor.sirv.com/StreamSpeak/Icon_right_outline.png" width="24px" height="24px">
        </span>
    </div>
    <div class="popup-content" id="collapse">
        <div class="popup-action-option" id="spacingExtra">
            Find out more
            <span class="images-container">
                <img src="https://emenimor.sirv.com/StreamSpeak/Icon_export.png">
            </span>
        </div>
        <div class="popup-action-option" id="spacingReport">
            Report as incorrect
            <span class="images-container">
                <img src="https://emenimor.sirv.com/StreamSpeak/Icon_report.png">
            </span>
        </div>
    </div>
</div>
`
  bubbleDOM.style.top = mouseY + 'px';
  bubbleDOM.style.left = (window.innerWidth - 320) + 'px';
  bubbleDOM.style.visibility = 'visible';
}
