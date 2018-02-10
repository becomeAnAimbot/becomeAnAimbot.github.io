function Target(p, widthBound, heightBound) {
    
    this.shot = true;
    this.x;
    this.y;
    this.width = p.windowWidth/50;
    this.height = p.windowWidth/50;
    this.isCurrentTarget = false;
    
    this.xBound = widthBound;
    this.yBound = heightBound;
    
    this.xSpeed;
    this.ySpeed;
    
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
        var x = Math.floor(Math.random() * this.xBound - 100);
        if(x < 50) {
            x = 50;
        }
        return x;
    }
    
    this.pickRandomY = function() {
        var y = Math.floor(Math.random() * this.yBound - 100);
        if(y < 50) {
            y = 50;
        }
        return y;
    }
    
    this.randomPlacement = function() {
        this.x = this.pickRandomX();
        this.y = this.pickRandomY();
    }
    
    this.move = function(x, y) {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
    
    this.assignRandomSpeed = function() {
        this.xSpeed = ((Math.random() > .5) ? 1 : -1) * 5;
        this.ySpeed = ((Math.random() > .5) ? 1 : -1) * 5;
    }
    
    this.checkTopHit = function() {
        if(this.y <= 0) return true;
        return false;
    }
    
    this.checkRightHit = function() {
        if(this.x >= this.xBound) return true;
        return false;
    }
    
    this.checkBottomHit = function() {
        if(this.y >= this.yBound) return true;
        return false;
    }
    
    this.checkLeftHit = function() {
        if(this.x <= 0) return true;
        return false;
    }
    
    this.updateTargetBounds = function(windowWidth, windowHeight) {
        this.xBound = windowWidth;
        this.yBound = windowHeight;
    }
}