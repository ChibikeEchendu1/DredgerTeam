/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {VARIABLES} from '../utils/Variables';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FetchProfile, AddPick} from '../actions';
import {connect} from 'react-redux';
import Normalize from '../utils/Normalize';
import Colorlize from '../utils/Colorlize';

import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';
import ProgressCircle from 'react-native-progress-circle';
import ImagePicker from 'react-native-image-crop-picker';

const SCREENWIDTH = Dimensions.get('window').width;

class ProfileSectionMachineManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EmailError: '',
      PasswordError: '',
      Profiles: {Partner: []},
      isLoading: false,
    };
  }

  getProfiles() {
    return this.state.Profiles.Partner;
  }

  renderRefreshControl() {
    this.setState({isLoading: true});
  }
  renderList() {
    if (this.props.Loader) {
      return null; //
    }
    return (
      <View
        style={{
          //marginLeft: '10%',
          //height: Normalize(100),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View>
          <Text style={{marginTop: 10, marginLeft: 10}}>
            Name: {this.props.Profile.Name}
          </Text>

          <Text style={{marginLeft: 10}}>
            HireingCost: {this.props.Profile.HireingCost}
          </Text>
          <Text style={{marginLeft: 10}}>
            Operators: {this.props.Profile.Operators.join(', ')}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{borderBottomColor: VARIABLES.color}}>
        {this.renderList()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    Loader: state.auth.Loader,
  };
};

export default connect(
  mapStateToProps,
  {FetchProfile, AddPick},
)(ProfileSectionMachineManager);
