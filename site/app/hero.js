chihuahuaApp.service('hero', function() {

  var self = this;
  
  self.gridPosition = {x: 0, y: 0};
  self.finePosition = {x: 0, y: 0};
  
  self.direction = 1;
  
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
    
    // TODO: Register them with a loading service, and add event handlers
    // to call the loading service to notify it that an object has finished
    // loading.
  });
  
  
  
  var animWalking = new AnimationHelpers.Limb({
    children: [
      new AnimationHelpers.Limb({
        image: IMAGES.TORSO.image,
        parentAnchorPoint: {x: -50, y: -50},
        imageAnchorPoint: {x: 190, y: 90},
        perturb: function(t) {
          return {
            parentAnchorPoint: {
              y: 10 * AnimationHelpers.computePhasePosition(t, 
                  self.animspeed.walkingLegs, 0)
            }
          };
        },
        
        children: [
          new AnimationHelpers.Limb({
            image: IMAGES.TAIL.image,
            parentAnchorPoint: {x: 15, y: 15},
            imageAnchorPoint: {x: 25, y: 120},
            perturb: function(t) {
              return {
                angle: .2 * AnimationHelpers.computePhasePosition(t, self.animspeed.tailUp, 0)
              };
            }
          }),

          // Far hind leg.
          new AnimationHelpers.Limb({
            image: IMAGES.HINDLEG.image,
            parentAnchorPoint: {x: 95, y: 120},
            imageAnchorPoint: {x: 50, y: 10},
            z: -1,
            perturb: function(t) {
              return {
                angle: .3 * AnimationHelpers.computePhasePosition(t, self.animspeed.walkingLegs, .5)
              };
            },
            
            children: [
              new AnimationHelpers.Limb({
                image: IMAGES.HINDPAW.image,
                parentAnchorPoint: {x: 20, y: 115},
                imageAnchorPoint: {x: 15, y: 10},
                perturb: function(t) {
                  return {
                    angle: .3 * AnimationHelpers.computePhasePosition(t, 
                        self.animspeed.walkingLegs, .75)
                  };
                }
              })
            ]
          }),
          
          // Near hind leg.
          new AnimationHelpers.Limb({
            image: IMAGES.HINDLEG.image,
            parentAnchorPoint: {x: 65, y: 130},
            imageAnchorPoint: {x: 50, y: 10},
            perturb: function(t) {
              return {
                angle: .3 * AnimationHelpers.computePhasePosition(t, self.animspeed.walkingLegs, 0)
              };
            },
            
            children: [
              new AnimationHelpers.Limb({
                image: IMAGES.HINDPAW.image,
                parentAnchorPoint: {x: 20, y: 115},
                imageAnchorPoint: {x: 15, y: 10},
                perturb: function(t) {
                  return {
                    angle: .3 * AnimationHelpers.computePhasePosition(t, 
                        self.animspeed.walkingLegs, .25)
                  };
                }
              })
            ]
          }),
          
          // Far front leg.
          new AnimationHelpers.Limb({
            image: IMAGES.FRONTLEG.image,
            parentAnchorPoint: {x: 270, y: 140},
            imageAnchorPoint: {x: 30, y: 20},
            z: -1,
            angle: -.3,
            perturb: function(t) {
              return {
                angle: .6 * AnimationHelpers.computePhasePosition(t, self.animspeed.walkingLegs, 0)
              };
            },
            
            children: [
              new AnimationHelpers.Limb({
                image: IMAGES.FRONTPAW.image,
                parentAnchorPoint: {x: 20, y: 105},
                imageAnchorPoint: {x: 15, y: 10},
                perturb: function(t) {
                  return {
                    angle: .3 * AnimationHelpers.computePhasePosition(t, 
                        self.animspeed.walkingLegs, .25)
                  };
                }
              })
            ]
          }),
          
          // Near front leg.
          new AnimationHelpers.Limb({
            image: IMAGES.FRONTLEG.image,
            parentAnchorPoint: {x: 300, y: 155},
            imageAnchorPoint: {x: 30, y: 20},
            angle: -.3,
            perturb: function(t) {
              return {
                angle: .6 * 
                    AnimationHelpers.computePhasePosition(t, self.animspeed.walkingLegs, .5)
              };
            },
            
            children: [
              new AnimationHelpers.Limb({
                image: IMAGES.FRONTPAW.image,
                parentAnchorPoint: {x: 20, y: 105},
                imageAnchorPoint: {x: 15, y: 10},
                perturb: function(t) {
                  return {
                    angle: .3 * AnimationHelpers.computePhasePosition(t, 
                        self.animspeed.walkingLegs, .75)
                  };
                }
              })
            ]
          }),
          
          // Neck and head.
          new AnimationHelpers.Limb({
            image: IMAGES.HEAD.image,
            parentAnchorPoint: {x: 350, y: 40},
            imageAnchorPoint: {x: 100, y: 200},
            angle: .2,
            perturb: function(t) {
              return {
                angle: .1 * AnimationHelpers.computePhasePosition(t,
                    self.animspeed.walkingLegs, .5),
                parentAnchorPoint: {
                  y: 5* AnimationHelpers.computePhasePosition(t,
                      self.animspeed.walkingLegs, .5),                  
                  x: -5* AnimationHelpers.computePhasePosition(t,
                      self.animspeed.walkingLegs, .5),                  
                }
              };
            },
            
            children: [
              new AnimationHelpers.Limb({
                image: IMAGES.EYEBROW.image,
                parentAnchorPoint: {x: 100, y: 100},
                z: 5,
                perturb: function(t) {
                  return {
                    parentAnchorPoint: {
                      y: 2 * AnimationHelpers.computePhasePosition(t, 
                            self.animspeed.walkingLegs, .25)
                    }
                  };
                },
              }),
              
              new AnimationHelpers.Limb({
                image: IMAGES.EYE.image,
                parentAnchorPoint: {x: 110, y: 110},
                children: [
                  new AnimationHelpers.Limb({
                    image: IMAGES.PUPIL.image,
                    imageAnchorPoint: {x: 15, y: 15},
                    parentAnchorPoint: {x: 25, y: 25},
                    perturb: function(t) {
                      return {
                        angle: .2 * AnimationHelpers.computePhasePosition(t,
                            self.animspeed.walkingLegs, 0),
                      };
                    },
                  })
                ]
              }),
            ]
          }),
        ]
      }),
      
      // Behind everything, the shadow.
      new AnimationHelpers.Limb({
        parentAnchorPoint: {x: -20, y: 110},
        z: -10,
        customDraw: function(drawingContext, t) {
          var shadowPhase = 
            AnimationHelpers.computePhasePosition(t, self.animspeed.walkingLegs, .5);
          var shadowXSc = 1 + .1 * shadowPhase;    
          drawingContext.scale(shadowXSc, .15);
          drawingContext.beginPath();
          drawingContext.arc(0, 0, 200, 0, 2 * Math.PI, false);
          drawingContext.fillStyle = 'rgba(0,0,0, .5)';
          drawingContext.fill();
        }
      }),
    ],
  });
    

    
    
    
    
  
  var renderWalking = function(drawingContext, time) {
    drawingContext.save();
    
    // Doggie sprites are too big.
    drawingContext.scale(.25, .25);

    // Face left or right.
    drawingContext.scale(self.direction, 1);

    animWalking.render(drawingContext, time);
    
    
    
    drawingContext.restore();
    return;
    
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

