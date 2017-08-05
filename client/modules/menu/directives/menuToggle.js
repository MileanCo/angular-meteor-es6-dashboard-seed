
  //angular.module('app.menu')
    //.directive('menuToggle', [ '$timeout', function($timeout) {
export function MenuToggleDirective ($timeout) {
  return {
    scope: {
      section: '='
    },
    templateUrl: '/client/modules/menu/directives/templates/menu-toggle.html',
    restrict: 'E',
    replace: true,
    link: function($scope, $element) {
      var controller = $element.parent().controller();

      $scope.isOpen = function() {
        return controller.isOpen($scope.section);
      };
      $scope.toggle = function() {
        controller.toggleOpen($scope.section);
      };
    },
  };
};
