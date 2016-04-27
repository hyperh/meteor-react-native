import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Things } from '/lib/collections';

export default function () {
  Meteor.methods({
    'wipeAndInitialize'() {
      Things.remove({});
      for (let i = 0; i < 3; i++) {
        Meteor.call('things.add');
      }
    }
  });

  Meteor.methods({
    'things.add'() {
      console.log('things.add');
      const userId = this.userId;

      if (!userId) {
        throw new Meteor.Error('things.add', 'Must be logged in to add things.');
      }

      const count = Things.find().count();
      const email = Meteor.users.findOne(userId).emails[0].address;

      const id = Things.insert({
        text: `some text ${count + 1}`,
        createdAt: new Date(),
        userId,
        email,
      });

      return id;
    }
  });

  Meteor.methods({
    'things.remove'() {
      console.log('things.remove');

      const thing = getLastThing();
      Things.remove(thing._id);
    }
  });

  Meteor.methods({
    'things.update'() {
      console.log('things.update');

      const thing = getLastThing();
      Things.update(thing._id, {
        $set: { text: `updated at ${new Date()}`, newField: 'new field' }
      });

      Things.update(thing._id, {
        $unset: { newField: '' }
      });
    }
  });

  Meteor.methods({
    'users.add'({username, password}) {
      const id = Accounts.createUser({
        username,
        password
      });

      return id;
    }
  });
}

function getLastThing() {
  const options = {
    limit: 1,
    sort: [ [ 'createdAt', 'desc' ] ],
  };
  const things = Things.find({}, options).fetch();
  return things[0];
}
