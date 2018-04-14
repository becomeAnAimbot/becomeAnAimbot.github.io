function content1() {
    resetFocusedTopic();
    content = document.getElementById("guideContent");
    document.getElementById("topic1").classList.add("topicFocused");
    content.innerHTML = "It is strongly recommended that you use a computer mouse instead of a trackpad " +
    "when playing FPS games.<br /><br />Furthermore, a gaming mouse is suggested for players " +
    "looking to improve their accuracy and mouse comfort levels.";
}

function content2() {
    resetFocusedTopic();
    content = document.getElementById("guideContent");
    document.getElementById("topic2").classList.add("topicFocused");
    content.innerHTML = "It is recommended that you play FPS games with the sound on.<br /><br />Having  " +
    "sound allows players to know when they have hit their targets, without having seen it. This " +
    "can increase reaction time, as visual confirmation can be deceiving and will often lead " +
    "to a delayed response.<br /><br />Furthermore, headphones are suggested for players looking " +
    "to take advantage of sound as a means of increasing response time.";
}

function content3() {
    resetFocusedTopic();
    content = document.getElementById("guideContent");
    document.getElementById("topic3").classList.add("topicFocused");
    content.innerHTML = "It is recommended that you have a low ping when playing FPS games.<br /><br />" +
    "Ping refers to gaming latency, and high latency can cause lag in your game.<br /><br />If you are " +
    "experiencing high latency, some suggestions would be to connect your device to your router through an " +
    "Ethernet cable, play on local servers, and/or close any programs you have running in the " +
    "background.";
}

function content4() {
    resetFocusedTopic();
    content = document.getElementById("guideContent");
    document.getElementById("topic4").classList.add("topicFocused");
    content.innerHTML = "When trying to hit a moving target, it is suggested that you aim slightly ahead " +
    "of them in the direction they are moving.<br /><br />The speed and acceleration of the target " +
    "should also be taken into account. The faster the target is moving, the further ahead " +
    "you should be aiming.";
}

function content5() {
    resetFocusedTopic();
    content = document.getElementById("guideContent");
    document.getElementById("topic5").classList.add("topicFocused");
    content.innerHTML = "When trying to hit an immobile target, it is suggested that you don't spend too " +
    "much time trying to aim.<br /><br />It can be tempting to perfectly aim at a target in order to " +
    "guarantee a hit. However, doing so can result in a loss of time, in which another player could hit " +
    "the target, or the target is no longer stationary.";
}

function resetFocusedTopic() {
    uiselectSound.play();
    document.getElementById("topic1").classList.remove("topicFocused");
    document.getElementById("topic2").classList.remove("topicFocused");
    document.getElementById("topic3").classList.remove("topicFocused");
    document.getElementById("topic4").classList.remove("topicFocused");
    document.getElementById("topic5").classList.remove("topicFocused");
}

var guideSketch = function(p) {
    var ambientTargets = [];
    var randomColors = ["#BE0000", "#003AFF", "#007800", "#EA006E", "#A461D7", "#D14200", "#00B3F3"];

    p.setup = function() {
        canv = p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(150);
        canv.style("z-index","-2");
        canv.addClass("mainScreenBackground");
        canv.position(0,0);

        p.guideScreenHtml();

        if(document.body.clientWidth < 980) {p.noLoop(); return;}
        for(let i = 0; i < 25; i++) {
            t = new Target(p, p.windowWidth, p.windowHeight);
            t.randomPlacement();
            t.color = p.chooseRandomColor();
            t.show();
            t.assignRandomSpeed(-10,10);
            ambientTargets.push(t);
        }
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

    p.guideScreenHtml = function() {
        gameCont = p.createElement("div","");
        gameCont.id("bodyContainer");

        createHeader(p, gameCont);

        guideTitle = p.createElement("h1", "Pro Tips");
        guideTitle.parent(gameCont);
        guideTitle.attribute("class","pageTitle");

        topicsPane = p.createElement("div");
        topicsPane.parent(gameCont);
        topicsPane.id("topicsPane");

        topic1 = p.createElement("p", "Input Device");
        topic1.parent(topicsPane);
        topic1.addClass("topic");
        topic1.id("topic1");
        topic1.attribute("onclick","content1()");
        topic1.attribute("tabindex","1");

        topic2 = p.createElement("p", "Sound");
        topic2.parent(topicsPane);
        topic2.addClass("topic");
        topic2.id("topic2");
        topic2.attribute("onclick","content2()");
        topic2.attribute("tabindex","1");

        topic3 = p.createElement("p", "Ping");
        topic3.parent(topicsPane);
        topic3.addClass("topic");
        topic3.id("topic3");
        topic3.attribute("onclick","content3()");
        topic3.attribute("tabindex","1");

        topic4 = p.createElement("p", "Aiming: Moving Target");
        topic4.parent(topicsPane);
        topic4.addClass("topic");
        topic4.id("topic4");
        topic4.attribute("onclick","content4()");
        topic4.attribute("tabindex","1");

        topic5 = p.createElement("p", "Aiming: Immobile Target");
        topic5.parent(topicsPane);
        topic5.addClass("topic");
        topic5.id("topic5");
        topic5.attribute("onclick","content5()");
        topic5.attribute("tabindex","1");

        contentPane = p.createElement("div");
        contentPane.parent(gameCont);
        contentPane.id("contentPane");

        content = p.createElement("p","Click a topic on the left to learn more about it!");
        content.parent(contentPane);
        content.id("guideContent");
    }

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        for(let i = 0; i< ambientTargets.length; i++) {
            ambientTargets[i].updateTargetBounds(p.windowWidth, p.windowHeight);
            ambientTargets[i].height = p.windowWidth/50;
            ambientTargets[i].width = p.windowWidth/50;
        }
    }
}
