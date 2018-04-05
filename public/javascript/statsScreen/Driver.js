var statsSketch = function(p) {

    ambientTargets = [];
    userStats = [];

    p.setup = function() {
        p.getUserStats(getUsername());
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

        if(userStats.length >= 5) {
            p.displayStats();
        } else {
            statsBox = p.createElement("div","");
            statsBox.parent(gameCont);
            statsBox.addClass("statsBox");

            description = p.createElement("h3", "You need to play atleast five games");
            description.parent(statsBox);
        }

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
      var myChart = new Chart(cx, {
        type: 'line',
        data: {
          labels: ["Time Played At"],
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
        }
      };
      xhttp.send(`func=getPriorityStats&user=${username}`);
    }

    p.getUserAccuracy = function() {
      acc = [];
      for(obs of userStats) {
        acc.push((obs.hits / obs.misses).toFixed(1));
      }
      return acc;
    }

};
