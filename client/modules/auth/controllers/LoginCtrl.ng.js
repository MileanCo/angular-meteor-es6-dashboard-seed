import { Meteor } from 'meteor/meteor';
import { Accounts } from "meteor/accounts-base";


export function LoginCtrl ($state) {
  var vm = this;

  vm.credentials = {
    email: '',
    password: ''
  };

  vm.error = '';

  // TODO : REPLACE WITH REGULAR ACCOUNTS.*
  vm.login = function () {
    Meteor.loginWithPassword(vm.credentials.email, vm.credentials.password, function (err, result )  {
        if (err) {
          vm.error = 'Login error - ' + err;
        } else {
          $state.go('dashboard');
        }
    });
  };
};
