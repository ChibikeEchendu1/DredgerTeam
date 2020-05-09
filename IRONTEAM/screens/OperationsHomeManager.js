import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import OperationsHomeManagerView from '../components/OperationsHomeManagerView';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class OperationsHomeManager extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <OperationsHomeManagerView navigation={navigation} />
      </Provider>
    );
  }
}

export default OperationsHomeManager;
