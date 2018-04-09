var leaderBoardSketch = function(p) {

    p.setup = function() {
      canv = p.createCanvas(Math.round(p.windowWidth*0.975), p.windowHeight);
      canv.style("z-index","-2");
      canv.addClass("mainScreenBackground");
      canv.position(0,0);
      p.leaderboardHtml();
      p.requestLeaderboards();
    };

    p.draw = function() {
      p.noLoop();
    };


    p.leaderboardHtml = function() {
        gameCont = p.createElement("div","");
        gameCont.id("bodyContainer");

        createHeader(p, gameCont);

        mainTitle = p.createElement("img");
        mainTitle.attribute("src", "images/small_title.png");
        mainTitle.parent(gameCont);
        mainTitle.addClass("mainTitle");

        leaderTitle = p.createElement("h1","Fastest Shooters in the West");
        leaderTitle.parent(gameCont);
        leaderTitle.attribute("id","leaderboardTitle");
    }

    p.requestLeaderboards = function() {
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", "/", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          leaderboardInfo = JSON.parse(this.responseText).boards;
        }
      };
      xhttp.send(`func=getLeadersboards`);
    }

    p.windowResized = function() {

    }
}
