var mainSketch = function(p) {

    ambientTargets = [];

    p.setup = function() {
        canv = p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(150);
        canv.style("z-index","-2");
        canv.addClass("mainScreenBackground");
        canv.position(0,0);

        p.mainScreenHtml();

        for(let i = 0; i < 25; i++) {
            t = new Target(p, p.windowWidth, p.windowHeight);
            t.randomPlacement();
            t.color = "Random";
            t.show();
            t.assignRandomSpeed(-10,10);
            ambientTargets.push(t);
        }
    };

    p.draw = function() {
        p.background("#FFFFFF");
        for(let i = 0; i < ambientTargets.length; i++) {
            ambientTargets[i].show();
            ambientTargets[i].checkBoundaryHits(ambientTargets[i]);
            ambientTargets[i].move();
        }
    };

    p.mainScreenHtml = function() {
        gameCont = p.createElement("div","");
        gameCont.id("bodyContainer");
        
        mainHeader = p.createElement("div");
        mainHeader.parent(gameCont);
        mainHeader.addClass("mainHeader");
        
        leftHeader = p.createElement("div");
        leftHeader.parent(mainHeader);
        leftHeader.id("leftHeader");
        
        homeButton = p.createElement("button","Home");
        homeButton.parent(leftHeader);
        homeButton.id("homeButton");
        homeButton.attribute("onclick","FUNCTION_NAME()");
        
        searchBar = p.createInput();
        searchBar.parent(leftHeader);
        searchBar.id("searchBar");
        
        magGlass = p.createElement("img");
        magGlass.attribute("src", "images/magnifyingGlass.png");
        magGlass.style("width","25px");
        magGlass.style("padding-left","0.5em")
        magGlass.parent(leftHeader);
        magGlass.id("magGlass");

        signInButton = p.createElement("button","Sign in");
        signInButton.parent(mainHeader);
        signInButton.id("signIn");
        signInButton.attribute("onclick","FUNCTION_NAME()");
        
        mainTitle = p.createElement("img");
        mainTitle.attribute("src", "images/large_title.png");
        mainTitle.parent(gameCont);
        mainTitle.addClass("mainTitle");

        gamesList = p.createElement("div","");
        gamesList.parent(gameCont);
        gamesList.addClass("mainGamesList");
        gamesList.style("background","#FFFFFF");

        gameOne = p.createElement("h2","Priority Target Practice");
        gameOne.parent(gamesList);
        gameOne.addClass("listGame");
        gameOne.attribute("onclick","startPriorityGame()");

        gameTwo = p.createElement("h2","Priority Target Practice");
        gameTwo.parent(gamesList);
        gameTwo.addClass("listGame");
        gameTwo.attribute("onclick","startPriorityGame()");

        gameThree = p.createElement("h2","Priority Target Practice");
        gameThree.parent(gamesList);
        gameThree.addClass("listGame");
        gameThree.attribute("onclick","startPriorityGame()");

        gameFour = p.createElement("h2","Priority Target Practice");
        gameFour.parent(gamesList);
        gameFour.addClass("listGame");
        gameFour.attribute("onclick","startPriorityGame()");
    }

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        for(let i = 0; i< ambientTargets.length; i++) {
            ambientTargets[i].updateTargetBounds(p.windowWidth, p.windowHeight);
            ambientTargets[i].height = p.windowWidth/50;
            ambientTargets[i].width = p.windowWidth/50;        }
    }
}
