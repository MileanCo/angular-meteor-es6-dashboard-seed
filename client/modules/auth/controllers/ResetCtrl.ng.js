//import angular from 'angular';
//export function controller("ResetCtrl", ['$meteor', '$state',
export function ResetCtrl ($meteor, $state) {
  var vm = this;

  vm.credentials = {
    email: ''
  };

  vm.error = '';

  vm.reset = function () {
    Accounts.forgotPassword(vm.credentials, function (err, result) {
      if (err) {
        vm.error = 'Error sending forgot password email - ' + err;
      } else {
        $state.go('home');
      }
    });
  };
};
