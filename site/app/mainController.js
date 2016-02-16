
chihuahuaApp.controller('mainController', [
  '$scope', 
  'animator', 
  'hero',
  function($scope, 
      animator, 
      hero) {

    animator.animObjects.push(ANIMATED_OBJECTS.BouncingBall);  
    animator.animObjects.push(hero);  
}]);

