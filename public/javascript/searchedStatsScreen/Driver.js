var searchedStatsSketch = function(p) {

    ambientTargets = [];
    userStats = [];

    p.setup = function() {
        p.getUserStats(searchedUser);
        canv = p.createCanvas(p.windowWidth, p.windowHeight);
        canv.style("z-index","-2");
        canv.addClass("mainScreenBackground");
        canv.position(0,0);

        p.statsScreenHtml();
    };

    p.draw = function() {

    };

    p.statsScreenHtml = function(){

        gameCont = p.createElement("div","");
        gameCont.id("bodyContainer");

        createHeader(p, gameCont);

        mainTitle = p.createElement("img");
        mainTitle.attribute("src", "images/small_title.png");
        mainTitle.parent(gameCont);
        mainTitle.addClass("mainTitle");

    };

    p.displayStats = function() {
        lineParent = p.createElement("div", "");
        lineParent.attribute("id","lineCont");
        lineParent.parent(gameCont);

        lineChart = p.createElement("canvas","");
        lineChart.attribute("id","myChart");
        lineChart.parent(lineParent);

        p.createLine(lineChart);
    };

    p.createLine = function() {
      cx = document.getElementById('myChart');
      accData = p.getUserAccuracy();
      accTimes = p.getUserTimes();
      var myChart = new Chart(cx, {
        type: 'line',
        data: {
          labels: accTimes,
          datasets: [{
            label: 'Accuracy',
            data: accData,
            fill: false,
            lineTension: 0,
            backgroundColor: "#EFEFEF",
            borderColor: "#000000",
          }]
        }
      });
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        for(let i = 0; i< ambientTargets.length; i++) {
            ambientTargets[i].updateTargetBounds(p.windowWidth, p.windowHeight);
            ambientTargets[i].height = p.windowWidth/50;
            ambientTargets[i].width = p.windowWidth/50;        }
    };

    p.getUserStats = function(username) {
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", "/", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          if(this.responseText == "Not Enough Games") return;
          userStats = JSON.parse(this.responseText).stats;
          p.queryStats();
        }
      };
      xhttp.send(`func=getPriorityStats&user=${username}`);
    }

    p.getUserAccuracy = function() {
      acc = [];
      for(obs of userStats) {
        acc.push((obs.hits / (obs.hits + obs.misses)).toFixed(3));
      }
      return acc;
    }

    p.getUserTimes = function() {
      times = [];
      for(obs of userStats) {
        times.push(obs.timePlayed);
      }
      return times;
    }

    p.queryStats = function() {
      if(userStats.length >= 5) {
        p.displayStats();
      } else {
        statsBox = p.createElement("div","");
        statsBox.parent(gameCont);
        statsBox.addClass("statsBox");

        description = p.createElement("h3", "You need to play atleast five games");
        description.parent(statsBox);
      }
    }
};
