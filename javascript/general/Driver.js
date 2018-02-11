var onMainScreen = true;
var onPriorityPractice = false;
var screenSwitch = true;

var priSketch;
var maiSketch;

function masterFunction() {
    let cd = setInterval(function() {
       if(onMainScreen) {
           if(checkScreenSwitch()) {
               maiSketch = new p5(mainSketch);
               screenSwitch = false;
           }
                
       } else if(onPriorityPractice) {
           if(checkScreenSwitch()) {
               priSketch = new p5(prioritySketch);
               screenSwitch = false;
           }
       } 
    }, 10);
}

function clearBody() {
    let elem = document.getElementById("bodyContainer");
    elem.parentNode.removeChild(elem);
}

function checkScreenSwitch() {
    if(screenSwitch) {
        clearAllSketches();
        return true;
    }
    return false;
}

function clearAllSketches() {
    priSketch = null;
    maiSketch = null;
}

function startPriorityGame() {
    clearBody();
    maiSketch.remove();
    onMainScreen = false;
    screenSwitch = true;
    onPriorityPractice = true;
}

function startMainScreen() {
    clearBody();
    priSketch.remove();
    onPriorityPractice = false;
    screenSwitch = true;
    onMainScreen = true;
}

masterFunction();