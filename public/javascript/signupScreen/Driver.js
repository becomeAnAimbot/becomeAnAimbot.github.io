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
        mainTitle.attribute("src", "images/large_title.png");
        mainTitle.parent(gameCont);
        mainTitle.addClass("mainTitle");

        signupBox = p.createElement("div","");
        signupBox.parent(gameCont);
        signupBox.addClass("signupBox");
        signupBox.style("background","#FFFFFF");

        signupForm = p.createElement("form","");
        signupForm.attribute("id","signupForm");
        signupForm.attribute("target","_blank");
        signupForm.attribute("method","post");
        signupForm.attribute("action","http://167.99.105.82:8080");
        signupForm.parent(signupBox);

        nameLabel = p.createElement("label","Username");
        nameLabel.parent(signupForm);
        nameLabel.attribute("for","usernameField");
        nameLabel.attribute("id","usernameLabel");

        usernameInput = p.createElement("input", "");
        usernameInput.attribute("type", "text");
        usernameInput.attribute("name", "user");
        usernameInput.attribute("id", "usernameField");
        usernameInput.attribute("class", "signupText");
        usernameInput.parent(signupForm);

        passLabel = p.createElement("label","Password");
        passLabel.parent(signupForm);
        passLabel.attribute("for","passwordField");
        passLabel.attribute("id","passwordLabel");

        passwordInput = p.createElement("input", "");
        passwordInput.attribute("type", "password");
        passwordInput.attribute("name", "pass");
        passwordInput.attribute("id", "passwordField");
        passwordInput.attribute("class", "signupText");
        passwordInput.parent(signupForm);

        passLabel2 = p.createElement("label","Confirm Password");
        passLabel2.parent(signupForm);
        passLabel2.attribute("for","passwordField");
        passLabel2.attribute("id","passwordLabel");

        passwordInput2 = p.createElement("input", "");
        passwordInput2.attribute("type", "password");
        passwordInput2.attribute("name", "pass");
        passwordInput2.attribute("id", "passwordField");
        passwordInput2.attribute("class", "signupText");
        passwordInput2.parent(signupForm);

        emailLabel = p.createElement("label","E-mail");
        emailLabel.parent(signupForm);
        emailLabel.attribute("for","passwordField");
        emailLabel.attribute("id","passwordLabel");

        emailInput = p.createElement("input", "");
        emailInput.attribute("type", "password");
        emailInput.attribute("name", "pass");
        emailInput.attribute("id", "passwordField");
        emailInput.attribute("class", "signupText");
        emailInput.parent(signupForm);

        hiddenInput = p.createElement("input", "");
        hiddenInput.parent(signupForm);
        hiddenInput.attribute("class", "signupText");
        hiddenInput.attribute("id", "hiddenInput");
        hiddenInput.attribute("type", "text");
        hiddenInput.attribute("name", "func");
        hiddenInput.attribute("value", "signupUser");

        submitButton = p.createElement("input", "Sign Up!");
        submitButton.attribute("value","Sign Up!");
        submitButton.attribute("type","submit");
        submitButton.attribute("id","submitButton");
        submitButton.attribute("class","signupButton");
        submitButton.parent(signupForm);
    }

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        for(let i = 0; i< ambientTargets.length; i++) {
            ambientTargets[i].updateTargetBounds(p.windowWidth, p.windowHeight);
            ambientTargets[i].height = p.windowWidth/50;
            ambientTargets[i].width = p.windowWidth/50;        }
    }
}
