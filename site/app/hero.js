chihuahuaApp.service('hero', [
  'animator',
  'grid',
  function(animator, grid) {

    var self = this;
    
    self.gridPosition = {x: 0, y: 0};
    self.finePosition = {x: 0, y: 0};
    self.gridMoveSecondsPerSquare = .5;
    
    self.direction = 1;
    
    var shivers = {
      rightear: {
        duration: 2,
        interval: 5,
        intervalrand: 3,
        lastshivertime: 0,
        shivering: false
      },
      leftear: {
        duration: 2,
        interval: 5,
        intervalrand: 3,
        lastshivertime: 0,
        shivering: false
      },
      eyebrows: {
        duration: 2,
        interval: 5,
        intervalrand: 3,
        lastshivertime: 0,
        shivering: false
      },
    };
    
    var perturbshiverpart = function(partname, magnitude) {
      return function(t) {
        if (shivers[partname].shivering) {
          return {
            angle: magnitude * (Math.random() - .5)
          }
        }
        return {};
      };
    };
    
    // Speeds measured in hertz.
    self.animspeed = {
      tailUp: 3,
      walkingLegs: 1.5,
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
      HINDLEGSHOULDER: {src: 'img/sprites/hero/walking/HindLegShoulder.png'},
      HINDLEGLEG: {src: 'img/sprites/hero/walking/HindLegLeg.png'},
      HINDLEGFOOT: {src: 'img/sprites/hero/walking/HindLegFoot.png'},
      FRONTLEGSHOULDER: {src: 'img/sprites/hero/walking/FrontLegShoulder.png'},
      FRONTLEGLEG: {src: 'img/sprites/hero/walking/FrontLegLeg.png'},
    };
    
    _.each(IMAGES, function(imgObj, imgKey) {
      imgObj.key = imgKey;
      imgObj.image = new Image();
      imgObj.image.src = imgObj.src;
      
      // TODO: Register them with a loading service, and add event handlers
      // to call the loading service to notify it that an object has finished
      // loading.
    });
    
    
    var AUDIOS = {
      WALKINGHARD: {src: 'audio/chewie-footsteps-solid.mp3'}
    };
    
    _.each(AUDIOS, function(audioObj, audioKey) {
      audioObj.key = audioKey;
      audioObj.audio = new Audio();
      audioObj.audio.src = audioObj.src;
      audioObj.audio.type = 'audio/mpeg';
      audioObj.audio.loop = true;
      
      // TODO: Register them with a loading service, and add event handlers
      // to call the loading service to notify it that an object has finished
      // loading.
    });
    
    var currentAudioObj = null;
    
    
    var animWalking = new AnimationHelpers.Limb({
      children: [
        new AnimationHelpers.Limb({
          image: IMAGES.TORSO.image,
          parentAnchorPoint: {x: 0, y: 0},
          imageAnchorPoint: {x: 60, y: 40},
          perturb: function(t) {
            return {
              parentAnchorPoint: {
                y: 5 * AnimationHelpers.computePhasePosition(2 * t, 
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
              parentAnchorPoint: {x: 102, y: 23},
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
                              angle: -.1 * AnimationHelpers.computePhasePosition(t, self.animspeed.walkingLegs, .5)
                            };
                          },
                        })
                      ]
                    }),
                  ]
                }),
              ]
            }),

            // Near hind leg.
            new AnimationHelpers.Limb({
              image: IMAGES.HINDLEGSHOULDER.image,
              parentAnchorPoint: {x: 8, y: 35},
              imageAnchorPoint: {x: 9, y: 8},
              perturb: function(t) {
                return {
                  angle: .2 * AnimationHelpers.computePhasePosition(t, self.animspeed.walkingLegs, .75)
                };
              },
              
              children: [
                new AnimationHelpers.Limb({
                  image: IMAGES.HINDLEGLEG.image,
                  parentAnchorPoint: {x: 27, y: 24},
                  imageAnchorPoint: {x: 22, y: 5},
                  perturb: function(t) {
                    return {
                      angle: .4 * AnimationHelpers.computePhasePosition(t, 
                          self.animspeed.walkingLegs, .5)
                    };
                  },
                  children: [
                    new AnimationHelpers.Limb({
                      image: IMAGES.HINDLEGFOOT.image,
                      parentAnchorPoint: {x: 5, y: 23},
                      imageAnchorPoint: {x: 3, y: 2},
                      perturb: function(t) {
                        return {
                          angle: .2 * AnimationHelpers.computePhasePosition(t, 
                              self.animspeed.walkingLegs, .75)
                        };
                      },
                    })
                  ]
                })
              ]
            }),
            
            // Far hind leg.
            new AnimationHelpers.Limb({
              image: IMAGES.HINDLEGSHOULDER.image,
              parentAnchorPoint: {x: 18, y: 33},
              imageAnchorPoint: {x: 9, y: 8},
              z: -1,
              perturb: function(t) {
                return {
                  angle: .2 * AnimationHelpers.computePhasePosition(t, self.animspeed.walkingLegs, .25)
                };
              },
              
              children: [
                new AnimationHelpers.Limb({
                  image: IMAGES.HINDLEGLEG.image,
                  parentAnchorPoint: {x: 27, y: 24},
                  imageAnchorPoint: {x: 22, y: 5},
                  perturb: function(t) {
                    return {
                      angle: .4 * AnimationHelpers.computePhasePosition(t, 
                          self.animspeed.walkingLegs, 0)
                    };
                  },
                  children: [
                    new AnimationHelpers.Limb({
                      image: IMAGES.HINDLEGFOOT.image,
                      parentAnchorPoint: {x: 5, y: 23},
                      imageAnchorPoint: {x: 3, y: 2},
                      perturb: function(t) {
                        return {
                          angle: .2 * AnimationHelpers.computePhasePosition(t, 
                              self.animspeed.walkingLegs, .25)
                        };
                      },
                    })
                  ]
                })
              ]
            }),

            // Near front leg.
            new AnimationHelpers.Limb({
              image: IMAGES.FRONTLEGSHOULDER.image,
              parentAnchorPoint: {x: 95, y: 45},
              imageAnchorPoint: {x: 8, y: 4},
              perturb: function(t) {
                return {
                  angle: .6 * 
                      AnimationHelpers.computePhasePosition(t, self.animspeed.walkingLegs, .5),
                };
              },
              
              children: [
                new AnimationHelpers.Limb({
                  image: IMAGES.FRONTLEGLEG.image,
                  parentAnchorPoint: {x: 7, y: 11},
                  imageAnchorPoint: {x: 5, y: 3},
                  angle: -.2,
                  perturb: function(t) {
                    return {
                      angle: .6 * AnimationHelpers.computePhasePosition(t, 
                          self.animspeed.walkingLegs, .25),
                      parentAnchorPoint: {
                        y: 2 * AnimationHelpers.computePhasePosition(t, self.animspeed.walkingLegs, .5)
                      }
                    };
                  }
                })
              ]
            }),
            
            // Far front leg.
            new AnimationHelpers.Limb({
              image: IMAGES.FRONTLEGSHOULDER.image,
              parentAnchorPoint: {x: 90, y: 45},
              imageAnchorPoint: {x: 8, y: 4},
              z: -1,
              perturb: function(t) {
                return {
                  angle: .3 * 
                      AnimationHelpers.computePhasePosition(t, self.animspeed.walkingLegs, 0)
                };
              },
              
              children: [
                new AnimationHelpers.Limb({
                  image: IMAGES.FRONTLEGLEG.image,
                  parentAnchorPoint: {x: 7, y: 11},
                  imageAnchorPoint: {x: 5, y: 3},
                  angle: -.2,
                  perturb: function(t) {
                    return {
                      angle: .6 * AnimationHelpers.computePhasePosition(t, 
                          self.animspeed.walkingLegs, -.25),
                      parentAnchorPoint: {
                        y: 2 * AnimationHelpers.computePhasePosition(t, self.animspeed.walkingLegs, 0)
                      }
                    };
                  }
                })
              ]
            }),
            
          ]
        }),
        
        // Behind everything, the shadow.
        new AnimationHelpers.Limb({
          parentAnchorPoint: {x: 10, y: 50},
          z: -10,
          customDraw: function(drawingContext, t) {
            drawingContext.scale(1, .10);
            drawingContext.beginPath();
            drawingContext.arc(0, 0, 90, 0, 2 * Math.PI, false);
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
      currentAudioObj = AUDIOS['WALKINGHARD'];
      
      
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

    
    var animSitting = animWalking.clone();
    animSitting.children[0].angle = -.6; // Torso up
    animSitting.children[0].parentAnchorPoint = {x: 0, y: 15}; // Down onto his butt
    animSitting.children[0].children[2].angle = .1; // Neck forward
    animSitting.children[0].children[2].parentAnchorPoint = {x: 104, y: 23};
    animSitting.children[0].children[2].children[0].angle = .5; // Head forward
    animSitting.children[0].children[2].children[0].parentAnchorPoint= {x: 32, y: 10};
    // Hind legs up
    animSitting.children[0].children[3].parentAnchorPoint = {x: 15, y: 40};
    animSitting.children[0].children[3].angle = -1;
    animSitting.children[0].children[3].children[0].angle = 1;
    animSitting.children[0].children[3].children[0].children[0].angle = -.6;
    animSitting.children[0].children[4].parentAnchorPoint = {x: 25, y: 45};
    animSitting.children[0].children[4].angle = -1;
    animSitting.children[0].children[4].children[0].angle = 1;
    animSitting.children[0].children[4].children[0].children[0].angle = -.6;
    // Front lefts down
    animSitting.children[0].children[5].parentAnchorPoint = {x: 80, y: 45};
    animSitting.children[0].children[5].angle = 1;
    animSitting.children[0].children[6].parentAnchorPoint = {x: 90, y: 50};
    animSitting.children[0].children[6].angle = 1;
    // Stop moving
    animSitting.children[0].perturb = null;
    animSitting.children[0].children[2].unperturb();
    animSitting.children[0].children[3].unperturb();
    animSitting.children[0].children[4].unperturb();
    animSitting.children[0].children[5].unperturb();
    animSitting.children[0].children[6].unperturb();
    animSitting.children[1].unperturb();
    // Bob the neck.
    animSitting.children[0].children[2].perturb = function(t) {
      return {
        parentAnchorPoint: {
          x: 2 * AnimationHelpers.computePhasePosition(0.5 * t, self.animspeed.walkingLegs, .5),
          y: 1 * AnimationHelpers.computePhasePosition(0.5 * t, self.animspeed.walkingLegs, 0),
        }
      }
    };
    // Shiver parts.
    animSitting.children[0].children[2].children[0].children[5].perturb = 
        perturbshiverpart('rightear', .1);
    animSitting.children[0].children[2].children[0].children[6].perturb = 
        perturbshiverpart('leftear', .1);
    animSitting.children[0].children[2].children[0].children[5].perturb = 
        perturbshiverpart('rightear', .1);
    animSitting.children[0].children[2].children[0].children[1].perturb = 
        perturbshiverpart('eyebrows', .1);
    animSitting.children[0].children[2].children[0].children[3].perturb = 
        perturbshiverpart('eyebrows', .1);
    
    
    window.animSitting = animSitting;
    
    
    var renderSitting = function(drawingContext, time) {
      currentAudioObj = null;
    
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
      _.each(shivers, function(shiver, shivername) {
        shiver.shivering = time < shiver.lastshivertime + shiver.duration;
        if (time > shiver.lastshivertime + shiver.interval) {
          shiver.lastshivertime = time + shiver.intervalrand * Math.random();
        }
      });
      
      _.each(AUDIOS, function(audioObj) {
        if (audioObj !== currentAudioObj) {
          audioObj.audio.pause();
        } else {
          audioObj.audio.play();
        }
      });
    
    
      self.action.renderFn(drawingContext, time);
    };  
  }
]);

