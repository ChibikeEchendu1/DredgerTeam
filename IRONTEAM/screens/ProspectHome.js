import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import ProspectHomeView from '../components/ProspectHomeView';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class ProspectHome extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <ProspectHomeView navigation={navigation} />
      </Provider>
    );
  }
}

export default ProspectHome;
