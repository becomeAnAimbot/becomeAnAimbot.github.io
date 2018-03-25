var statsSketch = function(p) {

    ambientTargets = [];

    p.setup = function() {
        canv = p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(150);
        canv.style("z-index","-2");
        canv.addClass("mainScreenBackground");
        canv.position(0,0);

        p.mainScreenHtml();

        // for(let i = 0; i < 25; i++) {
        //     t = new Target(p, p.windowWidth, p.windowHeight);
        //     t.randomPlacement();
        //     t.color = "Random";
        //     t.show();
        //     t.assignRandomSpeed(-10,10);
        //     ambientTargets.push(t);
        // }
    };

    p.draw = function() {
        p.background("#FFFFFF");
        for(let i = 0; i < ambientTargets.length; i++) {
            ambientTargets[i].show();
            ambientTargets[i].checkBoundaryHits(ambientTargets[i]);
            ambientTargets[i].move();
        }
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

        p.generateLineGraph();



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
