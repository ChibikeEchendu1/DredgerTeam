import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import TasksHomeManagerView from '../components/TasksHomeManagerView';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
class TasksHomeManager extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <TasksHomeManagerView navigation={navigation} />
      </Provider>
    );
  }
}

export default TasksHomeManager;
