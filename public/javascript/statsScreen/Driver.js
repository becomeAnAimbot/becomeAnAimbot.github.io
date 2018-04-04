var statsSketch = function(p) {

    ambientTargets = [];

    p.setup = function() {
        canv = p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(150);
        canv.style("z-index","-2");
        canv.addClass("mainScreenBackground");
        canv.position(0,0);

        p.mainScreenHtml();
    };

    p.draw = function() {

    };

    p.mainScreenHtml = function(){

        gameCont = p.createElement("div","");
        gameCont.id("bodyContainer");

        createHeader(p, gameCont);

        mainTitle = p.createElement("img");
        mainTitle.attribute("src", "images/small_title.png");
        mainTitle.parent(gameCont);
        mainTitle.addClass("mainTitle");

        statsBox = p.createElement("div","");
        statsBox.parent(gameCont);
        statsBox.addClass("statsBox");
        statsBox.style("background","FFFFFF");

        chart = p.createElement("div","");
        chart.id("chart");
        chart.addClass("with-3d-shadow with-transitions");
        chart.addClass("chartHeight")
        chart.parent(statsBox);

        lineChart = p.createElement("canvas","");
        lineChart.attribute("id","myChart");
        lineChart.attribute("style","height: 400px; width: 400px;");
        lineChart.parent(gameCont);

        p.samplebar(lineChart);

        p.generateLineGraph();
    };

    p.samplebar = function() {
      cx = document.getElementById('myChart');
      var myChart = new Chart(cx, {
        type: 'bar',
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
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

    //TODO Replace with SQL Queries for User Statistics
    p.generateRandomData = function() {
        var accuracy1 = [];
        var accuracy2 = [];

        for (var i = 0; i < 100; i++){
            random = Math.floor((Math.random() * 100) + 1);
            accuracy1.push({x: i, y: random/100})
        }

        for (var i = 0; i < 100; i++){
            random = Math.floor((Math.random() * 100) + 1);
            accuracy2.push({x: i, y: random/100})
        }

        return [
            {
                key: "Priority Target Practice",
                area: false,
                values: accuracy1
            },
            {
                key: "Game 2",
                area: false,
                values: accuracy2
            }
        ];

        //return lineData;
    };

    p.generateLineGraph = function() {
        nv.addGraph(function() {

            var chart = nv.models.lineWithFocusChart();
            chart.brushExtent([50,70]);

            chart.xAxis.tickFormat(d3.format(',f')).axisLabel("# of Games Played");
            chart.x2Axis.tickFormat(d3.format(',f'));

            chart.yAxis.axisLabel("Accuracy");
            chart.yTickFormat(d3.format(',.2f'));

            chart.useInteractiveGuideline(true);
            chart.yDomain([0,1]);

            d3.select('#chart')
                .append('svg')
                .datum(p.generateRandomData())
                .call(chart);

            nv.utils.windowResize(chart.update);
            return chart;
        });
    };

};
