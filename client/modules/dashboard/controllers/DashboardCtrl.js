
export function DashboardCtrl($scope, $rootScope, $meteor, $location, $mdToast) {
  // Map
  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

  // TO GET GRAPH MATERIAL COLORS: https://www.google.com/design/spec/style/color.html#color-color-palette
  var colorArray = ['#4fc3f7', '#e1f5fe', '#fdd835', '#00FFFF']; // ffeb3b
  $scope.colorFunction = function() {
  	return function(d, i) {
      	return colorArray[i];
  	};
  }
  $scope.complete = false;

  // Set 'selectedTab' for highlight/underscore [DOES NOT CHANGE STATE]
  $scope.$on('$stateChangeSuccess', function (event, toState) {
    if (toState.data) {
      $scope.currentTab = toState.data.selectedTab;
    } else {
      console.log("ERROR: " + toState.url + " didnt have 'data'.");
    }
  });

  // Go to page as directed by TAB INDEX [make sure they match!]
  $scope.goToTab = function (tab) {
    switch ( tab ) {
        case 0:
            $location.url("/dashboard/home");
            break;
        case 1:
            $location.url("/dashboard/profile");
            break;
        case 2:
            $location.url("/dashboard/instances");
            break;
    }
  }

  $scope.updateProfile = function() {
    if ($scope.currentUser.profile == null) {
      console.log ("ERROR: PROFILE IS NULL");
    }

    $meteor.call('updateProfile', $scope.currentUser.profile).then(
      function(data){
        $scope.showToast("Success: " + data, "success-toast"); //console.log('success inviting', data);
      },
      function(err){
        $scope.showToast(err, "error-toast");
      }
    );
  }

};
