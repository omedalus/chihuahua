// Renders the canvas and performs animations.

chihuahuaApp.service('animator', function() {

  var self = this;

  self.fps = 15;
  self.isRunning = false;
  self.time = 0;

  self.animObjects = [];
  

  var canvasElem;
  var canvas2D;

  var framecount = 0;
  
  self.drawFrame = function() {
    if (!canvasElem || !canvas2D) {
      return;
    }
    
    // Clear the canvas element, and set the default coordinate system.
    canvasElem.width = canvasElem.width;
    canvas2D.translate(canvasElem.width / 3, canvasElem.height / 3);
    
    // TODO: Sort anim objects from back to front, by .z property.
    _.each(self.animObjects, function(animObject) {
      animObject.render(canvas2D, self.time);
    });
    
    framecount++;
    self.time += 1.0 / self.fps;
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
    canvasElem = document.getElementById('animator');
    canvas2D = canvasElem.getContext('2d');
    
    self.isRunning = true;
    self.runAnimation();
  });
  
  
});

