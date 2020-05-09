/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {VARIABLES} from '../utils/Variables';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FetchCommentsBOSS, NameChanged} from '../actions';
import {connect} from 'react-redux';
import {Input, Button} from 'react-native-elements';

import Normalize from '../utils/Normalize';
import AsyncStorage from '@react-native-community/async-storage';
import {TabViewExample} from './TabWork';
import RNPickerSelect from 'react-native-picker-select';
const placeholder = {
  label: 'Select a Product...',
  value: null,
  color: '#9EA0A4',
};
const SCREENWIDTH = Dimensions.get('window').width;

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EmailError: '',
      PasswordError: '',
      Profiles: {Partner: []},
      isLoading: false,
    };
  }

  componentDidMount() {
    //componentDidMount
    this.props.FetchCommentsBOSS();
  }
  componentWillFocus() {
    //componentDidMount
    this.props.FetchCommentsBOSS();
  }

  getProfiles() {
    return this.state.Profiles.Partner;
  }

  renderRefreshControl() {
    this.setState({isLoading: true});
  }

  onNameC(text) {
    this.props.NameChanged(text);
  }

  render() {
    return (
      <View style={{height: '100%'}}>
        <Input
          placeholder="...Search Name"
          leftIcon={<Icon name="search" size={20} color={VARIABLES.Color} />}
          containerStyle={{width: '80%', marginTop: 5, marginBottom: '2%'}}
          value={this.props.name}
          onChangeText={this.onNameC.bind(this)}
          errorStyle={{color: 'red', marginLeft: '5%'}}
          inputStyle={{marginLeft: 5}}
          errorMessage={this.props.NameError}
          inputContainerStyle={{width: '100%'}}
        />
        <TabViewExample
          Loader={this.props.Loader}
          Items={this.props.Comments.Items.filter(items => {
            return (
              items.Comment.toLowerCase().indexOf(
                this.props.name.toLowerCase(),
              ) !== -1
            );
          })}
          requesr={this.props.Comments.requesr.filter(items => {
            return (
              items.Item.toLowerCase().indexOf(
                this.props.name.toLowerCase(),
              ) !== -1
            );
          })}
          bug={this.props.Comments.bug.filter(items => {
            return (
              items.Date.toLowerCase().indexOf(
                this.props.name.toLowerCase(),
              ) !== -1
            );
          })}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    width: '90%',
    borderColor: 'gray',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    width: '90%',
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
const mapStateToProps = state => {
  return {
    items: state.auth.items,
    Loader: state.auth.Loader,
    Comments: state.auth.Comments,
    name: state.auth.name,
  };
};

export default connect(
  mapStateToProps,
  {FetchCommentsBOSS, NameChanged},
)(Comments);
