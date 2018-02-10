function Target(p) {
    
    this.shot = true;
    this.x;
    this.y;
    this.width = p.windowWidth/50;
    this.height = p.windowWidth/50;
    this.isCurrentTarget = false;
    
    this.show = function() {
        p.fill(0);
        p.noStroke();
        if(this.isCurrentTarget) {
            p.fill(0, 255, 0);
        }
        p.ellipse(this.x, this.y, this.width, this.height);
        this.shot = false;
    }
    
    this.targetHit = function() {
        if(p.mouseX < (this.x + (this.width/2)) && p.mouseX > (this.x - (this.width/2))) {
            if(p.mouseY < (this.y + (this.height/2)) && p.mouseY > (this.y - (this.height/2))) {
                return true;
            }
        }
        return false;
    }
    
    this.shootTarget = function() {
        this.shot = true;
    }
    
    this.pickRandomX = function() {
        var x = Math.floor(Math.random() * p.windowWidth - 100);
        if(x < 50) {
            x = 50;
        }
        return x;
    }
    
    this.pickRandomY = function() {
        var y = Math.floor(Math.random() * (p.windowHeight/1.5) - 100);
        if(y < 50) {
            y = 50;
        }
        return y;
    }
    
    this.randomPlacement = function() {
        this.x = this.pickRandomX();
        this.y = this.pickRandomY();
    }
}