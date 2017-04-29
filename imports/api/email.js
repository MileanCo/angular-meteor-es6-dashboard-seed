import { Email } from 'meteor/email';
import { check } from 'meteor/check';

// Server: Define a method that the client can call.
Meteor.methods({
  sendEmail(to, from, subject, html) {
    // Make sure that all arguments are strings.
    check([to, from, subject, html], [String]);
    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    this.unblock();

    var options = {
      'from': from,
      'to': to,
      'subject':subject,
      'html': html,
    };

    // Email.send only works on the server
    Email.send(options);
  }
});
