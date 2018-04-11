var attemptingAction = false;

var profileSketch = function(p) {

  var ambientTargets = [];
  var randomColors = ["#BE0000", "#003AFF", "#007800", "#EA006E", "#A461D7", "#D14200", "#00B3F3"];

  p.setup = function() {
    canv = p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(150);
    canv.style("z-index","-2");
    canv.addClass("mainScreenBackground");
    canv.position(0,0);

    p.profileScreenHtml();

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

  p.profileScreenHtml = function() {
    gameCont = p.createElement("div","");
    gameCont.id("bodyContainer");

    createHeader(p, gameCont);

    mainTitle = p.createElement("img");
    mainTitle.attribute("src", "images/small_title.png");
    mainTitle.parent(gameCont);
    mainTitle.addClass("mainTitle");

    profileCont = p.createElement("div","");
    profileCont.parent(gameCont);
    profileCont.attribute("id","profileContainer");

    profileImage = p.createElement("img","");
    profileImage.attribute("src","images/profile.jpg");
    profileImage.parent(profileCont);

    profileMessage = p.createElement("p","Looking good " + getUsername() + "!");
    profileMessage.parent(profileCont);
    profileMessage.attribute("class", "profileBarMessage");

    changePic = p.createElement("p", "Upload Profile Picture");
    changePic.parent(profileCont);
    changePic.attribute("class","accountButton");
    changePic.attribute("onclick","showChangePicture()");

    changePass = p.createElement("p", "Change Password");
    changePass.parent(profileCont);
    changePass.attribute("class","accountButton");
    changePass.attribute("onclick","showChangePassword()");

    deleteStats = p.createElement("p", "Delete All Stats");
    deleteStats.parent(profileCont);
    deleteStats.attribute("class","accountButton");
    deleteStats.attribute("onclick","showDeleteStats()");

    deleteAccount = p.createElement("p","Delete Account");
    deleteAccount.parent(profileCont);
    deleteAccount.attribute("class","accountButton");
    deleteAccount.attribute("onclick","showDeleteAccount()");

    deleteAccountBox = p.createElement("div","");
    deleteAccountBox.parent(gameCont);
    deleteAccountBox.attribute("id","deleteAccountCont");
    deleteAccountBox.attribute("class","accountCont");

    goodbyeMessage = p.createElement("p","Sorry to see you go, " + getUsername() + ".<br>Please enter your password to verify your identity.");
    goodbyeMessage.parent(deleteAccountBox);
    goodbyeMessage.attribute("class","profileBoxMessage");

    deleteForm = p.createElement("form","");
    deleteForm.attribute("id","deleteForm");
    deleteForm.attribute("target","hiddenIFrame");
    deleteForm.attribute("method","post");
    deleteForm.attribute("action","http://167.99.105.82:6969");
    deleteForm.parent(deleteAccountBox);

    passLabel = p.createElement("label","Password");
    passLabel.parent(deleteForm);
    passLabel.attribute("for","pass");
    passLabel.attribute("id","passwordLabelDelete");
    passLabel.attribute("class","profileLabel");

    passwordInput = p.createElement("input", "");
    passwordInput.attribute("type", "password");
    passwordInput.attribute("name", "pass");
    passwordInput.attribute("id", "passwordFieldDelete");
    passwordInput.attribute("class", "loginText");
    passwordInput.parent(deleteForm);

    delLabel = p.createElement("label","Please type 'DELETE' (Case sensitive)");
    delLabel.parent(deleteForm);
    delLabel.attribute("for","del");
    delLabel.attribute("id","deleteLabelProfile");
    delLabel.attribute("class","profileLabel");

    delInput = p.createElement("input", "");
    delInput.attribute("type", "text");
    delInput.attribute("name", "del");
    delInput.attribute("id", "deleteFieldDelete");
    delInput.attribute("class", "loginText");
    delInput.parent(deleteForm);

    hiddenDeleteInput = p.createElement("input", "");
    hiddenDeleteInput.parent(deleteForm);
    hiddenDeleteInput.attribute("style","display:none;");
    hiddenDeleteInput.attribute("name", "func");
    hiddenDeleteInput.attribute("type", "text");
    hiddenDeleteInput.attribute("value", "deleteUser");

    usernameDelInput = p.createElement("input","");
    usernameDelInput.parent(deleteForm);
    usernameDelInput.attribute("name","user");
    usernameDelInput.attribute("value",getUsername());
    usernameDelInput.attribute("style","display:none;");

    delButton = p.createElement("input","submit");
    delButton.attribute("type","submit");
    delButton.attribute("id","delButton");
    delButton.attribute("class","loginButton");
    delButton.attribute("value","Delete Account");
    delButton.attribute("onclick","startDeleteAccount()");
    delButton.parent(deleteForm);

    deleteStatsBox = p.createElement("div","");
    deleteStatsBox.parent(gameCont);
    deleteStatsBox.attribute("id","deleteStatsCont");
    deleteStatsBox.attribute("class","accountCont");

    warningMessage = p.createElement("p","WARNING, " + getUsername() + ".<br>ALL GAMES EVER PLAYED WILL BE CLEARED");
    warningMessage.parent(deleteStatsBox);
    warningMessage.attribute("class","profileBoxMessage");

    deleteStatsForm = p.createElement("form","");
    deleteStatsForm.attribute("id","deleteStatsForm");
    deleteStatsForm.attribute("target","hiddenIFrame");
    deleteStatsForm.attribute("method","post");
    deleteStatsForm.attribute("action","http://167.99.105.82:6969");
    deleteStatsForm.parent(deleteStatsBox);

    passStatsLabel = p.createElement("label","Password");
    passStatsLabel.parent(deleteStatsForm);
    passStatsLabel.attribute("for","pass");
    passStatsLabel.attribute("id","passwordStatsLabelDelete");
    passStatsLabel.attribute("class","profileLabel");

    passwordStatsInput = p.createElement("input", "");
    passwordStatsInput.attribute("type", "password");
    passwordStatsInput.attribute("name", "pass");
    passwordStatsInput.attribute("id", "passwordStatsFieldDelete");
    passwordStatsInput.attribute("class", "loginText");
    passwordStatsInput.parent(deleteStatsForm);

    delStatsLabel = p.createElement("label","Please type 'DELETE' (Case sensitive)");
    delStatsLabel.parent(deleteStatsForm);
    delStatsLabel.attribute("for","del");
    delStatsLabel.attribute("id","deleteStatsLabelProfile");
    delStatsLabel.attribute("class","profileLabel");

    delStatsInput = p.createElement("input", "");
    delStatsInput.attribute("type", "text");
    delStatsInput.attribute("name", "del");
    delStatsInput.attribute("id", "deleteStatsFieldDelete");
    delStatsInput.attribute("class", "loginText");
    delStatsInput.parent(deleteStatsForm);

    hiddenDeleteStatsInput = p.createElement("input", "");
    hiddenDeleteStatsInput.parent(deleteStatsForm);
    hiddenDeleteStatsInput.attribute("style","display:none;");
    hiddenDeleteStatsInput.attribute("name", "func");
    hiddenDeleteStatsInput.attribute("type", "text");
    hiddenDeleteStatsInput.attribute("value", "deleteStats");

    usernameDelStatsInput = p.createElement("input","");
    usernameDelStatsInput.parent(deleteStatsForm);
    usernameDelStatsInput.attribute("name","user");
    usernameDelStatsInput.attribute("value",getUsername());
    usernameDelStatsInput.attribute("style","display:none;");

    delStatsButton = p.createElement("input","submit");
    delStatsButton.attribute("type","submit");
    delStatsButton.attribute("id","delStatsButton");
    delStatsButton.attribute("class","loginButton");
    delStatsButton.attribute("value","Delete Stats");
    delStatsButton.attribute("onclick","startDeleteStats()");
    delStatsButton.parent(deleteStatsForm);

    changePassBox = p.createElement("div","");
    changePassBox.parent(gameCont);
    changePassBox.attribute("id","changePassCont");
    changePassBox.attribute("class","accountCont");
    changePassBox.attribute("style","display: none");

    changeMessage = p.createElement("p","Please fill in the fields to change your password, " + getUsername() + ".");
    changeMessage.parent(changePassBox);
    changeMessage.attribute("class","profileBoxMessage");

    changePassForm = p.createElement("form","");
    changePassForm.attribute("id","changePassForm");
    changePassForm.attribute("target","hiddenIFrame");
    changePassForm.attribute("method","post");
    changePassForm.attribute("action","http://167.99.105.82:6969");
    changePassForm.parent(changePassBox);

    passLabel = p.createElement("label","Old Password");
    passLabel.parent(changePassForm);
    passLabel.attribute("for","oldpass");
    passLabel.attribute("id","passwordOldLabelChange");
    passLabel.attribute("class","profileLabel");

    passwordOldInput = p.createElement("input", "");
    passwordOldInput.attribute("type", "password");
    passwordOldInput.attribute("name", "pass");
    passwordOldInput.attribute("id", "passwordOldFieldChange");
    passwordOldInput.attribute("class", "loginText");
    passwordOldInput.parent(changePassForm);

    passNewLabel = p.createElement("label","New Password");
    passNewLabel.parent(changePassForm);
    passNewLabel.attribute("for","newpass");
    passNewLabel.attribute("id","passwordNewLabelChange");
    passNewLabel.attribute("class","profileLabel");

    passwordNewInput = p.createElement("input", "");
    passwordNewInput.attribute("type", "password");
    passwordNewInput.attribute("name", "newpass");
    passwordNewInput.attribute("id", "passwordNewFieldChange");
    passwordNewInput.attribute("class", "loginText");
    passwordNewInput.parent(changePassForm);

    passLabel = p.createElement("label","Repeat New Password");
    passLabel.parent(changePassForm);
    passLabel.attribute("for","newrepass");
    passLabel.attribute("id","passwordNewRepeatLabelChange");
    passLabel.attribute("class","profileLabel");

    passwordOldInput = p.createElement("input", "");
    passwordOldInput.attribute("type", "password");
    passwordOldInput.attribute("name", "newrepass");
    passwordOldInput.attribute("id", "passwordNewRepeatFieldChange");
    passwordOldInput.attribute("class", "loginText");
    passwordOldInput.parent(changePassForm);

    hiddenPasswordInput = p.createElement("input", "");
    hiddenPasswordInput.parent(changePassForm);
    hiddenPasswordInput.attribute("style", "display:none");
    hiddenPasswordInput.attribute("type", "text");
    hiddenPasswordInput.attribute("name", "func");
    hiddenPasswordInput.attribute("value", "changePassword");

    usernamePassInput = p.createElement("input","");
    usernamePassInput.parent(changePassForm);
    usernamePassInput.attribute("name","user");
    usernamePassInput.attribute("value",getUsername());
    usernamePassInput.attribute("style","display:none;");

    changePassButton = p.createElement("input","submit");
    changePassButton.attribute("type","submit");
    changePassButton.attribute("id","changeButton");
    changePassButton.attribute("class","loginButton");
    changePassButton.attribute("value","Change Password");
    changePassButton.attribute("onclick","changePassword()");
    changePassButton.parent(changePassForm);

    ele = document.getElementById("bodyContainer");
    progress = document.createElement("div");
    ele.appendChild(progress);
    progress.setAttribute("id", "progressContainer")

    bar = document.createElement("div");
    progress.appendChild(bar);
    bar.setAttribute("id", "progressBar");

    mes = document.createElement("p");
    ele.appendChild(mes);
    mes.setAttribute("id","profileMessage");
    mes.innerHTML = "";

    hiddenIFrame = p.createElement("iframe", "");
    hiddenIFrame.attribute("name","hiddenIFrame");
    hiddenIFrame.attribute("id","hiddenIFrame");
    hiddenIFrame.attribute("class","hiddenIFrame");
    hiddenIFrame.attribute("src","");
    hiddenIFrame.parent(gameCont);
  }

  p.windowResized = function() {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      for(let i = 0; i< ambientTargets.length; i++) {
          ambientTargets[i].updateTargetBounds(p.windowWidth, p.windowHeight);
          ambientTargets[i].height = p.windowWidth/50;
          ambientTargets[i].width = p.windowWidth/50;        }
  }
}

function showDeleteAccount() {
  clearProfileBoxes();
  ele = document.getElementById('deleteAccountCont');
  ele.style.display = 'block';
}

function showDeleteStats() {
  clearProfileBoxes();
  ele = document.getElementById('deleteStatsCont');
  ele.style.display = 'block';
}

function showChangePassword() {
  clearProfileBoxes();
  ele = document.getElementById('changePassCont');
  ele.style.display = 'block';
}

function showChangePicture() {
  clearProfileBoxes();
}

function clearProfileBoxes() {
  ele = document.getElementById('changePassCont');
  ele.style.display = 'none';
  ele = document.getElementById('deleteAccountCont');
  ele.style.display = 'none';
  ele = document.getElementById('deleteStatsCont');
  ele.style.display = 'none';
  document.getElementById("profileMessage").innerHTML = "";
  document.getElementById("profileMessage").style.display = "none";
  document.getElementById('progressContainer').style.display = 'none';
}

function changePassword() {
  if(attemptingAction) return;
  attemptingAction = true;

  document.getElementById('progressBar').style.background = '#BBBBBB';
  document.getElementById("profileMessage").style.display = "none";
  createCheckFeedback();
  document.getElementById('progressContainer').style.margin = "2% 0 2% 37.5%";
  window.scrollTo(0,document.body.scrollHeight)
  let cd = setTimeout(function() {
    attemptingAction = false;
    checkPasswordChangeStatus();
    document.getElementById('passwordOldFieldChange').value = "";
    document.getElementById('passwordNewFieldChange').value = "";
    document.getElementById('passwordNewRepeatFieldChange').value = "";
  }, 3000);
}

function checkPasswordChangeStatus() {
  var myIframe= document.getElementById("hiddenIFrame");
  var iframeDocument = (myIframe.contentWindow || myIframe.contentDocument);
  iframeDocument = iframeDocument.document;
  let x = iframeDocument.getElementsByTagName("pre");

  if(x[0].innerHTML === "Password Updated") {
    passwordChanged();
  } else if(x[0].innerHTML === "Password Update Failed") {
    passwordNotChanged();
  } else {
    connFailed(document.getElementById("profileMessage"));
  }
}

function passwordChanged() {
  document.getElementById("profileMessage").innerHTML = "Your password has been changed!";
  document.getElementById("profileMessage").style.display = "block";
  document.getElementById('progressBar').style.background = '#009944';
  window.scrollTo(0,document.body.scrollHeight)
  let cd = setTimeout(function() {
    document.getElementById("profileMessage").innerHTML = "";
    document.getElementById("profileMessage").style.display = "none";
  }, 400);
}

function passwordNotChanged() {
  document.getElementById("profileMessage").innerHTML = "User information not correct";
  document.getElementById("profileMessage").style.display = "block";
  document.getElementById('progressBar').style.background = '#CF000F';
}

function startDeleteAccount() {
  if(attemptingAction) return;
  attemptingAction = true;

  document.getElementById('progressBar').style.background = '#BBBBBB';
  document.getElementById("profileMessage").style.display = "none";
  createCheckFeedback();
  document.getElementById('progressContainer').style.margin = "2% 0 2% 37.5%";
  window.scrollTo(0,document.body.scrollHeight)
  let cd = setTimeout(function() {
    attemptingAction = false;
    checkDeleteStatus();
    document.getElementById('passwordFieldDelete').value = "";
    document.getElementById('deleteFieldDelete').value = "";
  }, 3000);
}

function checkDeleteStatus() {
  var myIframe= document.getElementById("hiddenIFrame");
  var iframeDocument = (myIframe.contentWindow || myIframe.contentDocument);
  iframeDocument = iframeDocument.document;
  let x = iframeDocument.getElementsByTagName("pre");

  if(x[0].innerHTML === "Delete Success") {
    userDeleted();
  } else if(x[0].innerHTML === "Delete Failed") {
    userNotDeleted();
  } else {
    connFailed(document.getElementById("profileMessage"));
  }
}

function userDeleted() {
  document.getElementById("profileMessage").innerHTML = "Account has been deleted";
  document.getElementById("profileMessage").style.display = "block";
  document.getElementById('progressBar').style.background = '#009944';
  window.scrollTo(0,document.body.scrollHeight)
  let cd = setTimeout(function() {
    signUserOut();
    startMainScreen();
  }, 400);
}

function userNotDeleted() {
  document.getElementById("profileMessage").innerHTML = "User information not correct";
  document.getElementById("profileMessage").style.display = "block";
  document.getElementById('progressBar').style.background = '#CF000F';
}

function startDeleteStats() {
  if(attemptingAction) return;
  attemptingAction = true;

  document.getElementById('progressBar').style.background = '#BBBBBB';
  document.getElementById("profileMessage").style.display = "none";
  createCheckFeedback();
  document.getElementById('progressContainer').style.margin = "2% 0 2% 37.5%";
  window.scrollTo(0,document.body.scrollHeight)
  let cd = setTimeout(function() {
    attemptingAction = false;
    checkDeleteStatsStatus();
    document.getElementById('passwordStatsFieldDelete').value = "";
    document.getElementById('deleteStatsFieldDelete').value = "";
  }, 3000);
}

function checkDeleteStatsStatus() {
  var myIframe= document.getElementById("hiddenIFrame");
  var iframeDocument = (myIframe.contentWindow || myIframe.contentDocument);
  iframeDocument = iframeDocument.document;
  let x = iframeDocument.getElementsByTagName("pre");

  if(x[0].innerHTML === "Delete Success") {
    userStatsDeleted();
  } else if(x[0].innerHTML === "Delete Failed") {
    userStatsNotDeleted();
  } else {
    connFailed(document.getElementById("profileMessage"));
  }
}

function userStatsDeleted() {
  document.getElementById("profileMessage").innerHTML = "Your stats have been deleted";
  document.getElementById("profileMessage").style.display = "block";
  document.getElementById('progressBar').style.background = '#009944';
  window.scrollTo(0,document.body.scrollHeight);
}

function userStatsNotDeleted() {
  document.getElementById("profileMessage").innerHTML = "User information not correct";
  document.getElementById("profileMessage").style.display = "block";
  document.getElementById('progressBar').style.background = '#CF000F';
}
