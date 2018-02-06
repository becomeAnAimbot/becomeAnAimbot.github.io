var targets = [];
var gameStarted = false;

function setup() {
    var canv = createCanvas(windowWidth, windowHeight/1.5);
    canv.parent('gameContainer');
    background(150);
    startButton = createButton("START GAME");
    startButton.addClass("startButton");
    startButton.position(windowWidth/2 - startButton.width, windowHeight/2.5 - startButton.height);
    startButton.mousePressed(startGame);
}

function draw() {
    if(!gameStarted) {
        //Nothing for now      
    }
    if(mouseIsPressed) {
        for(var i=0; i<targets.length; i++) {
            if(targets[i].targetHit() && targets[i].isCurrentTarget) {
                clear();
                background(150);
                targets[i].isCurrentTarget = false;
                targets[(i+1)%targets.length].isCurrentTarget = true;
                targets[i].shootTarget();
                drawAllTargets();
            }
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
    countDown = createElement("h1", counter);
    countDown.position(windowWidth/2, windowHeight/2);
    var counter = 3;
    var cd = setInterval(function() {
        if(counter == 0) {
            clearInterval(cd);
            countDown.hide();
            createTargets();
            gameStarted = true;
        }
        countDown.html(counter);
        counter--;
    }, 1000);
}
