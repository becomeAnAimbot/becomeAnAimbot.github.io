var leaderBoardSketch = function(p) {

    p.setup = function() {
        p.mainScreenHtml();
    };

    p.draw = function() {

    };


    p.mainScreenHtml = function() {
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
