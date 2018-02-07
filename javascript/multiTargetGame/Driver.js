var priorityVariables = new PriorityVariables();

function setup() {
    let canv = createCanvas(windowWidth, windowHeight/1.5);
    canv.parent('gameContainer');
    background(150);
    startButton = createButton("START GAME");
    startButton.addClass("startButton");
    startButton.position(windowWidth/2 -  startButton.width, windowHeight/2 - startButton.height);
    startButton.mousePressed(startGame);
}

function draw() {
    if(!priorityVariables.gameStarted) {
        return;      
    } else if(priorityVariables.gameOver) {
        clear();
        background(150);
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
            let per = ((priorityVariables.shotsHit/priorityVariables.totalShots).toFixed(2)) * 100.0;
            str = "Accuracy: " + per + "%";
            percentEle.html(str);
        }   
    }
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