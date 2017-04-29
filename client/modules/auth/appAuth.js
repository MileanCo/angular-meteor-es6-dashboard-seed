import angular from 'angular';
// Import function from file
import {LoginCtrl}    from './controllers/LoginCtrl.ng.js';
import {RegisterCtrl} from './controllers/RegisterCtrl.ng.js';
import {ResetCtrl}    from './controllers/ResetCtrl.ng.js';

export default angular
    .module('app.auth', [])
      .controller('LoginCtrl',    ['$state', LoginCtrl])
      .controller('RegisterCtrl', ['$meteor', '$state', RegisterCtrl])
      .controller('ResetCtrl',    ['$meteor', '$state', ResetCtrl])
      ;
