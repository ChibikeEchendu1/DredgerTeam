import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  emailChanged,
  PasswordChanged,
  NameChanged,
  SignUpUser,
} from '../actions';
import {VARIABLES} from '../utils/Variables';

import {connect} from 'react-redux';
class SignOutScreenView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NameError: '',
      EmailError: '',
      PasswordError: '',
    };
  }

  onEmailC(text) {
    this.props.emailChanged(text);
  }

  Login() {
    if (this.props.logedinBoss) {
      this.props.navigation.navigate('Boss');
    }
  }

  renderButton() {
    if (this.props.Loader) {
      return (
        <ActivityIndicator
          style={{marginTop: 10}}
          color="#F44336"
          size={'small'}
        />
      ); //
    } else {
      return (
        <Button
          onPress={this.onButtonPress.bind(this)}
          title="SignUp"
          type="outline"
          raised
          containerStyle={{marginTop: 30, alignSelf: 'center', width: '50%'}}
          titleStyle={{color: 'white'}}
          buttonStyle={{
            backgroundColor: VARIABLES.Color,
            borderColor: VARIABLES.Color,
            width: '100%',
          }}
        />
      );
    }
  }

  onPasswordC(text) {
    this.props.PasswordChanged(text);
  }

  onNameC(text) {
    this.props.NameChanged(text);
  }

  onButtonPress() {
    const {email, password} = this.props;
    this.props.SignUpUser({email, password});
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
          <View
            style={{
              height: '15%',
              margin: 20,
              width: '80%',
              alignSelf: 'center',
            }}>
            <Image
              resizeMode="contain"
              style={{width: '100%', alignSelf: 'center', height: '100%'}}
              source={require('../images/AAA.png')}
            />
          </View>

          <Input
            placeholder="Email"
            onChangeText={this.onEmailC.bind(this)}
            value={this.props.email}
            inputStyle={{marginLeft: 7}}
            errorStyle={{color: 'red', marginLeft: '5%'}}
            errorMessage={this.props.EmailError}
            inputContainerStyle={{
              width: '90%',
              alignSelf: 'center',
              marginTop: 30,
            }}
          />

          <Input
            value={this.props.password}
            inputStyle={{marginLeft: 7}}
            onChangeText={this.onPasswordC.bind(this)}
            placeholder="Password"
            secureTextEntry
            errorStyle={{color: 'red', marginLeft: '5%'}}
            errorMessage={this.props.PasswordError}
            inputContainerStyle={{
              width: '90%',
              alignSelf: 'center',
              marginTop: 30,
            }}
          />

          {this.renderButton()}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AuthScreen')}
            style={{alignItems: 'center'}}>
            <Text style={{marginTop: 30}}>
              I Know i am not meant to be here{' '}
              <Text style={{color: '#FA2700'}}>Login</Text>{' '}
            </Text>
          </TouchableOpacity>
          {this.Login()}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    name: state.auth.name,
    NameError: state.auth.NameError,
    EmailError: state.auth.EmailError,
    PasswordError: state.auth.PasswordError,
    Loader: state.auth.Loader,
    logedinBoss: state.auth.logedinBoss,
  };
};

export default connect(
  mapStateToProps,
  {emailChanged, PasswordChanged, NameChanged, SignUpUser},
)(SignOutScreenView);
