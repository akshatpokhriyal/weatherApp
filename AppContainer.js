import React, {Component, Fragment} from 'react';

import {connect} from 'react-redux';
import MainRoute from './src/Routes';
import NavigationService from './src/Providers/navigationService';

export default class AppContainer extends Component {
  render() {
    return (
      <Fragment>
        <MainRoute
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Fragment>
    );
  }
}
