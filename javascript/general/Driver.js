var canvas;
var over = false;

var onMainScreen = false;
var onPriorityPractice = true;
var screenSwitch = false;

function clearBody() {
    let elem = document.getElementById("bodyContainer");
    elem.parentNode.removeChild(elem);
}