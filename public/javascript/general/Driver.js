var onMainScreen = true;
var onPriorityPractice = false;
var onLoginScreen = false;
var onSignupScreen = false;
var onStatScreen = false;
var screenSwitch = true;

var isLoggedIn = checkLoggedIn();

var priSketch;
var maiSketch;
var logSketch;
var sigSketch;
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
       } else if(onSignupScreen) {
         if(checkScreenSwitch()) {
           sigSketch = new p5(signupSketch);
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
    sigSketch = null;
    priSketch = null;
    maiSketch = null;
    staSketch = null;
}

function removeAllSketches() {
  if(logSketch != null) logSketch.remove();
  if(sigSketch != null) sigSketch.remove();
  if(priSketch != null) priSketch.remove();
  if(maiSketch != null) maiSketch.remove();
  if(staSketch != null) staSketch.remove();
}

function startPriorityGame() {
    clearBody();
    removeAllSketches();
    onMainScreen = false;
    onLoginScreen = false;
    onSignupScreen = false;
    screenSwitch = true;
    onPriorityPractice = true;
    onStatScreen = false;
}

function startMainScreen() {
    clearBody();
    removeAllSketches();
    onPriorityPractice = false;
    onLoginScreen = false;
    onSignupScreen = false;
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
  onSignupScreen = false;
  onStatScreen = false;
}

function startSignupScreen() {
  clearBody();
  removeAllSketches();
  onPriorityPractice = false;
  onMainScreen = false;
  screenSwitch = true;
  onLoginScreen = false;
  onSignupScreen = true;
  onStatScreen = false;
}

function startStatScreen() {
    clearBody();
    removeAllSketches();
    onPriorityPractice = false;
    onMainScreen = false;
    screenSwitch = true;
    onLoginScreen = false;
    onSignupScreen = false;
    onStatScreen = true;
}


function createHeader(p, gameCont) {
  checkLoggedIn();
  if(!isLoggedIn) createdNotLoggedInHeader(p, gameCont);
  else createLoggedInHeader(p, gameCont);
}

function createLoggedInHeader(p, gameCont) {
  mainHeader = p.createElement("div");
  mainHeader.parent(gameCont);
  mainHeader.addClass("mainHeader");
  mainHeader.attribute("id","headerID");

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
  homeButton.attribute("class","headerButton");

  searchBar = p.createInput();
  searchBar.parent(leftHeader);
  searchBar.id("searchBar");

  magGlass = p.createElement("img");
  magGlass.attribute("src", "images/magnifyingGlass.png");
  magGlass.style("width","25px");
  magGlass.style("padding-left","0.5em");
  magGlass.parent(leftHeader);
  magGlass.id("magGlass");

  userButton = p.createElement("button", "Hello, " + getUsername());
  userButton.parent(rightHeader);
  userButton.id("signIn");
  userButton.attribute("onclick","startLoginScreen()");
  userButton.attribute("class","headerButton");
}

function createdNotLoggedInHeader(p, gameCont) {
  mainHeader = p.createElement("div");
  mainHeader.parent(gameCont);
  mainHeader.addClass("mainHeader");
  mainHeader.attribute("id","headerID");

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
  homeButton.attribute("class","headerButton");

  searchBar = p.createInput();
  searchBar.parent(leftHeader);
  searchBar.id("searchBar");

  magGlass = p.createElement("img");
  magGlass.attribute("src", "images/magnifyingGlass.png");
  magGlass.style("width","25px");
  magGlass.style("padding-left","0.5em");
  magGlass.parent(leftHeader);
  magGlass.id("magGlass");

  signInButton = p.createElement("button","Sign in");
  signInButton.parent(rightHeader);
  signInButton.id("signIn");
  signInButton.attribute("onclick","startLoginScreen()");
  signInButton.attribute("class","headerButton");


  signUpButton = p.createElement("button","Register");
  signUpButton.parent(rightHeader);
  signUpButton.id("signUp");
  signUpButton.attribute("onclick","startSignupScreen()");
  signUpButton.attribute("class","headerButton");

  statsButton = p.createElement("button", "Stats");
  statsButton.parent(rightHeader);
  statsButton.id("statsButton");
  statsButton.attribute("onclick", "startStatScreen()");
  statsButton.attribute("class","headerButton");
}

function checkLoggedIn() {
  if(checkCookie("aimbotUser")) isLoggedIn = true;
  else isLoggedIn = false;
}

function checkCookie(cname) {
    var username = getCookie(cname);
    if (username != "") return true;
    return false;
}

function getUsername() {
  return getCookie("aimbotUser");
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

masterFunction();

