chihuahuaApp.service('grid', function() {

  var self = this;

  self.pixelDimensions = {width: 1, height: 1};

  var pixelsPerSquare = function() {
    return {
      x: 60,
      y: 20
    };
  };
  
  self.gridCoordinatesToPixels = function(gridCoords, fineCoords) {
    var psq = pixelsPerSquare();
    
    fineCoords = fineCoords || {x: 0, y: 0};
    
    return {
      x: (gridCoords.x + fineCoords.x) * psq.x,
      y: (gridCoords.y + fineCoords.y) * psq.y,
    };
  };
});

