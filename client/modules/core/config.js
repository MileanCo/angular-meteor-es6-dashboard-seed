
'use strict';
import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
import ngSanitize from 'angular-sanitize';
import 'angular-breadcrumb';


// TEMPLATE URLS
import homeTemplateUrl from '/client/modules/home/home.html';
import aboutTemplateUrl from './views/about.html';

import registerTemplateUrl from '/client/modules/auth/views/register.html';
import resetPwTemplateUrl  from '/client/modules/auth/views/reset-password.html';
import loginTemplateUrl    from '/client/modules/auth/views/login.html';

import dashboardTemplateUrl        from '/client/modules/dashboard/views/dashboard.html';
import dashboardHomeTemplateUrl    from '/client/modules/dashboard/views/home.html';
import dashboardProfileTemplateUrl from '/client/modules/dashboard/views/profile.html';


// TODO: SWAP PLACES WITH ng* MODULES AND USER-MODULES IN MAIN.JS
export default angular.module('app.core', [
  uiRouter,
  ngAnimate,
  ngMaterial,
  ngMessages,
  ngSanitize,
  'ncy-angular-breadcrumb',

])
// strict-di requires it to be like this so it works it deployment.
.filter('nospace', nospace_filter)
.config(['$breadcrumbProvider', '$urlRouterProvider', '$stateProvider', '$locationProvider', config])
.run(['$rootScope', '$state', '$window', run]);


function nospace_filter() {
  //take all whitespace out of string
  return function (value) {
    return (!value) ? '' : value.replace(/ /g, '');
  };
};

function run ($rootScope, $state, $window ) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === 'AUTH_REQUIRED') {
      console.error(error);
      $state.go('login');
    }
  });

  // CUSTOMIZE
  $rootScope.page = {
    SITENAME : "Angular Meteor ES6 Dashboard Template",
    // Sets page title
    setTitle: function(title) {
      this.title = title ;
    },
  };

  // Change Title on stateChangeSuccess
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      // Change title
      if ($state.current.ncyBreadcrumb) {
        $rootScope.page.setTitle($rootScope.page.SITENAME + ' - ' + $state.current.ncyBreadcrumb.label );
      } else {
        $rootScope.page.setTitle(""); // no title if none specified
      }
      // For Header to display Blue Breadcrumbs Header or nah
      $rootScope.state_name = $state.current.name;
      // Scroll to top of page on refresh
      $window.scrollTo(0, 0);
  });
};

function config ($breadcrumbProvider, $urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  // Set Breadcrumb Directive template
  $breadcrumbProvider.setOptions({
     templateUrl: '/client/modules/core/directives/breadcrumbs.html'
   });

   // CONTROLLER AND JS LIBS ARE LOADED BY client/lib/*.module.ng.js
   // as such, put the order of loaded modules in app.module.ng.js
  $stateProvider
  // TODO: RENAME MENUCTRL AS CORECTRL
  /**
    .state('core', {
      templateUrl: coreTemplateUrl,
      controller: 'MenuCtrl',
      controllerAs: 'vm',
      ncyBreadcrumb: {
        label: 'Home'
      }
    }) */
    .state('home', {
      url: '/',
      controller:'HomeCtrl',
      templateUrl: homeTemplateUrl,
      ncyBreadcrumb: {
        skip:true, //skip breadcrumb creation (no Home / Home )
        label: 'Welcome!' // display Page title still
      },
      //controller: 'LoginCtrl',
    })


    .state('aboutus', {
      url: '/aboutus',
      templateUrl: aboutTemplateUrl,
      ncyBreadcrumb: {
        skip:true, //skip breadcrumb creation (no Home / Home )
        label: 'About Us!' // display Page title still
      },
      //controller: 'LoginCtrl',
    })


    // DASHBOARD /////// /////// //////// //////////
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: dashboardTemplateUrl,
      controller: 'DashboardCtrl',
      ncyBreadcrumb: {
        label: 'Dashboard'
      },
      data: {
        'selectedTacab': -1,
      },
      resolve: {
        "currentUser": function($meteor){
          // TO ENABLE THIS FOR LOGGED IN USERS ONLY
          // Resolves the promise successfully if a user is authenticated and rejects otherwise
          //return $meteor.requireUser() ;
          return Meteor.user();
        }
      }
    })
        .state('dashboard.home', {
          url: '/home',
          templateUrl: dashboardHomeTemplateUrl,
          ncyBreadcrumb: {
            label: 'Home'
          },
        })
        .state('dashboard.profile', {
          url: '/profile',
          templateUrl: dashboardProfileTemplateUrl,
          ncyBreadcrumb: {
            label: 'Profile'
          },
          data: {
            'selectedTab': 1,
          },
        })


    // AUTH /////// /////// //////// //////////
    .state('login', {
      url: '/login',
      templateUrl: loginTemplateUrl,
      controller: 'LoginCtrl',
      ncyBreadcrumb: {
        label: 'Login'
      },
      controllerAs: 'lc',
    })
    .state('register',{
      url: '/register',
      templateUrl: registerTemplateUrl,
      controller: 'RegisterCtrl',
      ncyBreadcrumb: {
        label: 'Register'
      },
      controllerAs: 'rc'
    })
    .state('resetpw', {
      url: '/resetpw',
      templateUrl: resetPwTemplateUrl,
      controller: 'ResetCtrl',
      ncyBreadcrumb: {
        label: 'Reset Password'
      },
      controllerAs: 'rpc'
    })
    .state('logout', {
      url: '/logout',
      ncyBreadcrumb: {
        label: 'Logout'
      },
      resolve: {
        "logout": function($meteor, $state) {
          return $meteor.logout().then(function(){
            $state.go('home');
          }, function(err){
            console.log('logout error - ', err);
          });
        }
      }
    });
  // SHOULD GO TO 404
  $urlRouterProvider.otherwise("/");
};
