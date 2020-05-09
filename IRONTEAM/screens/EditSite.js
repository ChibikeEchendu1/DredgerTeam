import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import EditSiteView from '../components/EditSiteView';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class EditSite extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <EditSiteView navigation={navigation} />
      </Provider>
    );
  }
}

export default EditSite;
