
import {SideMenuService} from './SideMenuService.js';
import {MenuCtrl} from './controllers/MenuCtrl.js';
import {MenuToggleDirective} from './directives/menuToggle.js';
import {MenuLinkDirective} from './directives/menuLink.js';

var LeftCtrl = function ($scope, $timeout, $mdSidenav, $log) {
/** close btn
<md-button ng-click="close()" hide-gt-md aria-label="menu" class="md-icon-button" >
  <md-icon md-font-set="material-icons">menu</md-icon>
</md-button> */
  $scope.close = function () {
    $mdSidenav('left').close()
      .then(function () {
        $log.debug("close LEFT is done");
      });
  };
};
var RightCtrl = function ($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    $mdSidenav('right').close()
      .then(function () {
        $log.debug("close RIGHT is done");
      });
  };
};

export default angular
  .module('app.menu', [])
    .factory('SideMenuService', ['$location', SideMenuService])
    .controller('MenuCtrl',  ['$scope', '$rootScope', '$timeout', '$mdSidenav', '$state', '$location', '$log', '$mdToast', 'SideMenuService', MenuCtrl])
    .controller('LeftCtrl',  ['$scope', '$timeout', '$mdSidenav', '$log', LeftCtrl])
    .controller('RightCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', RightCtrl])
    .directive('menuToggle', ['$timeout', MenuToggleDirective])
    .directive('menuLink',   [ MenuLinkDirective ])
    ;
