import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import MachineHomeView from '../components/MachineHomeView';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
import {VARIABLES} from '../utils/Variables';
import Icon from 'react-native-vector-icons/FontAwesome';

class MachineHome extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <MachineHomeView navigation={navigation} />
      </Provider>
    );
  }
}

export default MachineHome;
