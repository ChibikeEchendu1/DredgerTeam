import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import CashierHomeView from '../components/CashierHomeView';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class CashierHome extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <CashierHomeView navigation={navigation} />
      </Provider>
    );
  }
}

export default CashierHome;
