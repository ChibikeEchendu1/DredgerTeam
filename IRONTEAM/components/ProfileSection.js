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

class ProfileScreenView extends Component {
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
    AsyncStorage.getItem('loginToken')
      .then(value => {
        this.setState({_id: JSON.parse(value)});
        this.props.FetchProfile(JSON.parse(value));
        console.log(this.state._id, 'id');
      })
      .done();
  }

  componentWillMount() {
    //componentDidMount
    AsyncStorage.getItem('loginToken')
      .then(value => {
        this.setState({_id: JSON.parse(value)});
        this.props.FetchProfile(JSON.parse(value));
        console.log(this.state._id, 'id');
      })
      .done();
  }

  getProfiles() {
    return this.state.Profiles.Partner;
  }

  added() {
    if (this.props.Added) {
      this.props.navigation.navigate('AuthScreen');
    }
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
          marginLeft: '10%',
          height: Normalize(150),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View>
          <ProgressCircle
            percent={this.props.Profile.Persentage}
            radius={50}
            borderWidth={8}
            color={Colorlize(this.props.Profile.Persentage)}
            shadowColor="#999"
            bgColor="#fff">
            {this.props.Profile.ImagePath ? (
              <Image
                resizeMode="cover"
                style={{
                  width: Normalize(80),
                  height: Normalize(80),
                }}
                source={{
                  uri: VARIABLES.IP + '/' + this.props.Profile.ImagePath,
                }}
              />
            ) : (
              <Icon
                name="user-circle"
                color={VARIABLES.sparing}
                size={80}
                style={{alignSelf: 'center'}}
              />
            )}
          </ProgressCircle>
          <Text style={{marginTop: 10, marginLeft: 10}}>
            Name: {this.props.Profile.Name}
          </Text>
        </View>
        {this.added()}

        <TouchableOpacity
          onPress={() => {
            ImagePicker.openPicker({
              width: 300,
              height: 400,
              cropping: true,
            }).then(image => {
              this.props.AddPick(image);
            });
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginTop: 10,
              marginLeft: 10,
              fontSize: 20,
              color: Colorlize(this.props.Profile.Persentage),
            }}>
            {this.props.Profile.Persentage}%
          </Text>
          <Icon
            name="camera-retro"
            color={VARIABLES.sparing}
            size={20}
            style={{alignSelf: 'center', marginLeft: 10}}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={{borderBottomColor: VARIABLES.color}}>
        <NavigationEvents
          onDidFocus={() => {
            AsyncStorage.getItem('loginToken')
              .then(value => {
                this.setState({_id: JSON.parse(value)});
                this.props.FetchProfile(JSON.parse(value));
                console.log(this.state._id, 'id');
              })
              .done();
          }}
        />
        {this.renderList()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    Profile: state.auth.Profile,
    Loader: state.auth.Loader,
    Added: state.auth.Added,
  };
};

export default connect(
  mapStateToProps,
  {FetchProfile, AddPick},
)(ProfileScreenView);
