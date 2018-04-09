var leaderBoardSketch = function(p) {

    p.setup = function() {
      canv = p.createCanvas(Math.round(p.windowWidth*0.975), p.windowHeight);
      canv.style("z-index","-2");
      canv.addClass("mainScreenBackground");
      canv.position(0,0);
      p.leaderboardHtml();
      gameBoards = p.requestLeaderboards();
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

    p.createLeaderboards = function(gameBoards) {
      fadeBoardCont = p.createElement("div","");
      fadeBoardCont.attribute("class","leaderboardCont");
      fadeBoardCont.parent(gameCont);

      fadeTable = p.createElement("table","");
      fadeTable.attribute("id","fadeAwayTable");
      fadeTable.attribute("class","leaderTable");
      fadeTable.parent(fadeBoardCont);

      fadeHeaders = p.createElement("tr","");
      fadeHeaders.parent(fadeTable);

      p.createElement("th","Rank").parent(fadeHeaders);
      p.createElement("th","Name").parent(fadeHeaders);
      p.createElement("th","Effectiveness").parent(fadeHeaders);
      p.createElement("th","Accuracy").parent(fadeHeaders);
      p.createElement("th","Shots Taken").parent(fadeHeaders);

      p.fillFadeData(gameBoards);
    }

    p.fillFadeData = function(gameBoards) {
      for(i=0; i<gameBoards.boards.length; i++) {
        row = p.createElement("tr","");
        row.parent(fadeTable);
        rank = p.createElement("td", i+1);
        rank.parent(row);
        name = p.createElement("td", gameBoards.boards[i].username);
        name.parent(row);
        effect = p.createElement("td", gameBoards.boards[i].effect);
        effect.parent(row);
        acc = p.createElement("td", (gameBoards.boards[i].hits / (gameBoards.boards[i].hits + gameBoards.boards[i].misses)).toFixed(3));
        acc.parent(row);
        taken = p.createElement("td", gameBoards.boards[i].hits + gameBoards.boards[i].misses);
        taken.parent(row);
      }
    }

    p.requestLeaderboards = function() {
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", "/", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          p.createLeaderboards(JSON.parse(this.responseText));
        }
      };
      xhttp.send(`func=getLeadersboards`);
    }

    p.windowResized = function() {

    }
}
