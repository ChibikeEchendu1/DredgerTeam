import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import MeetingView from '../components/MeetingView';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class Meeting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EmailError: '',
      PasswordError: '',
      value: '',
      isLoading: false,
      Type: this.props.navigation.state.params.type,

      Prospect: this.props.navigation.state.params.Prospect,
    };
  }
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <MeetingView Type={this.state.Type} navigation={navigation} />
      </Provider>
    );
  }
}

export default Meeting;
