// Handles commands from the keyboard or wherever.

chihuahuaApp.service('commandHandler', [
  'hero',
  function(hero) {

    var self = this;

    self.KEYCODES = {
      ARROW_LEFT: 37,
      ARROW_UP: 38,
      ARROW_RIGHT: 39,
      ARROW_DOWN: 40,
    };
    
    // TODO: Move to a keystroke handler service.
    $(document).keydown(function(e) {
      switch(e.keyCode) {
        case self.KEYCODES.ARROW_LEFT:
          hero.action = hero.ACTIONS.WALKING;
          hero.direction = -1;
          break;
          
        case self.KEYCODES.ARROW_RIGHT:
          hero.action = hero.ACTIONS.WALKING;
          hero.direction = 1;
          break;
      }
    });
  
  }
]);

