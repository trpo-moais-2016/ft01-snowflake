document.getElementById("n").value = 0;
document.getElementById("x").value = 0;
document.getElementById("y").value = 0;
document.getElementById("length").value = 400;
var canvas = document.getElementById("canvas");
var canvasHeight = parseInt(canvas.getAttribute("height"));
var canvasWidth = parseInt(canvas.getAttribute("width"));
var deg = Math.PI / 180;
var context = canvas.getContext('2d');

function drawLines(n, length) {
    context.save();
    if (n == 0) {
        context.lineTo(length, 0);
    }
    else {
        context.scale(1 / 3, 1 / 3);
        drawLines(n - 1, length);
        context.rotate(60 * deg);
        drawLines(n - 1, length);
        context.rotate(-120 * deg);
        drawLines(n - 1, length);
        context.rotate(60 * deg);          
        drawLines(n - 1, length);
    }
    context.restore();
    context.translate(length, 0);
}

function drawFlake(x, y, length, n) {
    x = x - length/2 + canvasWidth/2;
    y = y + Math.sqrt(3)*length/6 + canvasHeight/2;
    context.save();
    context.strokeStyle = "black";
    context.fillStyle = "white";
    context.beginPath();
    context.translate(x, y);
    context.moveTo(0, 0);
    drawLines(n, length);
    context.rotate(-120 * deg);
    drawLines(n, length);
    context.rotate(-120 * deg);
    drawLines(n, length);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
}

drawFlake(0, 0, 400, 0);

function start() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    drawFlake(parseInt(document.getElementById("x").value),
              parseInt(document.getElementById("y").value),
              parseInt(document.getElementById("length").value),
              parseInt(document.getElementById("n").value));
}