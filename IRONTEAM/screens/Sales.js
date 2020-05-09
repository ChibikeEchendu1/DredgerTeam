import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import SalesView from '../components/SalesView';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class Sales extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <SalesView navigation={navigation} />
      </Provider>
    );
  }
}

export default Sales;
