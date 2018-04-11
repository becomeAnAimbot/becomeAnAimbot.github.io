var priorStatsSketch = function(p) {

    ambientTargets = [];
    userStats = [];

    p.setup = function() {
        if(searching) {
            p.getUserStats(searchedUser);
        } else {
            p.getUserStats(getUsername());
        }

        canv = p.createCanvas(document.body.clientWidth, p.windowHeight);
        canv.style("z-index","-2");
        canv.addClass("mainScreenBackground");
        canv.position(0,0);

        p.statsScreenHtml();
    };

    p.draw = function() {
      p.noLoop();
    };

    p.statsScreenHtml = function(){

        gameCont = p.createElement("div","");
        gameCont.id("bodyContainer");

        createHeader(p, gameCont);

        user = "";
        if(searching) user = searchedUser + "\'s Priority Target Statistics";
        else user = "Your Priority Target Statistics";

        statsTitle = p.createElement("h1", user);
        statsTitle.parent(gameCont);
        statsTitle.attribute("class","pageTitle");

    };

    p.displayStats = function() {

        lineStatsCont = p.createElement("div","");
        lineStatsCont.attribute("class","statsCont");
        lineStatsCont.parent(gameCont);

        lineCont = p.createElement("div","");
        lineCont.attribute("id","lineCont");
        lineCont.parent(lineStatsCont);

        lineChart = p.createElement("canvas","");
        lineChart.attribute("id","tpLineChart");
        lineChart.parent(lineCont);

        p.createLineChart();

        pieStatsCont = p.createElement("div","");
        pieStatsCont.attribute("class","statsCont");
        pieStatsCont.parent(gameCont);

        pieCont = p.createElement("div","");
        pieCont.attribute("id","pieCont");
        pieCont.parent(pieStatsCont);

        pieChart = p.createElement("canvas","");
        pieChart.attribute("id","tpPieChart");
        pieChart.parent(pieCont);

        p.createPieChart();

       footer = p.createElement("p","&nbsp;");
       footer.parent(gameCont);
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
        },
        options: {
          legend: {position: "bottom"},
          title: {position: "top", text: "All Hits and Misses", display: "true", fontColor: "#000", fontFamily: "Play", fontSize: 20},
        }
      });
    };

    p.createLineChart = function() {
      cx = document.getElementById('tpLineChart');

      accData = p.getUserAccuracy();
      accTimes = p.getUserTimes();
      aveAccData = p.getUserAveAccuracy();
      totalShots = p.getUserShots();
      aveTotalShots = p.getAveTotalShots();
      effectData = p.getEffectData();
      aveEffectData = p.getAveEffectData();
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
            borderWidth: 1,
          },
          {
            label: 'Shots Taken',
            data: totalShots,
            fill: false,
            lineTension: 0,
            backgroundColor: "#FFFFFF",
            borderColor: "#000000",
            borderWidth: 1,
          },
          {
            label: 'Effectiveness',
            data: effectData,
            fill: false,
            lineTension: 0,
            backgroundColor: "#FFFFFF",
            borderColor: "#B20098",
            borderWidth: 1,
          },
          {
            label: 'Average Accuracy',
            data: aveAccData,
            fill: false,
            lineTension: 0,
            backgroundColor: "#FFFFFF",
            borderColor: "rgba(255, 165, 0, 0.25)",
            pointRadius: 0,
            borderDash: [10,10],
            hidden: true,
          },
          {
            label: 'Average Shots Taken',
            data: aveTotalShots,
            fill: false,
            lineTension: 0,
            backgroundColor: "#FFFFFF",
            borderColor: "rgba(0, 0, 0, 0.25)",
            pointRadius: 0,
            borderDash: [10,10],
            hidden: true,
          },
          {
            label: 'Average Effectiveness',
            data: aveEffectData,
            fill: false,
            lineTension: 0,
            backgroundColor: "#FFFFFF",
            borderColor: "rgba(178, 0, 152, 0.25)",
            pointRadius: 0,
            borderDash: [10,10],
            hidden: true,
          },]
        },
        options: {
          legend: {position: "bottom"},
          title: {position: "top", text: "Overall Effectiveness", display: "true", fontColor: "#000", fontFamily: "Play", fontSize: 20},
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
        times.push(p.getDateFormated(new Date(obs.timePlayed).getTime()));
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

        description = p.createElement("h3", "Not enough game data.<br> Must have at least 5 plays to display stats and trends.");
        description.parent(statsBox);
        description.attribute("class","genericErrorMessage");
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
      return shots;
    };

    p.getEffectData = function() {
      data = [];
      for(obs of userStats) {
        data.push((obs.hits*obs.hits / (obs.hits+obs.misses)).toFixed(3));
      }
      return data;
    };

    p.getAveTotalShots = function() {
      ave = [];
      count = 0;
      for(obs of userStats) {
        count += (obs.hits + obs.misses);
      }
      calc = (count / userStats.length).toFixed(2);
      for(obs of userStats) {
        ave.push(calc);
      }
      return ave;

    }

    p.getAveEffectData = function() {
      ave = [];
      count = 0;
      for(obs of userStats) {
        count += obs.hits*obs.hits / (obs.hits+obs.misses).toFixed(3);
      }
      calc = (count / userStats.length).toFixed(2);
      for(obs of userStats) {
        ave.push(calc);
      }
      return ave;
    }

    p.getDateFormated = function(millis) {
      current = new Date();
      since = (current - millis);
      if(since < 60000) return (Math.round(since/1000) + " Seconds ago");
      if(since < 3600000) return (Math.round(since/60000) + " Minutes ago");
      if(since < 86400000) return (Math.round(since/3600000) + " Hours ago");
      if(since < 604800000) return(Math.round(since/86400000) + " Days ago");
      if(since < 2629800000) return(Math.round(since/604800000) + " Weeks ago");
      if(since < 31557600000) return(Math.round(since/2629800000) + " Months ago");
      else return ("Over a year ago");
    }
};
