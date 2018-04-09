var leaderBoardSketch = function(p) {

    p.setup = function() {
      canv = p.createCanvas(Math.round(p.windowWidth*0.975), p.windowHeight);
      canv.style("z-index","-2");
      canv.addClass("mainScreenBackground");
      canv.position(0,0);
      p.leaderboardHtml();
    };

    p.draw = function() {
      noLoop();
    };


    p.leaderboardHtml = function() {
        gameCont = p.createElement("div","");
        gameCont.id("bodyContainer");

        createHeader(p, gameCont);

        mainTitle = p.createElement("img");
        mainTitle.attribute("src", "images/small_title.png");
        mainTitle.parent(gameCont);
        mainTitle.addClass("mainTitle");
    }

    p.windowResized = function() {

    }
}
