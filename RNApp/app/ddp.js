import DDPClient from 'ddp-client';

let ddpClient = new DDPClient({host: '192.168.1.101'});

ddpClient.signUpWithEmail = (email, password, callback) => {
  const params = {
    email, password,
  };

  return ddpClient.call('createUser', [ params ], callback);
};

export default ddpClient;
