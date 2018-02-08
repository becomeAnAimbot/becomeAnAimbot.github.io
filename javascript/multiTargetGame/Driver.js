var priorityVariables = new PriorityVariables();

function setupPriority() {
    createPriorityHtml();
    let canv = createCanvas(windowWidth, windowHeight/1.5);
    canv.parent('gameContainer');
    background(150);
    startButton = createButton("START GAME");
    startButton.addClass("startButton");
    startButton.position(windowWidth/2 -  startButton.width, windowHeight/2 - startButton.height);
    startButton.mousePressed(startGame);
}

function drawPriority() {
    if(!priorityVariables.gameStarted) {
        return;      
    } else if(priorityVariables.gameOver) {
        clear();
        background(150);
        return;
    } else {
        if(priorityVariables.alreadyShooting && !mouseIsPressed) {
                priorityVariables.alreadyShooting = false;
        }
        if(mouseIsPressed && !priorityVariables.alreadyShooting) {
            priorityVariables.alreadyShooting = true;
            let shotsEle = select("#accuracyShots");
            let percentEle = select("#accuracyPercent");
            priorityVariables.totalShots++;
            for(let i=0; i<priorityVariables.targets.length; i++) {
                if(priorityVariables.targets[i].targetHit() && priorityVariables.targets[i].isCurrentTarget) {
                    priorityVariables.shotsHit++;
                    clear();
                    background(150);
                    priorityVariables.targets[i].isCurrentTarget = false;
                    priorityVariables.targets[(i+1)%priorityVariables.targets.length].isCurrentTarget = true;
                    priorityVariables.targets[i].shootTarget();
                    drawAllTargets();
                } 
            }
            let str = "Shots: " + priorityVariables.shotsHit + "/" + priorityVariables.totalShots;
            shotsEle.html(str);
            let per = ((priorityVariables.shotsHit/priorityVariables.totalShots)) * 100.0;
            str = "Accuracy: " + per.toFixed(2) + "%";
            percentEle.html(str);
        }   
    }
}

function createPriorityHtml() {
    bodyCont = createElement("div", "");
    bodyCont.id("bodyContainer");
    
    gameTitle = createElement("h1", "Target Priority Practice");
    gameTitle.addClass("gameHeader");
    gameTitle.parent(bodyCont);
    
    statsCont = createElement("div", "");
    statsCont.addClass("statsContainer");
    statsCont.parent(bodyCont);
    
    timeStat = createElement("h2", "60");
    timeStat.id("gameTimer");
    timeStat.parent(statsCont);
    
    shotStat = createElement("h2", "Shots: 0/0");
    shotStat.id("accuracyShots");
    shotStat.parent(statsCont);
    
    accStat = createElement("h2", "Accuracy: 0%");
    accStat.id("accuracyPercent");
    accStat.parent(statsCont);
    
    gameCont = createElement("div", "");
    gameCont.id("gameContainer");
    gameCont.parent(bodyCont);
    
    instrucs = createElement("div", "");
    instrucs.addClass("instructions");
    instrucs.parent(bodyCont);
    
    descrip = createElement("h3", "Target Priority Practice is a simple game to help both your aim and your ability to pick the correct target from many distractions");
    descrip.parent(instrucs);
    
    showBut = createElement("h2", "Show Instructions");
    showBut.addClass("instructionsButton");
    showBut.parent(instrucs);
    showBut.attribute("onclick", "showInstructions()");
    
    insList = createElement("ol", "");
    insList.addClass("instructionsList");
    insList.parent(instrucs);
    
    liOne = createElement("li", "Click the start button to begin the game");
    liOne.parent(insList);
    
    liOne = createElement("li", "Hover your mouse over the green target and click");
    liOne.parent(insList);
    
    liOne = createElement("li", "All targets will be shifting around except for the green one");
    liOne.parent(insList);
    
    liOne = createElement("li", "Your score will be based on your accuracy and the amount of hits in the given minute");
    liOne.parent(insList);
    
    showBut = createElement("h2", "Hide Instructions");
    showBut.addClass("hideInstructionsButton");
    showBut.parent(instrucs);
    showBut.attribute("onclick", "hideInstructions()");
}

function drawAllTargets() {
    for(let i=0; i<priorityVariables.targets.length; i++) {
        priorityVariables.targets[i].show();
    }
}

function createTargets() {
    for(let i=0; i<20; i++) {
        priorityVariables.targets[i] = new Target();
        priorityVariables.targets[0].isCurrentTarget = true;
        priorityVariables.targets[i].show();
    }
}

function startGame() {
    startButton.hide();
    countDown = createElement("p", 3);
    countDown.addClass("countDown");
    countDown.position((windowWidth/2.1), windowHeight/2.7);
    let counter = 2;
    let cd = setInterval(function() {
        if(counter === 0) {
            clearInterval(cd);
            countDown.hide();
            startTimer();
            createTargets();
            priorityVariables.gameStarted = true;
        } else {
            countDown.html(counter);
            counter--;
        }
    }, 1000);
}

function startTimer() {
    select("#gameTimer").style("visibility", "visible");
    select("#accuracyPercent").style("visibility", "visible");
    select("#accuracyShots").style("visibility", "visible");
    let counter = 59.9;
    let cd = setInterval(function() {
        if(counter <= 0) {
            clearInterval(cd);
            select("#gameTimer").html("Time's up!");
            priorityVariables.gameOver = true;
            priorityVariables.targets = [];
        } else {
            select("#gameTimer").html(counter.toFixed(1));
            counter = counter - 0.1;   
        }
    }, 100);
}