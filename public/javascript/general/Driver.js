var onMainScreen = true;
var onPriorityPractice = false;
var onLoginScreen = false;
var onStatScreen = false;
var screenSwitch = true;

var priSketch;
var maiSketch;
var logSketch;
var staSketch;

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
       } else if(onLoginScreen) {
         if(checkScreenSwitch()) {
           logSketch = new p5(loginSketch);
           screenSwitch = false;
         }
       } else if(onStatScreen) {
           if (checkScreenSwitch()) {
               staSketch = new p5(statsSketch);
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
    logSketch = null;
    priSketch = null;
    maiSketch = null;
    staSketch = null;
}

function removeAllSketches() {
  if(logSketch != null) logSketch.remove();
  if(priSketch != null) priSketch.remove();
  if(maiSketch != null) maiSketch.remove();
    if(staSketch != null) staSketch.remove();
}

function startPriorityGame() {
    clearBody();
    removeAllSketches();
    onMainScreen = false;
    onLoginScreen = false;
    screenSwitch = true;
    onPriorityPractice = true;
    onStatScreen = false;
}

function startMainScreen() {
    clearBody();
    removeAllSketches();
    onPriorityPractice = false;
    onLoginScreen = false;
    screenSwitch = true;
    onMainScreen = true;
    onStatScreen = false;
}

function startLoginScreen() {
  clearBody();
  removeAllSketches();
  onPriorityPractice = false;
  onMainScreen = false;
  screenSwitch = true;
  onLoginScreen = true;
    onStatScreen = false;
}

function startStatScreen() {
    clearBody();
    removeAllSketches();
    onPriorityPractice = false;
    onMainScreen = false;
    screenSwitch = true;
    onLoginScreen = false;
    onStatScreen = true;
}


function createHeader(p, gameCont) {
        mainHeader = p.createElement("div");
        mainHeader.parent(gameCont);
        mainHeader.addClass("mainHeader");

        leftHeader = p.createElement("div");
        leftHeader.parent(mainHeader);
        leftHeader.id("leftHeader");

        rightHeader = p.createElement("div");
        rightHeader.parent(mainHeader);
        rightHeader.id("rightHeader");

        homeButton = p.createElement("button","Home");
        homeButton.parent(leftHeader);
        homeButton.id("homeButton");
        homeButton.attribute("onclick","startMainScreen()");

        searchBar = p.createInput();
        searchBar.parent(leftHeader);
        searchBar.id("searchBar");

        magGlass = p.createElement("img");
        magGlass.attribute("src", "images/magnifyingGlass.png");
        magGlass.style("width","25px");
        magGlass.style("padding-left","0.5em")
        magGlass.parent(leftHeader);
        magGlass.id("magGlass");

        signInButton = p.createElement("button","Sign in");
        signInButton.parent(rightHeader);
        signInButton.id("signIn");
        signInButton.attribute("onclick","startLoginScreen()");

        statsButton = p.createElement("button", "Stats");
        statsButton.parent(rightHeader);
        statsButton.id("statsButton");
        statsButton.attribute("onclick", "startStatScreen()");
}

masterFunction();
