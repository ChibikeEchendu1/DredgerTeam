import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import EditMachineView from '../components/EditMachineView';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class EditMachine extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <EditMachineView navigation={navigation} />
      </Provider>
    );
  }
}

export default EditMachine;
