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
    drawingContext.scale(.75,.75);//.25, .25);         
    
        // Render the far hind leg.
    var legPhase = Math.sin(2 * Math.PI * self.animspeed.walkingLegs * time + Math.PI);
    var legAngle = .3 * legPhase;
    drawingContext.save();
    drawingContext.translate(95, 130);
    drawingContext.rotate(legAngle);
    drawingContext.translate(-50, -10);
    drawingContext.drawImage(IMAGES.HINDLEG.image, 0, 0);
    
    var pawPhase = Math.sin(2 * Math.PI * self.animspeed.walkingLegs * time + 1.5 * Math.PI);
    var pawAngle = .3 * pawPhase;
    drawingContext.translate(20, 115);    
    drawingContext.rotate(pawAngle * 2);
    drawingContext.translate(-15, -10);    
    drawingContext.drawImage(IMAGES.HINDPAW.image, 0, 0);
    
    drawingContext.restore();    
    
    // Render the far front leg.
    legPhase = Math.sin(2 * Math.PI * self.animspeed.walkingLegs * time);
    legAngle = -.3 + .6 * legPhase;
    drawingContext.save();
    drawingContext.translate(270, 140);
    drawingContext.rotate(legAngle);
    drawingContext.translate(-30, -20);
    drawingContext.drawImage(IMAGES.FRONTLEG.image, 0, 0);
    
    pawPhase = Math.sin(2 * Math.PI * self.animspeed.walkingLegs * time + .5 * Math.PI);
    pawAngle = .3 * pawPhase;
    drawingContext.translate(20, 105);
    drawingContext.rotate(pawAngle * 2);
    drawingContext.translate(-15, -10);    
    drawingContext.drawImage(IMAGES.FRONTPAW.image, 0, 0);

    drawingContext.restore();    

    
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
    legPhase = Math.sin(2 * Math.PI * self.animspeed.walkingLegs * time);
    legAngle = .3 * legPhase;
    drawingContext.save();
    drawingContext.translate(65, 145);
    drawingContext.rotate(legAngle);
    drawingContext.translate(-50, -10);
    drawingContext.drawImage(IMAGES.HINDLEG.image, 0, 0);
    
    pawPhase = Math.sin(2 * Math.PI * self.animspeed.walkingLegs * time + .5 * Math.PI);
    pawAngle = .3 * pawPhase;
    drawingContext.translate(20, 115);    
    drawingContext.rotate(pawAngle * 2);
    drawingContext.translate(-15, -10);    
    drawingContext.drawImage(IMAGES.HINDPAW.image, 0, 0);
    
    drawingContext.restore();    
    
    // Render the front leg.
    legPhase = Math.sin(2 * Math.PI * self.animspeed.walkingLegs * time + Math.PI);
    legAngle = -.3 + .6 * legPhase;
    drawingContext.save();
    drawingContext.translate(300, 155);
    drawingContext.rotate(legAngle);
    drawingContext.translate(-30, -20);
    drawingContext.drawImage(IMAGES.FRONTLEG.image, 0, 0);
    
    pawPhase = Math.sin(2 * Math.PI * self.animspeed.walkingLegs * time + Math.PI * 1.5);
    pawAngle = .3 * pawPhase;
    drawingContext.translate(20, 105);
    drawingContext.rotate(pawAngle * 2);
    drawingContext.translate(-15, -10);    
    drawingContext.drawImage(IMAGES.FRONTPAW.image, 0, 0);

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

