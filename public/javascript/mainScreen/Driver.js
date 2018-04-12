var mainSketch = function(p) {

    var ambientTargets = [];
    var randomColors = ["#BE0000", "#003AFF", "#007800", "#EA006E", "#A461D7", "#D14200", "#00B3F3"];

    p.setup = function() {

        canv = p.createCanvas(document.body.clientWidth, p.windowHeight);
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

        gamesList = p.createElement("div","");
        gamesList.parent(gameCont);
        gamesList.addClass("mainGamesList");
        gamesList.style("background","#FFFFFF");

        gameOne = p.createElement("h2","Priority Target Practice");
        gameOne.parent(gamesList);
        gameOne.addClass("listGame");
        gameOne.attribute("onclick","startPriorityGame()");

        gameTwo = p.createElement("h2","Speed Aim Game");
        gameTwo.parent(gamesList);
        gameTwo.addClass("listGame");
        gameTwo.attribute("onclick","startFadeAwayScreen()");

        gameThree = p.createElement("h2","Tracking Practice");
        gameThree.parent(gamesList);
        gameThree.addClass("listGame");
        gameThree.attribute("onclick","startPriorityGame()");

        gameFour = p.createElement("h2","Strafing Practice");
        gameFour.parent(gamesList);
        gameFour.addClass("listGame");
        gameFour.attribute("onclick","startFadeAwayScreen()");

        gameFive = p.createElement("h2","Target Crouch Practice");
        gameFive.parent(gamesList);
        gameFive.addClass("listGame");
        gameFive.attribute("onclick","startPriorityGame()");

        gameSix = p.createElement("h2","Sniper Practice");
        gameSix.parent(gamesList);
        gameSix.addClass("listGame");
        gameSix.attribute("onclick","startFadeAwayScreen()");

	mobileMessage = p.createElement("h2","Sorry, but playing games is not supported on mobile devices!<br>You can change profile settings and check out stats if you would like.");
        mobileMessage.attribute("class","mobileErrorMessage");
        mobileMessage.attribute('id','mainMobileMessage')
        mobileMessage.parent(gameCont);
        if(document.body.clientWidth >= 980) {document.getElementById('mainMobileMessage').style.display =  'none';}
    }

    p.windowResized = function() {
        if(document.body.clientWidth < 980) return;
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        for(let i = 0; i< ambientTargets.length; i++) {
            ambientTargets[i].updateTargetBounds(p.windowWidth, p.windowHeight);
            ambientTargets[i].height = p.windowWidth/50;
            ambientTargets[i].width = p.windowWidth/50;        }
    }
}
