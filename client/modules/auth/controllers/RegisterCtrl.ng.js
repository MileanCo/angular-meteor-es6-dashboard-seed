import { Meteor } from 'meteor/meteor';
import { Accounts } from "meteor/accounts-base";


export function RegisterCtrl ($meteor, $state) {
  var vm = this;

  vm.credentials = {
    email: '',
    password: '',
    profile: {
      first_name: '',
      last_name: '',
    },
  };

  vm.error = '';

  vm.register = function () {
    /**
    Accounts.validateNewUser((user) => {
      new SimpleSchema({
        _id: { type: String },
        emails: { type: Array },
        'emails.$': { type: Object },
        'emails.$.address': { type: String },
        'emails.$.verified': { type: Boolean },
        createdAt: { type: Date },
        services: { type: Object, blackbox: true }
      }).validate(user);
      // Return true to allow user creation to proceed
      return true;
    });
    */

    // TODO : REPLACE WITH REGULAR ACCOUNTS.*
    Accounts.createUser(vm.credentials, function(err, result) {
      if (err) {
        vm.error = 'Registration error - ' + err;
      } else {
        $state.go('dashboard');
      }
    });
  };
};
