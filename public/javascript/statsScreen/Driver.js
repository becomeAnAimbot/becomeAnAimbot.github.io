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

    };

    p.displayStats = function() {
        lineParent = p.createElement("div", "");
        lineParent.attribute("id","lineCont");
        lineParent.parent(gameCont);

        lineChart = p.createElement("canvas","");
        lineChart.attribute("id","tpLineChart");
        lineChart.parent(lineParent);

        p.createLineChart();

        pieParent = p.createElement("div","");
        pieParent.attribute("id","pieCont");
        pieParent.parent(gameCont);

        pieChart = p.createElement("canvas","");
        pieChart.attribute("id","tpPieChart");
        pieChart.parent(pieParent);

        p.createPieChart();
    };

    p.createPieChart = function() {
      cx = document.getElementById('tpPieChart');
      pieData = p.getUserHitMiss();
      var myChart = new Chart(cx, {
        type: 'doughnut',
        data: {
          labels: ["Total Hits","Total Misses"],
          datasets: [{
            data: pieData,
            backgroundColor: ["#FFA500","#32A8E9"],
            borderColor: "#FFFFFF",
          }]
        }
      });
    };

    p.createLineChart = function() {
      cx = document.getElementById('tpLineChart');
      accData = p.getUserAccuracy();
      accTimes = p.getUserTimes();
      aveAccData = p.getUserAveAccuracy();
      totalShots = p.getUserShots();
      var myChart = new Chart(cx, {
        type: 'line',
        data: {
          labels: accTimes,
          datasets: [{
            label: 'Accuracy',
            data: accData,
            fill: false,
            lineTension: 0,
            backgroundColor: "#FFFFFF",
            borderColor: "#FFA500",
          },

          {
            label: 'Average Accuracy',
            data: aveAccData,
            fill: false,
            lineTension: 0,
            backgroundColor: "#FFFFFF",
            borderColor: "#32A8E9",
            pointRadius: 0,
            borderDash: [10,10],
          },
          {
            label: 'Accuracy',
            data: totalShots,
            fill: false,
            lineTension: 0,
            backgroundColor: "#FFFFFF",
            borderColor: "#000000",
          },]
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
          if(this.responseText == "Not Enough Games") {p.queryStats(); return;}
          userStats = JSON.parse(this.responseText).stats;
          p.queryStats();
        }
      };
      xhttp.send(`func=getPriorityStats&user=${username}`);
    };

    p.getUserAccuracy = function() {
      acc = [];
      for(obs of userStats) {
        acc.push((obs.hits*100 / (obs.hits + obs.misses)).toFixed(3));
      }
      return acc;
    };

    p.getUserTimes = function() {
      times = [];
      for(obs of userStats) {
        times.push(new Date(obs.timePlayed).getTime());
      }
      return times;
    };

    p.getUserAveAccuracy = function() {
      ave = [];
      count = 0;
      for(obs of userStats) {
        count += parseFloat((obs.hits*100 / (obs.hits + obs.misses)).toFixed(3));
      }
      calc = (count / userStats.length).toFixed(2);
      for(obs of userStats) {
        ave.push(calc);
      }
      return ave;
    }

    p.queryStats = function() {
      if(userStats.length >= 5) {
        p.displayStats();
      } else {
        statsBox = p.createElement("div","");
        statsBox.parent(gameCont);
        statsBox.addClass("statsBox");

        description = p.createElement("h3", "You need to play a minimum of five games to have statistics displayed");
        description.parent(statsBox);
      }
    };

    p.getUserHitMiss = function() {
      hm = [];
      hits = 0;
      misses = 0;
      for(obs of userStats) {
        hits += obs.hits;
        misses += obs.misses;
      }
      hm.push(hits);
      hm.push(misses);
      return hm;
    };

    p.getUserShots = function() {
      shots = [];
      for(obs of userStats) {
        shots.push(obs.hits + obs.misses);
      }
    };
};
