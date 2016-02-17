
chihuahuaApp.controller('mainController', [
  '$scope', 
  'animator', 
  'commandHandler',
  'hero',
  'grid',
  function($scope, 
      animator,
      commandHandler,
      hero,
      grid) {

    //animator.animObjects.push(ANIMATED_OBJECTS.BouncingBall);  
    animator.animObjects.push(hero);
}]);

