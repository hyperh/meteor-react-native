import DDPClient from 'ddp-client';
import { AsyncStorage } from 'react-native';

let ddpClient = new DDPClient({host: '192.168.1.101'});

ddpClient.signUpWithEmail = (email, password, callback) => {
  const params = {
    email, password,
  };

  return ddpClient.call('createUser', [ params ], callback);
};

ddpClient.onAuthResponse = (err, res) => {
  console.log('----onAuthResponse----');
  console.log(err);
  console.log(res);
  if (res) {
    let { id, token, tokenExpires } = res;

    AsyncStorage.setItem('userId', id.toString());
    AsyncStorage.setItem('loginToken', token.toString());
    AsyncStorage.setItem('loginTokenExpires', tokenExpires.toString());
  }
  else {
    AsyncStorage.multiRemove([ 'userId', 'loginToken', 'loginTokenExpires' ]);
  }
};

ddpClient.loginWithEmail = (email, password, callback) => {
  console.log('----ddpClient.loginWithEmail----');
  let params = {
    user: { email },
    password,
  };
  return ddpClient.call('login', [ params ], callback);
};

ddpClient.loginWithToken = (loginToken, callback) => {
  let params = { resume: loginToken };
  return ddpClient.call('login', [ params ], callback);
};

ddpClient.logout = callback => {
  console.log('----ddpClient.logout----');
  AsyncStorage.multiRemove([ 'userId', 'loginToken', 'loginTokenExpires' ])
  .then(res => {
    ddpClient.call('logout', [], callback);
  });
};

export default ddpClient;
