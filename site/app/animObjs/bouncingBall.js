(function() {

var BouncingBall = {};

BouncingBall.render = function(drawingContext, time) {
  var offset = time * 10;
  
  drawingContext.beginPath();
  drawingContext.rect(0, offset, 200, 100);
  drawingContext.fillStyle = 'yellow';
  drawingContext.fill();
  drawingContext.lineWidth = 7;
  drawingContext.strokeStyle = 'black';
  drawingContext.stroke();  
};
  
ANIMATED_OBJECTS.BouncingBall = BouncingBall;
}());



