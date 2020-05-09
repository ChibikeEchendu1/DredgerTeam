import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import OperatorView from '../components/OperatorView';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
import {VARIABLES} from '../utils/Variables';
import Icon from 'react-native-vector-icons/FontAwesome';

class Operator extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <OperatorView navigation={navigation} />
      </Provider>
    );
  }
}

export default Operator;
