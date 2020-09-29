import React, {Component, Fragment} from 'react';
import {Text, View, YellowBox} from 'react-native';
import AppContainer from './AppContainer';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native';

export default class App extends Component {
  render() {
    return (
      // <NavigationContainer>

      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
