import {HomeCtrl} from "./controllers/HomeCtrl.js";
import 'angular-scroll';

export default angular
    .module('app.home', ['duScroll'])
    .controller('HomeCtrl', ['$scope', '$rootScope', '$mdConstant', '$mdDialog', '$mdToast', '$document', HomeCtrl])
    ;
