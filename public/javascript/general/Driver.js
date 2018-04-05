var onMainScreen = true;
var onPriorityPractice = false;
var onLoginScreen = false;
var onSignupScreen = false;
var onStatScreen = false;
var onProfileScreen = false;
var onGuideScreen = false;
var onSearchFailedScreen = false;
var screenSwitch = true;

var isLoggedIn = checkLoggedIn();

var priSketch;
var maiSketch;
var logSketch;
var sigSketch;
var staSketch;
var proSketch;
var guiSketch;
var shfSketch;

var intervalList = [];

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
       } else if(onProfileScreen) {
         if(checkScreenSwitch()) {
           proSketch = new p5(profileSketch);
           screenSwitch = false;
         }
       } else if(onGuideScreen) {
         if(checkScreenSwitch()) {
           guiSketch = new p5(guideSketch);
           screenSwitch = false;
         }
       }  else if(onSearchFailedScreen) {
         if(checkScreenSwitch()) {
           shfSketch = new p5(searchFailedSketch);
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
      clearAllIntervals();
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
    proSketch = null;
    guiSketch = null;
}

function removeAllSketches() {
  if(logSketch != null) logSketch.remove();
  if(sigSketch != null) sigSketch.remove();
  if(priSketch != null) priSketch.remove();
  if(maiSketch != null) maiSketch.remove();
  if(staSketch != null) staSketch.remove();
  if(proSketch != null) proSketch.remove();
  if(guiSketch != null) guiSketch.remove();
}

function startPriorityGame() {
    clearBody();
    removeAllSketches();
    onMainScreen = false;
    onLoginScreen = false;
    onSignupScreen = false;
    onProfileScreen = false;
    screenSwitch = true;
    onPriorityPractice = true;
    onStatScreen = false;
    onGuideScreen = false;
}

function startMainScreen() {
    clearBody();
    removeAllSketches();
    onPriorityPractice = false;
    onLoginScreen = false;
    onSignupScreen = false;
    screenSwitch = true;
    onMainScreen = true;
    onProfileScreen = false;
    onStatScreen = false;
    onGuideScreen = false;
}

function startLoginScreen() {
    clearBody();
    removeAllSketches();
    onPriorityPractice = false;
    onMainScreen = false;
    screenSwitch = true;
    onLoginScreen = true;
    onSignupScreen = false;
    onProfileScreen = false;
    onStatScreen = false;
    onGuideScreen = false;
}

function startSignupScreen() {
    clearBody();
    removeAllSketches();
    onPriorityPractice = false;
    onMainScreen = false;
    screenSwitch = true;
    onLoginScreen = false;
    onSignupScreen = true;
    onProfileScreen = false;
    onStatScreen = false;
    onGuideScreen = false;
}

function startStatScreen() {
    clearBody();
    removeAllSketches();
    onPriorityPractice = false;
    onMainScreen = false;
    screenSwitch = true;
    onLoginScreen = false;
    onSignupScreen = false;
    onProfileScreen = false;
    onStatScreen = true;
    onGuideScreen = false;
}

function startProfileScreen() {
    clearBody();
    removeAllSketches();
    onMainScreen = false;
    onLoginScreen = false;
    onSignupScreen = false;
    screenSwitch = true;
    onPriorityPractice = false;
    onStatScreen = false;
    onProfileScreen = true;
    onGuideScreen = false;
}

function startGuideScreen() {
    clearBody();
    removeAllSketches();
    onMainScreen = false;
    onLoginScreen = false;
    onSignupScreen = false;
    screenSwitch = true;
    onPriorityPractice = false;
    onStatScreen = false;
    onProfileScreen = false;
    onGuideScreen = true;
}

function startSearchFailedScreen() {
    clearBody();
    removeAllSketches();
    onMainScreen = false;
    onLoginScreen = false;
    onSignupScreen = false;
    screenSwitch = true;
    onPriorityPractice = false;
    onStatScreen = false;
    onProfileScreen = false;
    onGuideScreen = false;
    onSearchFailedScreen = true;
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

  searchInput = p.createInput();
  searchInput.parent(leftHeader);
  searchInput.id("searchInput");

  magGlass = p.createElement("img");
  magGlass.attribute("src", "images/magnifyingGlass.png");
  magGlass.style("width","25px");
  magGlass.style("padding-left","0.5em");
  magGlass.parent(leftHeader);
  magGlass.id("magGlass");
  magGlass.attribute("onclick","searchUser()");

  dropdownContainer = p.createElement("div","");
  dropdownContainer.attribute("id","dropdownContainer");
  dropdownContainer.parent(rightHeader);

  userButton = p.createElement("button", "Hello, " + getUsername());
  userButton.parent(dropdownContainer);
  userButton.id("userDropdownButton");
  userButton.style("cursor", "default");
  userButton.attribute("class","headerButton");

  dropdown = p.createElement("div","");
  dropdown.attribute("class","dropdownMenu");
  dropdown.parent(dropdownContainer);

  dropdownListItemOne = p.createElement("p", "Stats");
  dropdownListItemOne.parent(dropdown);
  dropdownListItemOne.attribute("onclick","startStatScreen()");

  dropdownListItemTwo = p.createElement("p","My Dashboard");
  dropdownListItemTwo.parent(dropdown);
  dropdownListItemTwo.attribute("onclick","startProfileScreen()");

  dropdownListItemThree = p.createElement("p","Guide");
  dropdownListItemThree.parent(dropdown);
  dropdownListItemThree.attribute("onclick","startGuideScreen()");

  dropdownListItemFour = p.createElement("p","Sign Out");
  dropdownListItemFour.parent(dropdown);
  dropdownListItemFour.attribute("onclick","signUserOut()");
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

  searchInput = p.createInput();
  searchInput.parent(leftHeader);
  searchInput.id("searchInput");
  searchInput.attribute("placeholder","Search for user");

  magGlass = p.createElement("img");
  magGlass.attribute("src", "images/magnifyingGlass.png");
  magGlass.style("width","25px");
  magGlass.style("padding-left","0.5em");
  magGlass.parent(leftHeader);
  magGlass.id("magGlass");
  magGlass.attribute("onclick","searchUser()");

  guideButton = p.createElement("button", "Guide");
  guideButton.parent(rightHeader);
  guideButton.id("guideButton");
  guideButton.attribute("onclick","startGuideScreen()");
  guideButton.attribute("class","headerButton");

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

function searchUser() {
    user = document.getElementById("searchInput").value.trim();
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");   xhttp.send(`func=searchUser&user=${user}`);
    xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
         if(this.responseText == "User not found") {
             startSearchFailedScreen();
         } else if(this.responseText == "User found") {
            // bring up user's stats screen
            userStats = JSON.parse(this.responseText).stats;
         }
       }
     };
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

function signUserOut() {
  document.cookie = "aimbotUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  startMainScreen();
}

function clearAllIntervals() {
  for(int of intervalList) {
    clearInterval(int);
  }
  intervaList = [];
}

masterFunction();
