function Target(p, widthBound, heightBound) {

    this.shot = true;
    this.x;
    this.y;
    this.color;
    this.width = p.windowWidth/50;
    this.height = p.windowWidth/50;
    this.isCurrentTarget = false;
    this.isForGame = false;

    this.xBound = Math.round(widthBound*0.975);
    this.yBound = heightBound;

    this.xSpeed;
    this.ySpeed;

    this.show = function() {
        if(this.color == undefined) p.fill('#32A8E9');
        else if(this.color != "Random") p.fill(this.color);
        else this.assignRandomColor();
        p.noStroke();
        if(this.isCurrentTarget) {
            p.fill('#FFA500');
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
        if(this.y <= document.getElementById('headerID').offsetHeight && !this.isForGame) this.y += document.getElementById('headerID').offsetHeight;
    }

    this.move = function(x, y) {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    this.assignRandomSpeed = function(min, max) {
        this.xSpeed = p.random(min, max);
        this.ySpeed = p.random(min, max);
    }

    this.checkBoundaryHits = function(target) {
        if(this.checkTopHit()) this.ySpeed *= -1;
        if(this.checkRightHit()) this.xSpeed *= -1;
        if(this.checkBottomHit()) this.ySpeed *= -1;
        if(this.checkLeftHit()) this.xSpeed *= -1;
    }

    this.checkTopHit = function() {
        if(this.y <= document.getElementById("headerID").offsetHeight && !this.isForGame) return true;
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

    this.assignRandomColor = function() {
        p.fill(Math.floor(p.random(0,250)), Math.floor(p.random(0,250)), Math.floor(p.random(0,250)));
    }
}
