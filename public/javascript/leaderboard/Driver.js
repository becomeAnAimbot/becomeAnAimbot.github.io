var leaderBoardSketch = function(p) {

    var ambientTargets = [];
    var randomColors = ["#BE0000", "#003AFF", "#007800", "#EA006E", "#A461D7", "#D14200", "#00B3F3"];

    p.setup = function() {
      p.leaderboardHtml();
      gameBoards = p.requestLeaderboards();
    };

    p.draw = function() {
      p.background("#FFFFFF");
      for(let i = 0; i < ambientTargets.length; i++) {
        ambientTargets[i].show();
        ambientTargets[i].checkBoundaryHits(ambientTargets[i]);
        ambientTargets[i].move();
      }
    };

    p.chooseRandomColor = function() {
      return randomColors[p.getRandomInt(randomColors.length)];
    }

    p.getRandomInt = function(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    p.leaderboardHtml = function() {
        gameCont = p.createElement("div","");
        gameCont.id("bodyContainer");

        createHeader(p, gameCont);

        leaderTitle = p.createElement("h1","Fastest Shooters in the West");
        leaderTitle.parent(gameCont);
        leaderTitle.attribute("id","leaderboardTitle");
    }

    p.createLeaderboards = function(gameBoards) {
      fadeBoardCont = p.createElement("div","");
      fadeBoardCont.attribute("class","leaderboardCont");
      fadeBoardCont.attribute("id","fadeTableCont");
      fadeBoardCont.parent(gameCont);

      fadeBoardTitle = p.createElement("h2","Speed Aim Game");
      fadeBoardTitle.parent(fadeBoardCont);
      fadeBoardTitle.attribute("class","leaderboardGameTitle");

      fadeTable = p.createElement("table","");
      fadeTable.attribute("class","leaderTable");
      fadeTable.parent(fadeBoardCont);

      fadeHeaders = p.createElement("tr","");
      fadeHeaders.parent(fadeTable);
      fadeHeaders.attribute("class","leaderboardHeaders");

      p.createElement("th","Rank").parent(fadeHeaders);
      p.createElement("th","User").parent(fadeHeaders);
      p.createElement("th","Effectiveness").parent(fadeHeaders);
      p.createElement("th","Accuracy").parent(fadeHeaders);
      p.createElement("th","Shots Taken").parent(fadeHeaders);

      p.fillFadeData(gameBoards);

      priorityBoardCont = p.createElement("div","");
      priorityBoardCont.attribute("class","leaderboardCont");
      priorityBoardCont.attribute("id","priorityTableCont");
      priorityBoardCont.parent(gameCont);

      priorityBoardTitle = p.createElement("h2","Priority Target Practice");
      priorityBoardTitle.parent(priorityBoardCont);
      priorityBoardTitle.attribute("class","leaderboardGameTitle");

      priorityTable = p.createElement("table","");
      priorityTable.attribute("class","leaderTable");
      priorityTable.parent(priorityBoardCont);

      priorityHeaders = p.createElement("tr","");
      priorityHeaders.parent(priorityTable);
      priorityHeaders.attribute("class","leaderboardHeaders");

      p.createElement("th","Rank").parent(priorityHeaders);
      p.createElement("th","User").parent(priorityHeaders);
      p.createElement("th","Effectiveness").parent(priorityHeaders);
      p.createElement("th","Accuracy").parent(priorityHeaders);
      p.createElement("th","Shots Taken").parent(priorityHeaders);

      p.fillPriorityData(gameBoards);
    }

    p.makeBallCanvas = function() {
      canv = p.createCanvas(document.body.clientWidth, document.getElementById('headerID').offsetHeight + document.getElementById('leaderboardTitle').offsetHeight + document.getElementById('fadeTableCont').offsetHeight*2 + 0.2*p.windowHeight);
      canv.style("z-index","-2");
      canv.addClass("mainScreenBackground");
      canv.position(0,0);

      for(let i = 0; i < 25; i++) {
        t = new Target(p, p.width, p.height);
        t.randomPlacement();
        t.color = p.chooseRandomColor();
        t.show();
        t.assignRandomSpeed(-10,10);
        ambientTargets.push(t);
      }

    }

    p.fillFadeData = function(gameBoards) {
      for(i=0; i<gameBoards.fade.length; i++) {
        row = p.createElement("tr","");
        row.parent(fadeTable);
        (i%2 == 0 ? row.attribute("class","evenTableRow") : row.attribute("class","oddTableRow"));
        rank = p.createElement("td", i+1);
        rank.parent(row);
        usernameB = p.createElement("td", gameBoards.fade[i].username);
        usernameB.parent(row);
        usernameB.attribute("class","leaderboardUsername");
        usernameB.attribute("onclick","fadeLeaderboardClick(event)");
        effect = p.createElement("td", gameBoards.fade[i].effect);
        effect.parent(row);
        acc = p.createElement("td", (gameBoards.fade[i].hits*100 / (gameBoards.fade[i].hits + gameBoards.fade[i].misses)).toFixed(1) + "%");
        acc.parent(row);
        taken = p.createElement("td", gameBoards.fade[i].hits + gameBoards.fade[i].misses);
        taken.parent(row);
      }

    }

    p.fillPriorityData = function(gameBoards) {
      for(i=0; i<gameBoards.priority.length; i++) {
        row = p.createElement("tr","");
        row.parent(priorityTable);
        (i%2 == 0 ? row.attribute("class","evenTableRow") : row.attribute("class","oddTableRow"));
        rank = p.createElement("td", i+1);
        rank.parent(row);
        usernameB = p.createElement("td", gameBoards.priority[i].username);
        usernameB.parent(row);
        usernameB.attribute("class","leaderboardUsername");
        usernameB.attribute("onclick","priorityLeaderboardClick(event)");
        effect = p.createElement("td", gameBoards.priority[i].effect);
        effect.parent(row);
        acc = p.createElement("td", (gameBoards.priority[i].hits*100 / (gameBoards.priority[i].hits + gameBoards.priority[i].misses)).toFixed(1) + "%");
        acc.parent(row);
        taken = p.createElement("td", gameBoards.priority[i].hits + gameBoards.priority[i].misses);
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
          p.makeBallCanvas();
        }
      };
      xhttp.send(`func=getLeadersboards`);
    }

    p.windowResized = function() {

    }

}

function fadeLeaderboardClick(event) {
  x = event.target;
  searchedUser = x.innerHtml;
  searched = true;
  startFadeAwayStats();
}

function priorityLeaderboardClick(event) {
  x = event.target;
  searchedUser = x.innerHtml;
  searched = true;
  startPriorityStats();
}
