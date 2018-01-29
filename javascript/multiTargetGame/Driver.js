var targets = [];

function setup() {
    var canv = createCanvas(windowWidth, windowHeight/1.5);
    canv.parent('gameContainer');
    background(150);
    for(var i=0; i<20; i++) {
        targets[i] = new Target();
        targets[0].isCurrentTarget = true;
        targets[i].show();
    }
}

function draw() {
    if(mouseIsPressed) {
        for(var i=0; i<targets.length; i++) {
            if(targets[i].targetHit() && targets[i].isCurrentTarget) {
                clear();
                background(150);
                targets[i].isCurrentTarget = false;
                targets[(i+1)%10].isCurrentTarget = true;
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

