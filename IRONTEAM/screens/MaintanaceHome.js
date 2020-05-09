import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import MaintanaceHomeView from '../components/MaintanaceHomeView';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class MaintanaceHome extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <MaintanaceHomeView navigation={navigation} />
      </Provider>
    );
  }
}

export default MaintanaceHome;
