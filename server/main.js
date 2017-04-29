// CALLABLE FROM CLIENT
import '/imports/api/users/methods.js';
import '/imports/api/home_form_submit/methods.js';
import '/imports/api/email.js';

// server-CODE
import '/imports/api/users/server/publications.js';

// Method that determines if in production or debug environment
Meteor.methods({
  isDebug() {
    return process.env.IS_DEBUG || true;
  }
});
