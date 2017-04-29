import angular from 'angular';
import angularMeteor from 'angular-meteor';

import config from '/client/modules/core/config.js';
import appAuth from '/client/modules/auth/appAuth.js';
import appMenu from './modules/menu/appMenu.js';
import appDashboard from '/client/modules/dashboard/appDashboard.js';
import appHome from '/client/modules/home/appHome.js';
import mdColors from '/client/modules/theme/mdStyleColor.js';

//import '../imports/startup/accounts-config.js';
// This package is used to load modules for angular instead of depending on ng-annotate
//angular-ecmascript
angular
  .module('app', [
      angularMeteor,
      config.name,
      appAuth.name,
      appMenu.name,
      appDashboard.name,
      appHome.name,
      mdColors.name, // client/lib/theme/mdStyleColor
  ])
  .config(['$mdIconProvider', function ($mdIconProvider) {
    /**
    $mdIconProvider
      .iconSet("social", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg")
      .iconSet("action", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg")
      .iconSet("communication", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg")
      .iconSet("content", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg")
      .iconSet("toggle", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg")
      .iconSet("navigation", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg")
      .iconSet("image", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg");
    */

  }]);


function onReady() {
  angular.bootstrap(document, ['app'], {
    // Makes sure app is safe when minified (no problems)
    strictDi: true,
  });
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
