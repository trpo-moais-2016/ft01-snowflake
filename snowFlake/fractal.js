function Point(x,y){
  this.x = x;
  this.y = y;
}
function getD(p1,p2){
  return Math.sqrt((p2.x-p1.x)*(p2.x-p1.x)+(p2.y-p1.y)*(p2.y-p1.y));
}
function findAngle(p1,p2){
  var angle;
  if ((p2.x >= p1.x) && (p2.y >= p1.y) || (p2.x >= p1.x) && (p2.y <= p1.y)){
    angle = Math.atan((p2.y-p1.y)/(p2.x-p1.x));
  }
  else if ((p2.x <= p1.x) && (p2.y >= p1.y)){
    angle = Math.PI/2 + Math.atan((p1.x-p2.x)/(p2.y-p1.y));
  }
  else if ((p2.x <= p1.x) && (p2.y <= p1.y)){
    angle = Math.PI + Math.atan((p1.y-p2.y)/(p1.x-p2.x));
  }
  return angle;
}
function findThirdPoint(p1,p2){
  var midSidePoint = new Point((p2.x+p1.x)/2, (p2.y+p1.y)/2);
  var inHight = getD(p1,p2);
  var angle = findAngle(p1,p2);
  return new Point(p1.x + (inHight)*Math.cos(angle + Math.PI/3), p1.y + (inHight)*Math.sin(angle + Math.PI/3));
}
function makeFrac(p1,p2, array){
  var lengthSize = getD(p1,p2);
  var newLengthSize = lengthSize/3;
  var angle = findAngle(p1,p2);
  var p3 = new Point(p1.x + (newLengthSize)*Math.cos(angle), p1.y + (newLengthSize)*Math.sin(angle));
  var p4 = new Point(p3.x + (newLengthSize)*Math.cos(angle - Math.PI/3), p3.y + (newLengthSize)*Math.sin(angle - Math.PI/3));
  var p5 = new Point(p1.x + (2*newLengthSize)*Math.cos(angle), p1.y + (2*newLengthSize)*Math.sin(angle) )
  array = [];
  array.push(p1);
  array.push(p3);
  array.push(p4);
  array.push(p5);
  array.push(p2);
  return array;
}
function plusArrays(arrayOne, arrayTwo){
  for(var i = 0; i < arrayOne.length-1; i++){
    if(arrayOne[i] != arrayOne[i-1]){
      arrayTwo.push(arrayOne[i]);
    }
  }
  return arrayTwo;
}
function iterations(mainPoints, points, allPoints){
  ctx.moveTo(mainPoints[0].x, mainPoints[0].y);
  for(var i = 0; i < mainPoints.length;i++){
    if(i == mainPoints.length - 1){
      points = makeFrac(mainPoints[i], mainPoints[0], points);
    }
    else{
      points = makeFrac(mainPoints[i], mainPoints[i+1], points);
    }
    allPoints = plusArrays(points, allPoints);
  }
}
function draw(points){
  for(var j = 0; j < points.length; j++){
    ctx.lineTo(points[j].x, points[j].y);
  }
}
function equalizer(arrayOne, arrayTwo){
  for(var i = 0; i < arrayTwo.length; i++){
    arrayOne[i] = arrayTwo[i];
  }
  return arrayOne;
}
function iterStep(iteration){
  iteration = prompt("Введите шаг итерации ", 0);
  if(iteration < 1 || iteration > 8 || isNaN(iteration) == true){
    alert("Please, input number from 1 to 8");
    iteration = iterStep(iteration);
  }
  return iteration;
}
