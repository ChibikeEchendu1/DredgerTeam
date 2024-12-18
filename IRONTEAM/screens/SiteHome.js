import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import SiteHomeView from '../components/SiteHomeView';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class SiteHome extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <SiteHomeView navigation={navigation} />
      </Provider>
    );
  }
}

export default SiteHome;
