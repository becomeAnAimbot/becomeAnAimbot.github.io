function Target() {
    
    this.shot = true;
    this.x;
    this.y;
    this.width = windowWidth/50;
    this.height = windowWidth/50;
    this.isCurrentTarget = false;
    
    this.show = function() {
        fill(0);
        noStroke();
        this.x = this.pickX();
        this.y = this.pickY();
        if(this.isCurrentTarget) {
            fill(0, 255, 0);
        }
        ellipse(this.x, this.y, this.width, this.height);
        this.shot = false;
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