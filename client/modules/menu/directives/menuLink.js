export function MenuLinkDirective() {
  return {
    scope: {
      section: '='
    },
    templateUrl: '/client/modules/menu/directives/templates/menu-link.html',
    restrict: 'E',
    replace: true,
    link: function ($scope, $element) {
      var controller = $element.parent().controller();
      $scope.focusSection = function () {
        // set flag to be used later when
        // $locationChangeSuccess calls openPage()
        controller.focusSection();
      };
    }
  };
};
