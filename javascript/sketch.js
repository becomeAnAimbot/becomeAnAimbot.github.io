var targets = [];

function setup() {
    createCanvas(windowWidth, windowHeight/1.5);
    for(var i=0; i<10; i++) {
        targets[i] = new Target();
    }
}

function draw() {
    fill(255);
    if(mouseIsPressed) {
        clear();
        for(var i=0; i<targets.length; i++) {
            if(targets[i].targetHit()) {
                targets[i].shootTarget();
            }
            targets[i].show();
        }
    } else {
        for(var i=0; i<targets.length; i++) {
        targets[i].show();
        }
    }
}

function Score() {
    this.score = 0;
    
    this.increment = function(value) {
        this.score += value;
    }
}

function Target() {
    
    this.shot = true;
    this.x;
    this.y;
    this.width = windowWidth/50;
    this.height = windowWidth/50;
    
    this.show = function() {
        if(this.shot) {
            noStroke();
            fill(0,0,0);
            this.x = this.pickX();
            this.y = this.pickY();
            ellipse(this.x, this.y, this.width, this.height);
            this.shot = false;
        } else {
            noStroke();
            fill(0,0,0);
            ellipse(this.x, this.y, this.width, this.height);
            this.shot = false;
        }
    }
    
    this.targetHit = function() {
        if(mouseX < (this.x + (this.width/2)) && mouseX > (this.x - (this.width/2))) {
            if(mouseY < (this.y + (this.height/2)) && mouseY > (this.y - (this.height/2))) {
                return true;
            }
        }
        return false;
    }
    
    this.shootTarget = function() {
        this.shot = true;
    }
    
    this.pickX = function() {
        var x = Math.floor(Math.random() * windowWidth - 100);
        if(x < 50) {
            x = 50;
        }
        return x;
    }
    
    this.pickY = function() {
        var y = Math.floor(Math.random() * (windowHeight/1.5) - 100);
        if(y < 50) {
            y = 50;
        }
        return y;
    }
}