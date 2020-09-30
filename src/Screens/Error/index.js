import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

export default class index extends Component {
  retry = () => {
    this.props.navigation.navigate('Main');
  };
  render() {
    return (
      <View>
        <Text> Something went wrong </Text>
        <Button title="Retry" onPress={this.retry} />
      </View>
    );
  }
}
