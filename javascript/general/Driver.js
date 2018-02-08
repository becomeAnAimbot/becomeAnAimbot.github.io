var onMainScreen = false;
var onPriorityPractice = true;
var screenSwitch = true;

function setup() {
    
}

function draw() {
    if(onMainScreen) {
       if(screenSwitch) {
            screenSwitch = false;
            setupMain();
        }
    } else if(onPriorityPractice) {
        if(screenSwitch) {
            screenSwitch = false;
            setupPriority();
        }
        drawPriority();
    }
}

function clearBody() {
    let elem = document.getElementById("bodyContainer");
    elem.parentNode.removeChild(elem);
}