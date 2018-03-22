function fadeIn(ele) {
    var op = 0.01;
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        ele.style.opacity = op;
        op += op * 0.1;
    }, 10);   
}

function fadeOut(ele) {
    var op = 0.01;
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        ele.style.opacity = op;
        op -= op * 0.1;
    }, 10);
}

function squishUp(ele) {
    var op = 0.01;
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        ele.style.height = op;
        op -= op * 0.1;
    }, 10);
}

function squishDown(ele) {
    var op = 0.01;
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        ele.style.height = op;
        op += op * 0.1;
    }, 10);  
}