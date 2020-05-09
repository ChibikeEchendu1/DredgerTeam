import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import AddProspectView from '../components/AddProspectView';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class AddProspect extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <AddProspectView navigation={navigation} />
      </Provider>
    );
  }
}

export default AddProspect;
