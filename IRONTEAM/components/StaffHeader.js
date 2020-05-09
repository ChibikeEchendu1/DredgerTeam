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
import AsyncStorage from '@react-native-community/async-storage';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNRestart from 'react-native-restart'; // Import package from node modules

class BossHeader extends Component {
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
            marginLeft: 20,
            display: 'flex',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              marginLeft: 10,
              display: 'flex',
              flexDirection: 'row',
            }}
            onPress={async () => {
              this.props.navigation.navigate('Payment');
            }}>
            <Icon
              name="credit-card"
              size={25}
              color={VARIABLES.Color}
              style={{marginLeft: 10}}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{color: VARIABLES.Color, fontSize: 16}}>
            {this.props.title}
          </Text>
        </View>

        <View
          style={{
            marginRight: 20,
            display: 'flex',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              marginRight: 10,
              display: 'flex',
              flexDirection: 'row',
            }}
            onPress={async () => {
              await AsyncStorage.removeItem('loginToken');
              await AsyncStorage.removeItem('CASToken');
              await AsyncStorage.removeItem('MANToken');
              RNRestart.Restart();
              this.props.navigation.navigate('AuthScreen');
            }}>
            <Icon
              name="sign-out"
              size={25}
              color={VARIABLES.Color}
              style={{marginRight: 10}}
            />
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
)(BossHeader);
