var loginSketch = function(p) {

    ambientTargets = [];

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
            t.color = "Random";
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

    p.mainScreenHtml = function() {
        gameCont = p.createElement("div","");
        gameCont.id("bodyContainer");

        createHeader(p, gameCont);

        mainTitle = p.createElement("img");
        mainTitle.attribute("src", "public/images/large_title.png");
        mainTitle.parent(gameCont);
        mainTitle.addClass("mainTitle");

        loginBox = p.createElement("div","");
        loginBox.parent(gameCont);
        loginBox.addClass("loginBox");
        loginBox.style("background","#FFFFFF");

        loginForm = p.createElement("form","");
        loginForm.attribute("id","loginForm");
        loginForm.attribute("target","_blank");
        loginForm.attribute("method","post");
        loginForm.attribute("action","http://167.99.105.82:8080");
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
        submitButton.parent(loginForm);
    }

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        for(let i = 0; i< ambientTargets.length; i++) {
            ambientTargets[i].updateTargetBounds(p.windowWidth, p.windowHeight);
            ambientTargets[i].height = p.windowWidth/50;
            ambientTargets[i].width = p.windowWidth/50;        }
    }
}
