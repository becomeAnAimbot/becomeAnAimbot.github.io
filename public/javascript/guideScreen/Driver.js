function content1() {
    resetFocusedTopic();
    content = document.getElementById("guideContent");
    document.getElementById("topic1").classList.add("topicFocused");
    content.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
}

function content2() {
    resetFocusedTopic();
    content = document.getElementById("guideContent");
    document.getElementById("topic2").classList.add("topicFocused");
    content.innerHTML = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.";
}

function content3() {
    resetFocusedTopic();
    content = document.getElementById("guideContent");
    document.getElementById("topic3").classList.add("topicFocused");
    content.innerHTML = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?";
}

function content4() {
    resetFocusedTopic();
    content = document.getElementById("guideContent");
    document.getElementById("topic4").classList.add("topicFocused");
    content.innerHTML = "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.";
}

function content5() {
    resetFocusedTopic();
    content = document.getElementById("guideContent");
    document.getElementById("topic5").classList.add("topicFocused");
    content.innerHTML = "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?";
}

function content6() {
    resetFocusedTopic();
    content = document.getElementById("guideContent");
    document.getElementById("topic6").classList.add("topicFocused");
    content.innerHTML = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.";
}

function resetFocusedTopic() {
    document.getElementById("topic1").classList.remove("topicFocused");
    document.getElementById("topic2").classList.remove("topicFocused");
    document.getElementById("topic3").classList.remove("topicFocused");
    document.getElementById("topic4").classList.remove("topicFocused");
    document.getElementById("topic5").classList.remove("topicFocused");
    document.getElementById("topic6").classList.remove("topicFocused");
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

        mainTitle = p.createElement("img");
        mainTitle.attribute("src", "images/small_title.png");
        mainTitle.parent(gameCont);
        mainTitle.addClass("mainTitle");

        topicsPane = p.createElement("div");
        topicsPane.parent(gameCont);
        topicsPane.id("topicsPane");

        topic1 = p.createElement("p", "topic1");
        topic1.parent(topicsPane);
        topic1.addClass("topic");
        topic1.id("topic1");
        topic1.attribute("onclick","content1()");
        topic1.attribute("tabindex","1");
        
        topic2 = p.createElement("p", "topic2");
        topic2.parent(topicsPane);
        topic2.addClass("topic");
        topic2.id("topic2");
        topic2.attribute("onclick","content2()");
        topic2.attribute("tabindex","1");
        
        topic3 = p.createElement("p", "topic3");
        topic3.parent(topicsPane);
        topic3.addClass("topic");
        topic3.id("topic3");
        topic3.attribute("onclick","content3()");
        topic3.attribute("tabindex","1");
        
        topic4 = p.createElement("p", "topic4");
        topic4.parent(topicsPane);
        topic4.addClass("topic");
        topic4.id("topic4");
        topic4.attribute("onclick","content4()");
        topic4.attribute("tabindex","1");
        
        topic5 = p.createElement("p", "topic5");
        topic5.parent(topicsPane);
        topic5.addClass("topic");
        topic5.id("topic5");
        topic5.attribute("onclick","content5()");
        topic5.attribute("tabindex","1");
        
        topic6 = p.createElement("p", "topic6");
        topic6.parent(topicsPane);
        topic6.addClass("topic");
        topic6.id("topic6");
        topic6.attribute("onclick","content6()");
        topic6.attribute("tabindex","1");
        
        contentPane = p.createElement("div");
        contentPane.parent(gameCont);
        contentPane.id("contentPane");
        
        content = p.createElement("p","Click a topic on the left to learn about it!");
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