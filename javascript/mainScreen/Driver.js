var mainSketch = function(p) {
    
    p.setup = function() {
        canv = p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(150);
        canv.style("z-index","-2");
        canv.addClass("mainScreenBackground");
        canv.position(0,0);
        
        p.mainScreenHtml();
    };
    
    p.draw = function() {
        p.background(150);
    };
    
    p.mainScreenHtml = function() {
        gameCont = p.createElement("div","");
        gameCont.id("bodyContainer");
        
        mainTitle = p.createElement("h1","Become An Aimbot");
        mainTitle.parent(gameCont);
        mainTitle.addClass("mainTitle");
        
        gamesList = p.createElement("div","");
        gamesList.parent(gameCont);
        gamesList.addClass("mainGamesList");
        
        gameOne = p.createElement("h2","Priority Target Practice");
        gameOne.parent(gamesList);
        gameOne.addClass("listGame");
        gameOne.attribute("onclick","startPriorityGame()");
    }
    
    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
}