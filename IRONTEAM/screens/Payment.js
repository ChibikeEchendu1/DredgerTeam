import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import PaymentView from '../components/PaymentView';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EmailError: '',
      PasswordError: '',
      value: '',
      isLoading: false,
    };
  }
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <PaymentView navigation={navigation} />
      </Provider>
    );
  }
}

export default Payment;
