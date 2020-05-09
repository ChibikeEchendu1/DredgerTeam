import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import EditMarketerView from '../components/EditMarketerView';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class EditMarketer extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <EditMarketerView navigation={navigation} />
      </Provider>
    );
  }
}

export default EditMarketer;
