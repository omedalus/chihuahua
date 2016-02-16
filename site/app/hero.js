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
    EYEBROW: {src: 'img/sprites/hero/walking/eyebrow.png'},
    EYE: {src: 'img/sprites/hero/walking/eye.png'},
    PUPIL: {src: 'img/sprites/hero/walking/pupil.png'},
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
    
    
    // Underneath everything, the shadow.
    var shadowPhase = Math.sin(2 * Math.PI * self.animspeed.walkingLegs * time + Math.PI);
    var shadowXSc = 1 + .1 * shadowPhase;    
    drawingContext.save();
    drawingContext.translate(200, 260);
    drawingContext.scale(shadowXSc, .15);
    drawingContext.beginPath();
    drawingContext.arc(0, 0, 200, 0, 2 * Math.PI, false);
    drawingContext.restore();
    drawingContext.fillStyle = 'rgba(0,0,0, .5)';
    drawingContext.fill();
    
    
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
    var headPhase = Math.sin(2 * Math.PI * self.animspeed.walkingLegs * time);
    var headBob = 5 + 5 * headPhase;
    var headAngle = .05 + .05 * headPhase;
    drawingContext.save();
    drawingContext.translate(250 + headBob, -165 + headBob);
    drawingContext.rotate(headAngle);
    drawingContext.drawImage(IMAGES.HEAD.image, 0, 0);
            
    drawingContext.save();
    drawingContext.translate(110, 110);
    drawingContext.drawImage(IMAGES.EYE.image, 0, 0);
    drawingContext.restore();

    drawingContext.save();
    drawingContext.translate(120, 115 + .5 * headBob);
    drawingContext.drawImage(IMAGES.PUPIL.image, 0, 0);
    drawingContext.restore();    
    
    drawingContext.save();
    drawingContext.translate(100, 100 - .5 * headBob);
    drawingContext.drawImage(IMAGES.EYEBROW.image, 0, 0);
    drawingContext.restore();

    
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

