import {DashboardCtrl} from "./controllers/DashboardCtrl.js";


export default angular
    .module('app.dashboard', [])
    .controller('DashboardCtrl', ['$scope', '$rootScope', '$meteor', '$location', '$mdToast', DashboardCtrl])
    ;
