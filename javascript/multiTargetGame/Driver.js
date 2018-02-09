var prioritySketch = function(p) {
    
    p.priorityVariables = new PriorityVariables();
    
    p.setup = function() {
        p.createPriorityHtml();
        canv = p.createCanvas(p.windowWidth, p.windowHeight/1.5);
        canv.parent("gameContainer");
        p.background(150);
        startButton = p.createButton("START GAME");
        startButton.addClass("startButton");
        startButton.position(p.windowWidth/2 -  startButton.width, p.windowHeight/2 - startButton.height);
        startButton.mousePressed(p.startGame);
    };

    p.draw = function() {
        if(!p.priorityVariables.gameStarted) {
            return;      
        } else if(p.priorityVariables.gameOver) {
            p.clear();
            p.background(150);
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
                for(let i=0; i<p.priorityVariables.targets.length; i++) {
                    if(p.priorityVariables.targets[i].targetHit() && p.priorityVariables.targets[i].isCurrentTarget) {
                        p.priorityVariables.shotsHit++;
                        p.clear();
                        p.background(150);
                        p.priorityVariables.targets[i].isCurrentTarget = false;
                        p.priorityVariables.targets[(i+1)%p.priorityVariables.targets.length].isCurrentTarget = true;
                        p.priorityVariables.targets[i].shootTarget();
                        p.drawAllTargets();
                    } 
                }
                let str = "Shots: " + p.priorityVariables.shotsHit + "/" + p.priorityVariables.totalShots;
                shotsEle.html(str);
                let per = ((p.priorityVariables.shotsHit/p.priorityVariables.totalShots)) * 100.0;
                str = "Accuracy: " + per.toFixed(2) + "%";
                percentEle.html(str);
            }   
        }
    };
    
    p.drawAllTargets = function() {
        for(let i=0; i<p.priorityVariables.targets.length; i++) {
            p.priorityVariables.targets[i].show();
        }
    };
    
    p.createTargets = function() {
        for(let i=0; i<20; i++) {
            p.priorityVariables.targets[i] = new Target(p);
            p.priorityVariables.targets[0].isCurrentTarget = true;
            p.priorityVariables.targets[i].show();
        }
    };
    
    p.startGame = function() {
        startButton.hide();
        countDown = p.createElement("p", 3);
        countDown.addClass("countDown");
        countDown.position((p.windowWidth/2.1), p.windowHeight/2.7);
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
    
    p.createPriorityHtml = function () {
        bodyCont = p.createElement("div", "");
        bodyCont.id("bodyContainer");

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

        liOne = p.createElement("li", "Hover your mouse over the green target and click");
        liOne.parent(insList);

        liOne = p.createElement("li", "All targets will be shifting around except for the green one");
        liOne.parent(insList);

        liOne = p.createElement("li", "Your score will be based on your accuracy and the amount of hits in the given minute");
        liOne.parent(insList);

        showBut = p.createElement("h2", "Hide Instructions");
        showBut.addClass("hideInstructionsButton");
        showBut.parent(instrucs);
        showBut.attribute("onclick", "hideInstructions()");
    };
}