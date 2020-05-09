import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {loginUserGoogle} from '../actions';
import {connect} from 'react-redux';
import {VARIABLES} from '../utils/Variables';

import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {namegoogle: '', emailgoogle: ''};
  }
  //state object

  facebooklog = () => {
    console.log(this.state.namefb);
  };

  googlelog = () => {
    console.log(this.state.namegoogle);
  };

  render() {
    return (
      <SafeAreaView style={styles.viewStyle}>
        <View
          style={{
            marginRight: 20,
            display: 'flex',
            flexDirection: 'row',
          }}>
          {this.props.Profile.Type != 0 ? (
            <View
              style={{
                marginRight: 10,
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Icon
                name="user-secret"
                size={25}
                color={'white'}
                style={{marginRight: 10}}
              />
            </View>
          ) : null}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <Icon color={'white'} size={25} name={'cogs'} />
          </View>
        </View>
        <View>
          <Text style={{color: VARIABLES.Color, fontSize: 16}}>PROFILE</Text>
        </View>

        <View
          style={{
            marginRight: 20,
            display: 'flex',
            flexDirection: 'row',
          }}>
          {this.props.Profile.Type != 0 ? (
            <TouchableOpacity
              style={{
                marginRight: 10,
                display: 'flex',
                flexDirection: 'row',
              }}
              onPress={() => {
                this.props.navigation.navigate('Boss');
              }}>
              <Icon
                name="user-secret"
                size={25}
                color={VARIABLES.Color}
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
            onPress={() => {
              this.props.navigation.navigate('Settings');
            }}>
            <Icon color={VARIABLES.Color} size={25} name={'cogs'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    opacity: 0.9,
    //borderWidth:5,
    //flex:1,
    //marginBottom:20,
    top: 0,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '7%',
    paddingBottom: 10,
    borderBottomColor: '#D5D5D6',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => {
  return {
    Loader: state.auth.Loader,
    Profile: state.auth.Profile,
  };
};

export default connect(
  mapStateToProps,
  {loginUserGoogle},
)(Header);
