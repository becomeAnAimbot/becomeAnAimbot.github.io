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
    profileMessage.attribute("class", "profileMessage");

    changePic = p.createElement("p", "Upload Profile Picture");
    changePic.parent(profileCont);
    changePic.attribute("class","accountButton");
    changePic.attribute("onclick","showChangePicture()");

    changePass = p.createElement("p", "Change Password");
    changePass.parent(profileCont);
    changePass.attribute("class","accountButton");
    changePass.attribute("onclick","showChangePassword()");

    deleteAccount = p.createElement("p","Delete Account");
    deleteAccount.parent(profileCont);
    deleteAccount.attribute("class","accountButton");
    deleteAccount.attribute("onclick","showDeleteAccount()");

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

}

function showChangePassword() {

}

function showChangePicture() {

}