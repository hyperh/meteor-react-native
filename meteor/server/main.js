import publications from './publications';
import methods from './methods';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Things } from '/lib/collections';

methods();
publications();

const numUsers = Meteor.users.find().count();
if (numUsers === 0) {
  Accounts.createUser({
    username: 'test',
    password: '1'
  });
}

const numThings = Things.find().count();
if (numThings === 0) {
  Things.insert({
    text: `this is thing ${numThings}`
  });
}
