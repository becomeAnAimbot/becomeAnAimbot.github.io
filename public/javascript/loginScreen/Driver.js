var attemptingLogIn = false;

var loginSketch = function(p) {

    var ambientTargets = [];
    var randomColors = ["#BE0000", "#003AFF", "#007800", "#EA006E", "#A461D7", "#D14200", "#00B3F3"];

    p.setup = function() {
        canv = p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(150);
        canv.style("z-index","-2");
        canv.addClass("mainScreenBackground");
        canv.position(0,0);

        p.mainScreenHtml();

        if(document.body.clientWidth < 980) {p.noLoop(); return;}
        for(let i = 0; i < 25; i++) {
            t = new Target(p, p.windowWidth, p.windowHeight);
            t.randomPlacement();
            t.color = p.chooseRandomColor();
            t.show();
            t.assignRandomSpeed(-10,10);
            ambientTargets.push(t);
        }
    };

    p.draw = function() {
        p.background("#FFFFFF");
        for(let i = 0; i < ambientTargets.length; i++) {
            ambientTargets[i].show();
            ambientTargets[i].checkBoundaryHits(ambientTargets[i]);
            ambientTargets[i].move();
        }
    };

    p.chooseRandomColor = function() {
      return randomColors[p.getRandomInt(randomColors.length)];
    }

    p.getRandomInt = function(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }


    p.mainScreenHtml = function() {
        gameCont = p.createElement("div","");
        gameCont.id("bodyContainer");

        createHeader(p, gameCont);

        mainTitle = p.createElement("img");
        mainTitle.attribute("src", "images/small_title.png");
        mainTitle.parent(gameCont);
        mainTitle.addClass("mainTitle");

        loginBox = p.createElement("div","");
        loginBox.parent(gameCont);
        loginBox.addClass("loginBox");
        loginBox.style("background","#FFFFFF");

        loginForm = p.createElement("form","");
        loginForm.attribute("id","loginForm");
        loginForm.attribute("target","loginIFrame");
        loginForm.attribute("method","post");
        loginForm.attribute("action","http://167.99.105.82:6969");
        loginForm.parent(loginBox);

        nameLabel = p.createElement("label","Username");
        nameLabel.parent(loginForm);
        nameLabel.attribute("for","usernameField");
        nameLabel.attribute("id","usernameLabel");

        usernameInput = p.createElement("input", "");
        usernameInput.attribute("type", "text");
        usernameInput.attribute("name", "user");
        usernameInput.attribute("id", "usernameField");
        usernameInput.attribute("class", "loginText");
        usernameInput.parent(loginForm);

        passLabel = p.createElement("label","Password");
        passLabel.parent(loginForm);
        passLabel.attribute("for","passwordField");
        passLabel.attribute("id","passwordLabel");

        passwordInput = p.createElement("input", "");
        passwordInput.attribute("type", "password");
        passwordInput.attribute("name", "pass");
        passwordInput.attribute("id", "passwordField");
        passwordInput.attribute("class", "loginText");
        passwordInput.parent(loginForm);

        hiddenInput = p.createElement("input", "");
        hiddenInput.parent(loginForm);
        hiddenInput.attribute("class", "loginText");
        hiddenInput.attribute("id", "hiddenInput");
        hiddenInput.attribute("type", "text");
        hiddenInput.attribute("name", "func");
        hiddenInput.attribute("value", "loginUser");

        submitButton = p.createElement("input", "Submit");
        submitButton.attribute("type","submit");
        submitButton.attribute("id","submitButton");
        submitButton.attribute("class","loginButton");
        submitButton.attribute("value","Sign in");
        submitButton.attribute("onClick","checkLogin()");
        submitButton.parent(loginForm);

        loginIFrame = p.createElement("iframe", "");
        loginIFrame.attribute("name","loginIFrame");
        loginIFrame.attribute("id","loginIFrame");
        loginIFrame.attribute("class","hiddenIFrame");
        loginIFrame.attribute("src","");
        loginIFrame.parent(gameCont);

        ele = document.getElementById("bodyContainer");
        progress = document.createElement("div");
        ele.appendChild(progress);
        progress.setAttribute("id", "progressContainer")

        bar = document.createElement("div");
        progress.appendChild(bar);
        bar.setAttribute("id", "progressBar");

        mes = document.createElement("p");
        ele.appendChild(mes);
        mes.setAttribute("id","loginMessage");
        mes.innerHTML = "";
    }

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        for(let i = 0; i< ambientTargets.length; i++) {
            ambientTargets[i].updateTargetBounds(p.windowWidth, p.windowHeight);
            ambientTargets[i].height = p.windowWidth/50;
            ambientTargets[i].width = p.windowWidth/50;        }
    }
}

function checkLogin() {
  uiclickSound.play();
  if(attemptingLogIn) return;
  attemptingLogIn = true;

  document.getElementById('progressBar').style.background = '#BBBBBB';
  document.getElementById("loginMessage").style.display = "none";
  createCheckFeedback();
  let cd = setTimeout(function() {
    attemptingLogIn = false;
    checkLoginStatus();
  }, 3000);
}

function createCheckFeedback() {
  document.getElementById('progressContainer').style.display = 'block';
  let op = 1;
  let cd = setInterval(function() {
    if(op >= 99) {
      clearInterval(cd);
    } else {
      op += 1.5;
      bar.style.width = op + "%";
    }
  }, 30);
}

function checkLoginStatus() {
  var myIframe= document.getElementById("loginIFrame");
  var iframeDocument = (myIframe.contentWindow || myIframe.contentDocument);
  iframeDocument = iframeDocument.document;
  let x = iframeDocument.getElementsByTagName("pre");
  if(x[0].innerHTML === "Login Success") {
    loggedIn();
  } else if(x[0].innerHTML === "Login Failed") {
    notLoggedIn();
  } else {
    connFailed(document.getElementById("loginMessage"));
  }
}

function loggedIn() {
  document.getElementById("loginMessage").innerHTML = "Verification Success";
  document.getElementById("loginMessage").style.display = "block";
  document.getElementById('progressBar').style.background = '#009944';
  let cd = setTimeout(function() {
    let x = document.getElementById("usernameField").value;
    document.cookie = `aimbotUser=${x}; expires=Thu, 18 Dec 2030 12:00:00 UTC`;
    startMainScreen();
  }, 400);
}

function notLoggedIn() {
  document.getElementById("loginMessage").innerHTML = "Verification Failed, Incorrect username or password";
  document.getElementById("loginMessage").style.display = "block";
  document.getElementById('progressBar').style.background = '#CF000F';
}
