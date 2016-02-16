
chihuahuaApp.controller('mainController', ['$scope', 'animator', 
    function($scope, animator) {

  animator.animObjects.push(ANIMATED_OBJECTS.BouncingBall);  
}]);

