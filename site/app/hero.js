chihuahuaApp.service('hero', function() {

  var self = this;
  
  // Speeds measured in hertz.
  self.animspeed = {
    tailUp: 5,
    walkingLegs: 2,
  };

  // Define and load all images!
  
  var IMAGES = {
    TORSO: {src: 'img/sprites/hero/walking/torso.png'},
    HEAD: {src: 'img/sprites/hero/walking/head.png'},
    TAIL: {src: 'img/sprites/hero/walking/tail.png'},
    HINDLEG: {src: 'img/sprites/hero/walking/hind-leg.png'},
    HINDPAW: {src: 'img/sprites/hero/walking/hind-paw.png'},
    FRONTLEG: {src: 'img/sprites/hero/walking/front-leg.png'},
    FRONTPAW: {src: 'img/sprites/hero/walking/front-paw.png'},
    
  };
  
  _.each(IMAGES, function(imgObj, imgKey) {
    imgObj.key = imgKey;
    imgObj.image = new Image();
    imgObj.image.src = imgObj.src;
  });
  
  
  
  var renderWalking = function(drawingContext, time) {
    drawingContext.save();
    
    // Doggie sprites are too big.
    drawingContext.scale(1,1);//.25, .25);     
    drawingContext.drawImage(IMAGES.TORSO.image, 0, 0);

    // Render the head.
    drawingContext.save();
    drawingContext.translate(250, -165);
    drawingContext.drawImage(IMAGES.HEAD.image, 0, 0);
    drawingContext.restore();

    // Render the tail.
    var tailPhase = Math.sin(2 * Math.PI * self.animspeed.tailUp * time);
    var tailAngle = .2 * tailPhase;
    drawingContext.save();
    drawingContext.translate(15, 15);
    drawingContext.rotate(tailAngle);
    drawingContext.translate(-25, -120);
    drawingContext.drawImage(IMAGES.TAIL.image, 0, 0);
    drawingContext.restore();
    
    // Render the hind leg.
    var legPhase = Math.sin(2 * Math.PI * self.animspeed.walkingLegs * time);
    var legAngle = .3 * legPhase;
    drawingContext.save();
    drawingContext.translate(65, 145);
    drawingContext.rotate(legAngle);
    drawingContext.translate(-50, -10);
    drawingContext.drawImage(IMAGES.HINDLEG.image, 0, 0);
    drawingContext.restore();    
    
    
    
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

