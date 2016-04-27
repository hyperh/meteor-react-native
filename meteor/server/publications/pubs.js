import { Meteor } from 'meteor/meteor';
import { Things } from '/lib/collections';

const selfFields = {
  username: 1
};

export default function () {
  const SELF = 'self';
  Meteor.publish(SELF, function () {
    if (!this.userId) {
      throw new Meteor.Error(SELF, 'Must be logged in to get self data.');
    }

    return Meteor.users.find(this.userId, {fields: selfFields});
  });

  Meteor.publish('users', function () {
    if (!this.userId) {
      throw new Meteor.Error('users', 'Must be logged in to get user data.');
    }

    return Meteor.users.find();
  });

  Meteor.publish('things', function () {
    // if (!this.userId) {
    //   throw new Meteor.Error('things', 'Must be logged in to get things.');
    // }

    return Things.find();
  });
}
