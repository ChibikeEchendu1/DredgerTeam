import React, {Component} from 'react';
import {
  View,
  Image,
  Animated,
  AsyncStorage,
  Text,
  SafeAreaView,
} from 'react-native';
import {logincheck} from '../actions';
import {connect} from 'react-redux';

class WelcomeScreenView extends Component {
  state = {
    fadeAnim: new Animated.Value(0),
    splash: '',
    move: '',
  };

  async componentDidMount() {
    Animated.timing(
      // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
      },
    ).start(() => {
      this.setState({fadeAnim: new Animated.Value(1)}, () => {
        Animated.timing(
          // Animate over time
          this.state.fadeAnim, // The animated value to drive
          {
            toValue: 0, // Animate to opacity: 1 (opaque)
            duration: 3000, // 2000ms
          },
        ).start(() => {
          setTimeout(() => {
            this.setState({splash: 'done'});
            this.setState({move: 'done'});
          }, 100);
        });
      });
    });

    this.props.logincheck();
  }

  onSlideComplete = () => {
    this.props.navigation.navigate('AuthScreen');
  };

  Login() {
    if (this.props.logedinBoss) {
      this.props.navigation.navigate('Boss');
    } else if (this.props.logedinCAS) {
      this.props.navigation.navigate('CAS');
    } else if (this.props.logedinMAN) {
      this.props.navigation.navigate('MAN');
    }
  }

  move() {
    if (this.props.new) {
      this.props.navigation.navigate('AuthScreen');
    }
  }

  Login2() {
    if (this.props.logedin) {
      this.props.navigation.navigate('Main');
    }
  }
  onSlideCompleteSign = () => {
    this.props.navigation.navigate('SignUpScreen');
  };
  /*   */

  renderButton() {
    let {fadeAnim} = this.state;

    return (
      <Animated.View
        style={{
          ...this.props.style,
          opacity: fadeAnim,
          backgroundColor: 'white', // Bind opacity to animated value
        }}>
        <SafeAreaView style={{display: 'flex', justifyContent: 'center'}}>
          <Image
            resizeMode="contain"
            style={{width: '100%', height: '80%'}}
            source={require('../images/AAA.png')}
          />
        </SafeAreaView>
      </Animated.View>
    );
  }

  render() {
    return [this.renderButton(), this.Login(), this.move(), this.Login2()];
  }
}

const mapStateToProps = state => {
  return {
    logedinBoss: state.auth.logedinBoss,
    logedinMAN: state.auth.logedinMAN,

    logedinCAS: state.auth.logedinCAS,

    logedin: state.auth.logedin,
    new: state.auth.new,
    password: state.auth.password,
  };
};

export default connect(
  mapStateToProps,
  {logincheck},
)(WelcomeScreenView);
