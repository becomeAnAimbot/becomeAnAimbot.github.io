var prioritySketch = function(p) {

    var hitSound;
    var missSounds;

    p.priorityVariables = new PriorityVariables();

    p.preload = function() {
        hitSound = p.loadSound("sounds/hitmarker.mp3");
        missSound1 = p.loadSound("sounds/Wall-Hit6.wav");
        missSound2 = p.loadSound("sounds/Wall-Hit7.wav");
        missSound3 = p.loadSound("sounds/Wall-Hit8.wav");
        missSounds = [missSound1, missSound2, missSound3];
    }

    p.setup = function() {
        p.priorityVariables.canvHeight = p.windowHeight/1.5;
        p.priorityVariables.canvWidth = p.windowWidth;
        p.createPriorityHtml();
        canv = p.createCanvas(p.priorityVariables.canvWidth, p.priorityVariables.canvHeight);
        canv.parent("gameContainer");
        canv.id("targetGameCanvas");
        p.background('#f2f2f2');
        startButton = p.createButton("START GAME");
        startButton.addClass("priorityTargetButton");
        startButton.id("priorityStartButton");
        startButton.parent("#gameContainer");
        startButton.position(canv.position());
        startButton.mousePressed(p.startGame);
        p.reAssignAllSpeeds();
    };

    p.draw = function() {
        if(!p.priorityVariables.gameStarted) {
            return;
        } else if(p.priorityVariables.gameOver) {
            p.clear();
            p.background('#f2f2f2');
            p.showEndButtons();
            p.noLoop();
            return;
        } else {
            if(p.priorityVariables.alreadyShooting && !p.mouseIsPressed) {
                    p.priorityVariables.alreadyShooting = false;
            }
            if(p.mouseIsPressed && !p.priorityVariables.alreadyShooting) {
                p.priorityVariables.alreadyShooting = true;
                let shotsEle = p.select("#accuracyShots");
                let percentEle = p.select("#accuracyPercent");
                p.priorityVariables.totalShots++;
                let hit = false;
                for(let i=0; i<p.priorityVariables.targets.length; i++) {
                    if(p.priorityVariables.targets[i].targetHit() && p.priorityVariables.targets[i].isCurrentTarget) {
                        hit = true;
                        p.priorityVariables.shotsHit++;
                        hitSound.play();
                        p.clear();
                        p.background('#f2f2f2');
                        p.priorityVariables.targets[i].isCurrentTarget = false;
                        p.priorityVariables.targets[(i+1)%p.priorityVariables.targets.length].isCurrentTarget = true;
                        p.priorityVariables.targets[i].shootTarget();
                        p.reAssignAllSpeeds();
                        p.drawAllTargets();
                    }
                }
                if(!hit){
                    let r = Math.floor(Math.random() * 3)
                    missSounds[r].play();
                }
                let str = "Shots: " + p.priorityVariables.shotsHit + "/" + p.priorityVariables.totalShots;
                shotsEle.html(str);
                let per = ((p.priorityVariables.shotsHit/p.priorityVariables.totalShots)) * 100.0;
                str = "Accuracy: " + per.toFixed(2) + "%";
                percentEle.html(str);
            }
            p.background('#f2f2f2');
            p.moveTargets();
        }
    };

    p.drawAllTargets = function() {
        for(let i=0; i<p.priorityVariables.targets.length; i++) {
            p.priorityVariables.targets[i].randomPlacement();
            p.priorityVariables.targets[i].show();
        }
    };

    p.moveTargets = function() {
        for(let i=0; i<p.priorityVariables.targets.length; i++) {
            p.priorityVariables.targets[i].checkBoundaryHits();
            p.priorityVariables.targets[i].move();
            p.priorityVariables.targets[i].show();
        }
    };

    p.reAssignAllSpeeds = function() {
        for(let i=0; i<p.priorityVariables.targets.length; i++) {
            if(!p.priorityVariables.targets[i].isCurrentTarget) p.priorityVariables.targets[i].assignRandomSpeed(-10,10);
            else p.priorityVariables.targets[i].assignRandomSpeed(-5,5);
        }
    }

    p.createTargets = function() {
        for(let i=0; i<20; i++) {
            p.priorityVariables.targets[i] = new Target(p, p.windowWidth, p.windowHeight/1.5);
            p.priorityVariables.targets[i].assignRandomSpeed();
            p.priorityVariables.targets[0].isCurrentTarget = true;
            p.priorityVariables.targets[i].randomPlacement();
            p.priorityVariables.targets[i].show();
            p.priorityVariables.targets[i].isForGame = true;
        }
    };

    p.startGame = function() {
        startButton.hide();
        countDown = p.createElement("p", 3);
        countDown.addClass("countDown");
        countDown.parent("#gameContainer");
        countDown.position(p.select("#targetGameCanvas").position());

        let counter = 2;
        let cd = setInterval(function() {
            if(counter === 0) {
                clearInterval(cd);
                countDown.hide();
                p.startTimer();
                p.createTargets();
                p.priorityVariables.gameStarted = true;
            } else {
                countDown.html(counter);
                counter--;
            }
        }, 1000);
    };

    p.startTimer = function() {
        p.select("#gameTimer").style("visibility", "visible");
        p.select("#accuracyPercent").style("visibility", "visible");
        p.select("#accuracyShots").style("visibility", "visible");
        let counter = 59.9;
        let cd = setInterval(function() {
            if(counter <= 0) {
                clearInterval(cd);
                p.select("#gameTimer").html("Time's up!");
                p.priorityVariables.gameOver = true;
                p.priorityVariables.targets = [];
            } else {
                p.select("#gameTimer").html(counter.toFixed(1));
                counter = counter - 0.1;
            }
        }, 100);
    };

    p.showEndButtons = function() {
        p.select("#endButtons").style("display","flex");
    };

    p.restartGame = function() {
        p.priorityVariables = new PriorityVariables();
        p.priorityVariables.canvHeight = p.windowHeight/1.5;
        p.priorityVariables.canvWidth = p.windowWidth;
        p.select("#endButtons").hide();

        let shotsEle = p.select("#accuracyShots");
        let percentEle = p.select("#accuracyPercent");

        p.select("#gameTimer").html("Get Ready!");
        let str = "Shots: " + p.priorityVariables.shotsHit + "/" + p.priorityVariables.totalShots;
        shotsEle.html(str);
        let per = 100.0;
        str = "Accuracy: " + per.toFixed(2) + "%";
        percentEle.html(str);

        p.startGame();
        p.loop();
    };

    p.goHome = function() {
        startMainScreen();
    }

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight/1.5);
    };

    p.createPriorityHtml = function () {
        bodyCont = p.createElement("div", "");
        bodyCont.id("bodyContainer");

        createHeader(p, bodyCont);

        gameTitle = p.createElement("h1", "Target Priority Practice");
        gameTitle.addClass("gameHeader");
        gameTitle.parent(bodyCont);

        statsCont = p.createElement("div", "");
        statsCont.addClass("statsContainer");
        statsCont.parent(bodyCont);

        timeStat = p.createElement("h2", "60");
        timeStat.id("gameTimer");
        timeStat.parent(statsCont);

        shotStat = p.createElement("h2", "Shots: 0/0");
        shotStat.id("accuracyShots");
        shotStat.parent(statsCont);

        accStat = p.createElement("h2", "Accuracy: 0%");
        accStat.id("accuracyPercent");
        accStat.parent(statsCont);

        gameCont = p.createElement("div", "");
        gameCont.id("gameContainer");
        gameCont.parent(bodyCont);

        endButtons = p.createElement("div","");
        endButtons.id("endButtons");
        endButtons.parent(bodyCont);
        endButtons.hide();

        retryButton = p.createButton("PLAY AGAIN");
        retryButton.addClass("priorityTargetButton");
        retryButton.parent("#endButtons");
        retryButton.mousePressed(p.restartGame);

        mainMenuButton = p.createButton("MAIN MENU");
        mainMenuButton.addClass("priorityTargetButton");
        mainMenuButton.parent("#endButtons");
        mainMenuButton.mousePressed(p.goHome);

        instrucs = p.createElement("div", "");
        instrucs.addClass("instructions");
        instrucs.parent(bodyCont);

        descrip = p.createElement("h3", "Target Priority Practice is a simple game to help both your aim and your ability to pick the correct target from many distractions");
        descrip.parent(instrucs);

        showBut = p.createElement("h2", "Show Instructions");
        showBut.addClass("instructionsButton");
        showBut.parent(instrucs);
        showBut.attribute("onclick", "showInstructions()");

        insList = p.createElement("ol", "");
        insList.addClass("instructionsList");
        insList.parent(instrucs);

        liOne = p.createElement("li", "Click the start button to begin the game");
        liOne.parent(insList);

        liOne = p.createElement("li", "Hover your mouse over the orange target and click");
        liOne.parent(insList);

        liOne = p.createElement("li", "All targets will be shifting around continuously");
        liOne.parent(insList);

        liOne = p.createElement("li", "Your score will be based on your accuracy and the amount of hits in the given minute");
        liOne.parent(insList);

        showBut = p.createElement("h2", "Hide Instructions");
        showBut.addClass("hideInstructionsButton");
        showBut.parent(instrucs);
        showBut.attribute("onclick", "hideInstructions()");
    };
}
