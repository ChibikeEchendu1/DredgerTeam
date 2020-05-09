import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import AddContactView from '../components/AddContactView';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class AddContact extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <AddContactView navigation={navigation} />
      </Provider>
    );
  }
}

export default AddContact;
