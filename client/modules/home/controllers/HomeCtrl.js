import { Meteor } from 'meteor/meteor';

export function HomeCtrl ($scope, $rootScope, $mdConstant, $mdDialog, $document, $mdToast) {
  // TODO: PUT ALL $scope. VARS IN HERE SO UI KNOWS THEY ARE COMING FROM CTRL.
  // ALSO INCREASES BROWSER SUPPORT
  $scope.ctrl = {

  };


  $scope.logo_width = Math.floor(window.innerWidth / 4);
  $scope.carousel_height = Math.floor( $(window).height());
  console.log("logo width: " + $scope.logo_width);
  console.log("carousel height: " + $scope.carousel_height);

  $scope.submitted = false;
  $scope.user_info = {
    name: '',
    email: '',
    more_info: false,
    playlist_uris: [],
    account_uris:[],
  };
  // keys to enter in chips
  $scope.chip_keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];

  $scope.submitForm = function() {
    if (! $scope.submitted) {
      $scope.submitted = true;
      Meteor.call('home_form_submit', $scope.user_info, function (error, result) {
        if (result) {
          var message = 'Thanks for signing up, ' + $scope.user_info.name + '! ';
          if ($scope.user_info.more_info) {
            message += 'We will be in touch soon regarding more info. ';
          } else {
            message += "We will be in touch with you shortly.";
          }

          $mdDialog.show( $mdDialog.alert()
             .parent(angular.element(document.querySelector('#popupContainer')))
             .clickOutsideToClose(true)
             .title('You are confirmed!')
             .textContent(message)
             .ariaLabel('Signup confirmed')
             .ok('Got it!')

          );
        } else {
          $scope.submitted = false;
          $mdDialog.show( $mdDialog.alert()
             .parent(angular.element(document.querySelector('#popupContainer')))
             .clickOutsideToClose(true)
             .title('Error - sign up failed!')
             .textContent(error)
             .ariaLabel('Signup failed')
             .ok('Fine')

          );
        }
      });
    } else {
      $scope.showToast("You have already submitted the form!", "error-toast");
    }
  }
  // TOAST STUFF
  // DUPLICATED IN MENUCTRL.JS
  var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
  };

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
};
