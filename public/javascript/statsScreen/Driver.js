var statsSketch = function(p) {

    ambientTargets = [];

    p.setup = function() {
        canv = p.createCanvas(p.windowWidth, p.windowHeight);
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

        lineParent = p.createElement("div", "");
        lineParent.attribute("id","lineCont");
        lineParent.parent(gameCont);

        lineChart = p.createElement("canvas","");
        lineChart.attribute("id","myChart");
        lineChart.parent(lineParent);

        p.samplebar(lineChart);
    };

    p.samplebar = function() {
      cx = document.getElementById('myChart');
      var myChart = new Chart(cx, {
        type: 'line',
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [{
            label: 'Temp',
            data: [92, 94, 91, 96, 95, 89],
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

};
