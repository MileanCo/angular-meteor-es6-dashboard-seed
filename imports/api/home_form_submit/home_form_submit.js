import { Mongo } from 'meteor/mongo';
// can only import or 'use' 'export' things from externally
export const HomeFormSubmit = new Mongo.Collection('home_form_submit');
