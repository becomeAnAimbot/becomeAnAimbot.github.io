var attemptingSignup = false;

var signupSketch = function(p) {

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

        signupBox = p.createElement("div","");
        signupBox.parent(gameCont);
        signupBox.addClass("signupBox");
        signupBox.style("background","#FFFFFF");

        signupForm = p.createElement("form","");
        signupForm.attribute("id","signupForm");
        signupForm.attribute("target","signupIFrame");
        signupForm.attribute("method","post");
        signupForm.attribute("action","http://167.99.105.82:6969");
        signupForm.attribute("onsubmit", "return verifyRegisterValues()")
        signupForm.parent(signupBox);

        nameLabel = p.createElement("label","Username");
        nameLabel.parent(signupForm);
        nameLabel.attribute("for","usernameSignupField");
        nameLabel.attribute("id","usernameSignupLabel");

        usernameInput = p.createElement("input", "");
        usernameInput.attribute("type", "text");
        usernameInput.attribute("name", "user");
        usernameInput.attribute("id", "usernameSignupField");
        usernameInput.attribute("class", "signupText");
        usernameInput.parent(signupForm);

        passLabel = p.createElement("label","Password");
        passLabel.parent(signupForm);
        passLabel.attribute("for","passwordSignupField");
        passLabel.attribute("id","passwordLabel");

        passwordInput = p.createElement("input", "");
        passwordInput.attribute("type", "password");
        passwordInput.attribute("name", "pass");
        passwordInput.attribute("id", "passwordSignupField");
        passwordInput.attribute("class", "signupText");
        passwordInput.parent(signupForm);

        passLabel2 = p.createElement("label","Confirm Password");
        passLabel2.parent(signupForm);
        passLabel2.attribute("for","passwordRepField");
        passLabel2.attribute("id","passwordRepLabel");

        passwordInput2 = p.createElement("input", "");
        passwordInput2.attribute("type", "password");
        passwordInput2.attribute("name", "repeatPass");
        passwordInput2.attribute("id", "passwordRepField");
        passwordInput2.attribute("class", "signupText");
        passwordInput2.parent(signupForm);

        emailLabel = p.createElement("label","E-mail");
        emailLabel.parent(signupForm);
        emailLabel.attribute("for","emailField");
        emailLabel.attribute("id","emailLabel");

        emailInput = p.createElement("input", "");
        emailInput.attribute("type", "text");
        emailInput.attribute("name", "email");
        emailInput.attribute("id", "emailField");
        emailInput.attribute("class", "signupText");
        emailInput.parent(signupForm);

        hiddenInput = p.createElement("input", "");
        hiddenInput.parent(signupForm);
        hiddenInput.attribute("class", "signupText");
        hiddenInput.attribute("id", "hiddenInput");
        hiddenInput.attribute("type", "text");
        hiddenInput.attribute("name", "func");
        hiddenInput.attribute("value", "addUser");

        errorMessage = p.createElement("p", "RAWR");
        errorMessage.parent(signupForm);
        errorMessage.attribute("style","visibility: hidden; text-align: center; width: 100%;");
        errorMessage.attribute("id","signupErrorMessage");

        submitButton = p.createElement("input", "Sign Up!");
        submitButton.parent(signupForm);
        submitButton.attribute("value","Sign Up!");
        submitButton.attribute("type","submit");
        submitButton.attribute("id","submitButton");
        submitButton.attribute("class","signupButton");
        submitButton.attribute("onClick","checkSignup()");

        ele = document.getElementById("bodyContainer");
        progress = document.createElement("div");
        ele.appendChild(progress);
        progress.setAttribute("id", "progressContainer")

        bar = document.createElement("div");
        progress.appendChild(bar);
        bar.setAttribute("id", "progressBar");

        mes = document.createElement("p");
        ele.appendChild(mes);
        mes.setAttribute("id","signupMessage");
        mes.innerHTML = "";

        signupIFrame = p.createElement("iframe", "");
        signupIFrame.attribute("name","signupIFrame");
        signupIFrame.attribute("id","signupIFrame");
        signupIFrame.attribute("class","hiddenIFrame");
        signupIFrame.attribute("src","");
        signupIFrame.parent(gameCont);
    }

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        for(let i = 0; i< ambientTargets.length; i++) {
            ambientTargets[i].updateTargetBounds(p.windowWidth, p.windowHeight);
            ambientTargets[i].height = p.windowWidth/50;
            ambientTargets[i].width = p.windowWidth/50;        }
    }
}

function verifyRegisterValues() {
  document.getElementById('signupErrorMessage').style.visibility = 'hidden';
  if(!passwordsMatch()) {
    ele = document.getElementById('signupErrorMessage');
    ele.style.visibility = 'visible';
    ele.innerHTML = 'Passwords do not match!'
    return false;
  }
  if(!emailIsValid()) {
    ele = document.getElementById('signupErrorMessage');
    ele.style.visibility = 'visible';
    ele.innerHTML = 'Email is not valid!'
    return false;
  }
  return true;
}

function passwordsMatch() {
  if(document.getElementById('passwordSignupField').value != document.getElementById('passwordRepField').value) return false;
  return true;
}

function emailIsValid() {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(document.getElementById('emailField').value);
}

function checkSignup() {
  uiclickSound.play();
  if(attemptingSignup) return;
  attemptingSignup = true;
  if(!passwordsMatch() || !emailIsValid()) { attemptingSignup = false; return;}

  document.getElementById('progressBar').style.background = '#BBBBBB';
  document.getElementById("signupMessage").style.display = "none";
  createCheckFeedback();
  document.getElementById('progressContainer').style.margin = "0 0 3% 37.5%";
  window.scrollTo(0,document.body.scrollHeight)
  let cd = setTimeout(function() {
    attemptingSignup = false;
    checkSignupStatus();
  }, 3000);
}

function checkSignupStatus() {
  var myIframe= document.getElementById("signupIFrame");
  var iframeDocument = (myIframe.contentWindow || myIframe.contentDocument);
  iframeDocument = iframeDocument.document;
  let x = iframeDocument.getElementsByTagName("pre");

  if(x[0].innerHTML === "User Created") {
    userCreated();
  } else if(x[0].innerHTML === "Duplicate User") {
    userNotCreated();
  } else {
    connFailed(document.getElementById("signupMessage"));
  }
}

function userCreated() {
  document.getElementById("signupMessage").innerHTML = "User creation success";
  document.getElementById("signupMessage").style.display = "block";
  document.getElementById('progressContainer').style.margin = "0 0 0 37.5%";
  document.getElementById('progressBar').style.background = '#009944';
  window.scrollTo(0,document.body.scrollHeight)
  let cd = setTimeout(function() {
    let x = document.getElementById("usernameSignupField").value;
    document.cookie = `aimbotUser=${x}; expires=Thu, 18 Dec 2030 12:00:00 UTC`;
    startMainScreen();
  }, 400);
}

function userNotCreated() {
  document.getElementById("signupMessage").innerHTML = "Username not available";
  document.getElementById("signupMessage").style.display = "block";
  document.getElementById('progressBar').style.background = '#CF000F';
}

function connFailed(ele) {
  ele.innerHTML = "Connection to server not available";
  ele.style.display = "block";
  document.getElementById('progressBar').style.background = '#CF000F';
}
