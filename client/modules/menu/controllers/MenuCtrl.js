import { Meteor } from 'meteor/meteor';

export function MenuCtrl ($scope, $rootScope, $timeout, $mdSidenav, $state, $location, $log, $mdToast, SideMenuService) {
    console.log("menu ctrl");
    // PROFILE CARD
    $scope.user = {};
    $scope.user.name = "Username";
    $scope.user.role = "Role";
    $scope.user.location = "location";

    // TOAST STUFF
    var last = {
          bottom: false,
          top: true,
          left: false,
          right: true
    };

    // TODO: MOVE TO SERVICE?
    $scope.toastPosition = angular.extend({},last);
    $scope.getToastPosition = function() {
      _sanitizePosition();
      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };
    function _sanitizePosition() {
      var current = $scope.toastPosition;
      if ( current.bottom && last.top ) current.top = false;
      if ( current.top && last.bottom ) current.bottom = false;
      if ( current.right && last.left ) current.left = false;
      if ( current.left && last.right ) current.right = false;
      last = angular.extend({},current);
    }
    $scope.showToast = function(message, theme) {
      $mdToast.show(
        $mdToast.simple()
          .content(message)
          //.theme(theme)
          .position($scope.getToastPosition())
          .hideDelay(2000)
      );
    };

    // HEADER TOOLBAR stuff //////////////////////////////
    /**
    $scope.notifications = [
      {icon: "fa fa-twitter fa-1x", title: "Twitter", text:"You have 5 new followers"},
      {icon: "fa fa-user fa-1x", title: " Friend requests", text:"You have 3 new friend requests"},
      {icon: "fa fa-tasks fa-1x", title: "Pending tasks", text:"You have 3 pending tasks"},
    ];

    $scope.messages = [
      {avatar: "images/avatars/malecostume.svg", user: "Joey", text: "lorem ipsum diaga simone al paramana elo fateta..."},
      {avatar: "images/avatars/matureman1.svg", user: "David", text: "lorem ipsum diaga simone al paramana elo fateta..."},
      {avatar: "images/avatars/female1.svg", user: "Sarah", text: "lorem aipsum diaga simone al paramana..."},
    ];
    */

    $scope.goToNotification = function(notif, event) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('Notification')
          .textContent(notif)
          .ariaLabel('Person inspect demo')
          .ok('Neat!')
          .targetEvent(event)
      );
    };
    $scope.navigateTo = function(to, event) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('Navigating')
          .textContent('Imagine being taken to ' + to)
          .ariaLabel('Navigation demo')
          .ok('Neat!')
          .targetEvent(event)
      );
    };
    $scope.doPrimaryAction = function(event) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('Primary Action')
          .textContent('Primary actions can be used for one click actions')
          .ariaLabel('Primary click demo')
          .ok('Awesome!')
          .targetEvent(event)
      );
    };
    $scope.doSecondaryAction = function(event) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('Secondary Action')
          .textContent('Secondary actions can be used for one click actions')
          .ariaLabel('Secondary click demo')
          .ok('Neat!')
          .targetEvent(event)
      );
    };

    // SIDEMENU STUFF //////////////////////////////
    //vars for menu-link and menu-toggle
    $scope.autoFocusContent = false;
    $scope.menu = SideMenuService;

    console.log('menu: ', $scope.menu);

    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };

    $scope.isOpen = function (section) {
      return SideMenuService.isSectionSelected(section);
    }

    $scope.toggleOpen = function (section) {
      SideMenuService.toggleSelectSection(section);
    }

    $scope.isSectionSelected = function (section) {
      var selected = false;
      var openedSection = SideMenuService.openedSection;
      if(openedSection === section){
        selected = true;
      }
      else if(section.children) {
        section.children.forEach(function(childSection) {
          if(childSection === openedSection){
            selected = true;
          }
        });
      }
      return selected;
    }
    $scope.focusSection = function () {
      $scope.autoFocusContent = true;
      $scope.close("left");
    }
    $scope.close = function (side) {
      $mdSidenav(side).close()
        .then(function () {
          $log.debug("close " + side + " is done");
        });
    }

    // MENU TOGGLE STUFF ////////// / / / / //
    $scope.search = {
      show : false,
    }
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      } ;
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
};
