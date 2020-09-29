import React, {Fragment} from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// screens
import Main from '../Screens/Main';
import ErrorScreen from '../Screens/Error';
// APP Navigator

const AppNavigator = createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: {
        headerMode: 'none',
        gesturesEnabled: false,
      },
    },
    ErrorScreen: {
      screen: ErrorScreen,
      navigationOptions: {
        headerMode: 'none',
        gesturesEnabled: false,
      },
    },
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none',
  },
);
const MainRoute = createAppContainer(AppNavigator);

export default MainRoute;
