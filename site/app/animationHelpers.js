var AnimationHelpers = {};

(function() {
  var computePhasePosition = function(time, hertz, offset) {
    return Math.sin(2 * Math.PI * hertz * time + 2 * offset * Math.PI);
  };  
  AnimationHelpers.computePhasePosition = computePhasePosition;

  
  var drawLimb = function(imageObj, 
      xParentAnchor, 
      yParentAnchor, 
      xLimbImageAnchor, 
      yLimbImageAnchor, 
      angle) {
    
  };
  AnimationHelpers.drawLimb = drawLimb;
}());


(function() {
  var Limb = function(config) {
    config = config || {};
    
    this.children = config.children || [];

    this.image = config.image || null;
    this.customDraw = config.customDraw || null;
    
    this.parentAnchorPoint = config.parentAnchorPoint || {x: 0, y: 0};
    this.imageAnchorPoint = config.imageAnchorPoint || {x: 0, y: 0};
    this.angle = config.angle || 0;
    this.z = config.z || 0;
    
    this.perturb = config.perturb || null;
  };

  
  Limb.prototype.unperturb = function() {
    this.perturb = null;
    _.each(this.children, function(childLimb) {
      childLimb.unperturb();
    });
    return this;
  };  
  
  
  Limb.prototype.clone = function() {
    var self = this;
    var retval = new Limb({
      children: [],

      image: self.image,
      customDraw: self.customDraw,

      parentAnchorPoint: {
        x: self.parentAnchorPoint.x,
        y: self.parentAnchorPoint.y
      },
      
      imageAnchorPoint: {
        x: self.imageAnchorPoint.x,
        y: self.imageAnchorPoint.y
      },
      
      angle: self.angle,
      z: self.z,
      
      perturb: self.perturb
    });
    
    _.each(self.children, function(childLimb) {
      retval.children.push(childLimb.clone());
    });
    
    return retval;
  }
  
  Limb.prototype.render = function(drawingContext, time) {
    var self = this;
    
    var perturbations = !!self.perturb ? self.perturb(time) : {};
    perturbations.parentAnchorPoint = perturbations.parentAnchorPoint || {};
    perturbations.imageAnchorPoint = perturbations.imageAnchorPoint || {};    
    perturbations.scale = perturbations.scale || {};    

    var vars = {
      image: perturbations.image || self.image,
      parentAnchorPoint: {
        x: self.parentAnchorPoint.x + (perturbations.parentAnchorPoint.x || 0),
        y: self.parentAnchorPoint.y + (perturbations.parentAnchorPoint.y || 0)
      },
      imageAnchorPoint: {
        x: self.imageAnchorPoint.x + (perturbations.imageAnchorPoint.x || 0),
        y: self.imageAnchorPoint.y + (perturbations.imageAnchorPoint.y || 0)
      },
      angle: self.angle + (perturbations.angle || 0),
      scale: {
        x: 1 + (perturbations.scale.x || 0),
        y: 1 + (perturbations.scale.y || 0)
      },
      
    };
    
    // Sort the children in order from lowest to highest z-index.
    // Higher z-index means closer to the user.
    // Z-indexes are relative to the parent. The parent's z-index is always 0.
    // Children with a z-index of 0 are drawn on top of the parent.
    var sortedChildren = _.sortBy(self.children, function(childLimb) { return childLimb.z; });

    drawingContext.save();
    
    drawingContext.translate(vars.parentAnchorPoint.x, vars.parentAnchorPoint.y);
    drawingContext.rotate(vars.angle);
    drawingContext.translate(-vars.imageAnchorPoint.x, -vars.imageAnchorPoint.y);
    drawingContext.scale(vars.scale.x, vars.scale.y);
    
    var iChild = 0;
    for (; iChild < sortedChildren.length; iChild++) {
      var childLimb = sortedChildren[iChild];
      if (childLimb.z >= 0) {
        break;
      }
      childLimb.render(drawingContext, time);
    }
    
    if (!!vars.image) {
      drawingContext.drawImage(vars.image, 0, 0);
    }
    
    if (!!self.customDraw) {
      self.customDraw(drawingContext, time);
    }
    
    for (; iChild < sortedChildren.length; iChild++) {
      var childLimb = sortedChildren[iChild];
      childLimb.render(drawingContext, time);
    }
    
    drawingContext.restore();
  };
  
  AnimationHelpers.Limb = Limb;
}());
