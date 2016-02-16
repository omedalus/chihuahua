chihuahuaApp.service('hero', function() {

  var self = this;

  // Define and load all images!
  
  var IMAGES = {
    TORSO: {
      src: 'img/sprites/hero/walking/torso.png'
    }
  };
  
  _.each(IMAGES, function(imgObj, imgKey) {
    imgObj.key = imgKey;
    imgObj.image = new Image();
    imgObj.image.src = imgObj.src;
  });
  
  
  
  var renderWalking = function(drawingContext, time) {
    drawingContext.save();
    
    // Doggie sprites are double size.
    drawingContext.scale(.5, .5); 
    drawingContext.drawImage(IMAGES.TORSO.image, 0, 0);
    
    drawingContext.restore();
  };
  
  // Define all actions!
  
  self.ACTIONS = {
    //STANDING: 'STANDING',
    //SITTING: 'SITTING',
    WALKING: {
      renderFn: renderWalking
    }
    //BARKING: 'BARKING',
    //PUSHING: 'PUSHING',
    //PULLING: 'PULLING',
    //JUMPING: 'JUMPING'
  };

  self.action = self.ACTIONS.WALKING;

  
  self.render = function(drawingContext, time) {
    self.action.renderFn(drawingContext, time);
  };  
});

