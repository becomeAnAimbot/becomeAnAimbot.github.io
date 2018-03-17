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

function createHeader(p, gameCont) {
        mainHeader = p.createElement("div");
        mainHeader.parent(gameCont);
        mainHeader.addClass("mainHeader");
        
        leftHeader = p.createElement("div");
        leftHeader.parent(mainHeader);
        leftHeader.id("leftHeader");
        
        homeButton = p.createElement("button","Home");
        homeButton.parent(leftHeader);
        homeButton.id("homeButton");
        homeButton.attribute("onclick","FUNCTION_NAME()");
        
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
        signInButton.parent(mainHeader);
        signInButton.id("signIn");
        signInButton.attribute("onclick","FUNCTION_NAME()");
}

masterFunction();