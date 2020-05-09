import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import InspectionView from '../components/InspectionView';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class Inspection extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <InspectionView navigation={navigation} />
      </Provider>
    );
  }
}

export default Inspection;
