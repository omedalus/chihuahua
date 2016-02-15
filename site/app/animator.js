// Renders the canvas and performs animations.

chihuahuaApp.service('animator', function() {

  var self = this;

  self.fps = 15;
  self.isRunning = false;

  var canvas2D;

  var framecount = 0;
  
  self.drawFrame = function() {
    console.log(framecount);
    framecount++;
  };
  
  
  
  var timer;
  
  self.runAnimation = function() {
    if (!!timer) {
      clearTimeout(timer);
    }
    
    timer = null;
    
    self.drawFrame();

    if (!self.isRunning) {
      return;
    }
    
    timer = setTimeout(function() { 
            self.runAnimation(); 
          }, 
          (1000 / self.fps)
        ); 
  };


  $(document).ready(function() {
    var canvasElem = document.getElementById('animator');
    canvas2D = canvasElem.getContext('2d');
    
    self.isRunning = true;
    self.runAnimation();
  });
  
  
});

