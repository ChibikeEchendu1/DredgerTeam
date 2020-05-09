import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import MachineHomeGeneralView from '../components/MachineHomeGeneralView';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
import {VARIABLES} from '../utils/Variables';
import Icon from 'react-native-vector-icons/FontAwesome';

class MachineHomeGeneral extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <MachineHomeGeneralView navigation={navigation} />
      </Provider>
    );
  }
}

export default MachineHomeGeneral;
