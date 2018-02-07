var targets = [];
var gameStarted = false;
var gameOver = false;
var totalShots = 0.0;
var shotsHit = 0.0;
var alreadyShooting = false;

function setup() {
    var canv = createCanvas(windowWidth, windowHeight/1.5);
    canv.parent('gameContainer');
    background(150);
    startButton = createButton("START GAME");
    startButton.addClass("startButton");
    startButton.position(windowWidth/2 -  startButton.width, windowHeight/2 - startButton.height);
    startButton.mousePressed(startGame);
}

function draw() {
    if(!gameStarted) {
        return;      
    } else if(gameOver) {
        clear();
        background(150);
    } else {
        if(alreadyShooting && !mouseIsPressed) {
                alreadyShooting = false;
        }
        if(mouseIsPressed && !alreadyShooting) {
            alreadyShooting = true;
            var shotsEle = select("#accuracyShots");
            var percentEle = select("#accuracyPercent");
            totalShots++;
            for(var i=0; i<targets.length; i++) {
                if(targets[i].targetHit() && targets[i].isCurrentTarget) {
                    shotsHit++;
                    clear();
                    background(150);
                    targets[i].isCurrentTarget = false;
                    targets[(i+1)%targets.length].isCurrentTarget = true;
                    targets[i].shootTarget();
                    drawAllTargets();
                } 
            }
            let str = "Shots: " + shotsHit + "/" + totalShots;
            shotsEle.html(str);
            let per = ((shotsHit/totalShots).toFixed(2)) * 100.0;
            str = "Accuracy: " + per + "%";
            percentEle.html(str);
        }   
    }
}

function drawAllTargets() {
    for(var i=0; i<targets.length; i++) {
        targets[i].show();
    }
}

function createTargets() {
    for(var i=0; i<20; i++) {
        targets[i] = new Target();
        targets[0].isCurrentTarget = true;
        targets[i].show();
    }
}

function startGame() {
    startButton.hide();
    countDown = createElement("p", 3);
    countDown.addClass("countDown");
    countDown.position((windowWidth/2.1), windowHeight/2.7);
    var counter = 2;
    var cd = setInterval(function() {
        if(counter === 0) {
            clearInterval(cd);
            countDown.hide();
            startTimer();
            createTargets();
            gameStarted = true;
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
    var counter = 59.9;
    var cd = setInterval(function() {
        if(counter <= 0) {
            clearInterval(cd);
            select("#gameTimer").html("Time's up!");
            gameOver = true;
            targets = [];
        } else {
            select("#gameTimer").html(counter.toFixed(1));
            counter = counter - 0.1;   
        }
    }, 100);
}