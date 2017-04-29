import { Meteor } from 'meteor/meteor';
//import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import {HomeFormSubmit} from './home_form_submit.js';

// these methods are callable from client, but IMPORTED/run  on server??
Meteor.methods({
  'home_form_submit' (user_info) {
    // validate playlist
    if (!user_info.name) {
      throw new Meteor.Error(500, "Please add your name");
    }
    if (!user_info.email) {
      throw new Meteor.Error(500, "Please add your email!");
    }

    // Check fields are right type
    check (user_info.name, String);
    check (user_info.email, String);

    // TODO: CHECK IF THIS USER EXISTS

    HomeFormSubmit.insert(user_info,);
    console.log("user_info:");
    console.log(user_info) ;


    //var user_message = "Thanks for signing up, " + user_info.name + "! We will be in touch soon.";
    var user_message = `<h1>Hey there ${user_info.name}!</h1>
<p>Thank you for registering and welcome.<br`;


    // Client: Asynchronously send an email.
    Meteor.call(
      'sendEmail',
      user_info.email,
      'test@gmail.com',
      'Welcome to the site ' + user_info.name,
      user_message,
    );
    return true;
  }
});
