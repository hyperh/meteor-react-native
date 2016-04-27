import React, {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Button from './button';
import ddpClient from './ddp';

export default React.createClass({
  getInitialState() {
    return {
      connected: false,
      things: {}
    };
  },

  componentDidMount() {
    ddpClient.connect((err, wasReconnect) => {
      let connected = true;
      if (err) { connected = false; }

      this.setState({ connected });
      this.makeSubscription();
      this.observeThings();
    });
  },

  makeSubscription() {
    console.log('makeSubscription');
    ddpClient.subscribe('things', [], () => {
      console.log('subscribe done!');
      console.log(ddpClient);
      this.setState({things: ddpClient.collections.things});
    });
  },

  observeThings() {
    let observer = ddpClient.observe('things');
    observer.added = (id) => {
      console.log('----observer.added----');
      console.log(ddpClient);
      console.log(id);
      this.setState({things: ddpClient.collections.things});
    };
    observer.changed = (id, oldFields, clearedFields, newFields) => {
      console.log('----observer.changed----');
      console.log(ddpClient);
      console.log(id);
      console.log(oldFields); // If a new field set, new field will be undef here
      console.log(clearedFields); // Fields removed by unset
      console.log(newFields);
      this.setState({things: ddpClient.collections.things});
    };
    observer.removed = (id, oldValue) => {
      console.log('----observer.removed----');
      console.log(ddpClient);
      console.log(id);
      console.log(oldValue);
      this.setState({things: ddpClient.collections.things});
    };
  },

  handleIncrement() {
    console.log('inc');
    ddpClient.call('things.add');
  },

  handleDecrement() {
    console.log('dec');
    ddpClient.call('things.remove');
  },

  handleUpdate() {
    console.log('update');
    ddpClient.call('things.update');
  },

  render() {
    let count = Object.keys(this.state.things).length;
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text>Posts: {count}</Text>
          <Button text="Increment" onPress={this.handleIncrement}/>
          <Button text="Decrement" onPress={this.handleDecrement}/>
          <Button text="Update" onPress={this.handleUpdate}/>
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  center: {
    alignItems: 'center'
  }
});
