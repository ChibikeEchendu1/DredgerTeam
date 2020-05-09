import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import CommentsBoss from '../components/CommentsBoss';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class CommentsScreenBoss extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EmailError: '',
      PasswordError: '',
      value: '',
      isLoading: false,
    };
  }
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <CommentsBoss navigation={navigation} />
      </Provider>
    );
  }
}

export default CommentsScreenBoss;
