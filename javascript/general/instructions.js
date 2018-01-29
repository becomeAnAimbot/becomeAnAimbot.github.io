function showInstructions() {
	var instructions = document.getElementsByClassName('instructionsList');
	var hideButton = document.getElementsByClassName('hideInstructionsButton');
    var showButton = document.getElementsByClassName('instructionsButton');
	var i;
    for(i=0; i<instructions.length; i++) {
        instructions[i].style.opacity = "0";
        instructions[i].style.display = "block";
        fadeIn(instructions[i]);
    }
    for(i=0; i<hideButton.length; i++) {
        hideButton[i].style.display = "block";
    }
    for(i=0; i<hideButton.length; i++) {
        showButton[i].style.display = "none";
    }
}

function hideInstructions() {
    var instructions = document.getElementsByClassName('instructionsList');
	var hideButton = document.getElementsByClassName('hideInstructionsButton');
    var showButton = document.getElementsByClassName('instructionsButton');
	var i;
    for(i=0; i<instructions.length; i++) {
        instructions[i].style.display = "none";
    }
    for(i=0; i<hideButton.length; i++) {
        hideButton[i].style.display = "none";
    }
    for(i=0; i<hideButton.length; i++) {
        showButton[i].style.display = "block";
    }
}