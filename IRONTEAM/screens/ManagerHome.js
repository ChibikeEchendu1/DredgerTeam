import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import ManagerHomeView from '../components/ManagerHomeView';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class ManagerHome extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <ManagerHomeView navigation={navigation} />
      </Provider>
    );
  }
}

export default ManagerHome;
