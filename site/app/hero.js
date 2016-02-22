chihuahuaApp.service('hero', [
  'animator',
  'grid',
  function(animator, grid) {

    var self = this;
    
    self.gridPosition = {x: 0, y: 0};
    self.finePosition = {x: 0, y: 0};
    self.gridMoveSecondsPerSquare = .5;
    
    self.direction = 1;
    
    // Speeds measured in hertz.
    self.animspeed = {
      tailUp: 4,
      walkingLegs: 2,
    };

    // Define and load all images!
    
    var IMAGES = {
      TORSO: {src: 'img/sprites/hero/walking/Torso.png'},
      TAIL: {src: 'img/sprites/hero/walking/Tail.png'},
      COLLAR: {src: 'img/sprites/hero/walking/Collar.png'},
      NECK: {src: 'img/sprites/hero/walking/Neck.png'},
      HEAD: {src: 'img/sprites/hero/walking/Head.png'},
      RIGHTEAR: {src: 'img/sprites/hero/walking/RightEar.png'},
      LEFTEAR: {src: 'img/sprites/hero/walking/LeftEar.png'},
      LEFTEARTIP: {src: 'img/sprites/hero/walking/LeftEarTip.png'},
      LEFTEYE: {src: 'img/sprites/hero/walking/LeftEye.png'},
      LEFTPUPIL: {src: 'img/sprites/hero/walking/LeftPupil.png'},
      LEFTEYEBROW: {src: 'img/sprites/hero/walking/LeftEyebrow.png'},
      RIGHTPUPIL: {src: 'img/sprites/hero/walking/RightPupil.png'},
      RIGHTEYEBROW: {src: 'img/sprites/hero/walking/RightEyebrow.png'},
      WART: {src: 'img/null.png'},
      EYEBROW: {src: 'img/null.png'},
      EYE: {src: 'img/null.png'},
      PUPIL: {src: 'img/null.png'},
      HINDLEG: {src: 'img/null.png'},
      HINDPAW: {src: 'img/null.png'},
      FRONTLEG: {src: 'img/null.png'},
      FRONTPAW: {src: 'img/null.png'},
      
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
          parentAnchorPoint: {x: 0, y: 0},
          imageAnchorPoint: {x: 60, y: 40},
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
              parentAnchorPoint: {x: 11, y: 17},
              imageAnchorPoint: {x: 19, y: 43},
              perturb: function(t) {
                return {
                  angle: .6 * AnimationHelpers.computePhasePosition(t, self.animspeed.tailUp, 0)
                };
              }
            }),
            
            new AnimationHelpers.Limb({
              image: IMAGES.COLLAR.image,
              parentAnchorPoint: {x: 102, y: 28},
              imageAnchorPoint: {x: 0, y: 25},
              z: -5
            }),

            new AnimationHelpers.Limb({
              image: IMAGES.NECK.image,
              parentAnchorPoint: {x: 105, y: 25},
              imageAnchorPoint: {x: 6, y: 28},
              z: -4,
              perturb: function(t) {
                return {
                  angle: .2 * AnimationHelpers.computePhasePosition(t, self.animspeed.walkingLegs, .5)
                };
              },
              children: [
                new AnimationHelpers.Limb({
                  image: IMAGES.HEAD.image,
                  parentAnchorPoint: {x: 26, y: 8},
                  imageAnchorPoint: {x: 18, y: 48},
                  z: 1,
                  perturb: function(t) {
                    return {
                      angle: -.2 * AnimationHelpers.computePhasePosition(t, self.animspeed.walkingLegs, .5)
                    };
                  },
                  children: [
                    new AnimationHelpers.Limb({
                      image: IMAGES.LEFTEYE.image,
                      parentAnchorPoint: {x: 48, y: 30},
                      imageAnchorPoint: {x: 8, y: 9},
                      z: -1,
                      perturb: function(t) {
                        return {
                          parentAnchorPoint: {
                            x: 1 * AnimationHelpers.computePhasePosition(t, 
                                self.animspeed.walkingLegs, 0)
                          }
                        };
                      },
                      children: [
                        new AnimationHelpers.Limb({
                          image: IMAGES.LEFTPUPIL.image,
                          parentAnchorPoint: {x: 12, y: 9},
                          imageAnchorPoint: {x: 6, y: 6},
                        })
                      ]
                    }),
                    new AnimationHelpers.Limb({
                      image: IMAGES.LEFTEYEBROW.image,
                      parentAnchorPoint: {x: 52, y: 18},
                      imageAnchorPoint: {x: 9, y: 3},
                      perturb: function(t) {
                        return {
                          parentAnchorPoint: {
                            y: 1 * AnimationHelpers.computePhasePosition(t, 
                                self.animspeed.walkingLegs, 0)
                          }
                        };
                      }
                    }),
                    new AnimationHelpers.Limb({
                      image: IMAGES.RIGHTPUPIL.image,
                      parentAnchorPoint: {x: 35, y: 35},
                      imageAnchorPoint: {x: 9, y: 9},
                      perturb: function(t) {
                        return {
                          parentAnchorPoint: {
                            x: 1 * AnimationHelpers.computePhasePosition(t, 
                                self.animspeed.walkingLegs, 0)
                          }
                        };
                      },
                    }),
                    new AnimationHelpers.Limb({
                      image: IMAGES.RIGHTEYEBROW.image,
                      parentAnchorPoint: {x: 18, y: 29},
                      imageAnchorPoint: {x: 2, y: 15},
                      perturb: function(t) {
                        return {
                          parentAnchorPoint: {
                            y: 1 * AnimationHelpers.computePhasePosition(t, 
                                self.animspeed.walkingLegs, 0)
                          }
                        };
                      },
                    }),
                    new AnimationHelpers.Limb({
                      image: IMAGES.WART.image,
                      parentAnchorPoint: {x: 18, y: 52},
                      imageAnchorPoint: {x: 13, y: 2},
                      angle: 1.2,
                      perturb: function(t) {
                        return {
                          angle: -.2 * AnimationHelpers.computePhasePosition(t, self.animspeed.walkingLegs, .5)
                        };
                      },
                    }),                  
                  
                  
                    new AnimationHelpers.Limb({
                      image: IMAGES.RIGHTEAR.image,
                      parentAnchorPoint: {x: 11, y: 24},
                      imageAnchorPoint: {x: 26, y: 40},
                      perturb: function(t) {
                        return {
                          angle: -.2 * AnimationHelpers.computePhasePosition(t, self.animspeed.walkingLegs, .5)
                        };
                      }
                    }),
                    new AnimationHelpers.Limb({
                      image: IMAGES.LEFTEAR.image,
                      parentAnchorPoint: {x: 41, y: 15},
                      imageAnchorPoint: {x: 12, y: 32},
                      z: -1,
                      perturb: function(t) {
                        return {
                          angle: .2 * AnimationHelpers.computePhasePosition(t, self.animspeed.walkingLegs, .5)
                        };
                      },
                      children: [
                        new AnimationHelpers.Limb({
                          image: IMAGES.LEFTEARTIP.image,
                          parentAnchorPoint: {x: 26, y: 2},
                          imageAnchorPoint: {x: 16, y: 2},
                          perturb: function(t) {
                            return {
                              angle: -.2 * AnimationHelpers.computePhasePosition(t, self.animspeed.walkingLegs, .5)
                            };
                          },
                        })
                      ]
                    }),
                    
                    
                  ]
                }),
              ]
            }),
            
            
            
            
            

            // Far hind leg.
            new AnimationHelpers.Limb({
              image: IMAGES.HINDLEG.image,
              parentAnchorPoint: {x: 95, y: 120},
              imageAnchorPoint: {x: 50, y: 10},
              z: -1,
              perturb: function(t) {
                return {
                  angle: .5 * AnimationHelpers.computePhasePosition(t, self.animspeed.walkingLegs, .5)
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
                  angle: .5 * AnimationHelpers.computePhasePosition(t, self.animspeed.walkingLegs, 0)
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
          parentAnchorPoint: {x: 0, y: 50},
          z: -10,
          customDraw: function(drawingContext, t) {
            drawingContext.scale(1, .15);
            drawingContext.beginPath();
            drawingContext.arc(0, 0, 80, 0, 2 * Math.PI, false);
            drawingContext.fillStyle = 'rgba(0,0,0, .5)';
            drawingContext.fill();
          },
          perturb: function(t) {
            return {
              scale: {
                x: .1 * AnimationHelpers.computePhasePosition(t, 
                    self.animspeed.walkingLegs, .5)
              }
            };
          }
        }),
      ],
    });
      
    var renderWalking = function(drawingContext, time) {
      // First handle the walking logic.
      self.finePosition.x += self.direction / (self.gridMoveSecondsPerSquare * animator.fps);
      while (self.finePosition.x > 1) {
        self.gridPosition.x += 1;
        self.finePosition.x -= 1;
      }
      while (self.finePosition.x < 0) {
        self.gridPosition.x -= 1;
        self.finePosition.x += 1;        
      }

      
      // Then handle the walking rendering.
      
      drawingContext.save();

      // Position on the grid.
      var screenCoords = grid.gridCoordinatesToPixels(self.gridPosition, self.finePosition);
      drawingContext.translate(screenCoords.x, screenCoords.y);
      
      // Face left or right.
      drawingContext.scale(self.direction, 1);
      

      animWalking.render(drawingContext, time);
      
      drawingContext.restore();
      return;
    };
    
    var animSitting = animWalking.clone(); //.unperturb();
    
    var renderSitting = function(drawingContext, time) {
      drawingContext.save();

      // Position on the grid.
      var screenCoords = grid.gridCoordinatesToPixels(self.gridPosition, self.finePosition);
      drawingContext.translate(screenCoords.x, screenCoords.y);
      
      // Face left or right.
      drawingContext.scale(self.direction, 1);
      
      animSitting.render(drawingContext, time);
      
      drawingContext.restore();
      return;
    };
    
    
    
    // Define all actions!
    
    self.ACTIONS = {
      //STANDING: 'STANDING',
      SITTING: {
        renderFn: renderSitting
      },
      WALKING: {
        renderFn: renderWalking
      }
      //BARKING: 'BARKING',
      //PUSHING: 'PUSHING',
      //PULLING: 'PULLING',
      //JUMPING: 'JUMPING'
    };

    self.action = self.ACTIONS.SITTING;

    
    self.render = function(drawingContext, time) {
      self.action.renderFn(drawingContext, time);
    };  
  }
]);

