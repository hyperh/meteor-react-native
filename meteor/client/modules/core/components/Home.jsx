import React from 'react';

const Home = ({things, users}) => (
  <div id="main-page">
    Hello World
    <div>
      <h2>Things</h2>
      {things.map(thing => <div>{thing._id} {thing.text} {thing.userId}</div>)}
    </div>
    <div>
      <h2>Users</h2>
      {users.map(user => <div>{user._id} {user.username}</div>)}
    </div>
  </div>
);

export default Home;
