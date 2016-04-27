import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Home from '../components/Home.jsx';

const depsMapper = (context, actions) => ({
  context: () => context
});

export const composer = ({context}, onData) => {
  const {Meteor, FlowRouter, Collections} = context();

  const subThings = Meteor.subscribe('things');

  if (subThings.ready()) {
    const things = Collections.Things.find().fetch();
    const users = Meteor.users.find().fetch();

    onData(null, {things, users});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Home);
