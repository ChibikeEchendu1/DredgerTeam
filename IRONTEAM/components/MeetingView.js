/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import {VARIABLES} from '../utils/Variables';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  NameChanged,
  AddressChanged,
  TypeChanged,
  emailChanged,
  annothernameChanged,
  AddReport,
} from '../actions';
import {connect} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';

const placeholder = {
  label: 'Select a Product...',
  value: null,
  color: '#9EA0A4',
};
class MeetingView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EmailError: '',
      PasswordError: '',
      value: '',
      Error: '',
      Rating: 3,
      Prospect: this.props.navigation.state.params.Prospect,
    };
  }

  onEmailC(text) {
    this.props.NameChanged(text);
  }

  Login() {
    if (this.props.logedin) {
      this.props.navigation.navigate('Main');
    }
  }

  onPasswordC(text) {
    this.props.AddressChanged(text);
  }

  onnameC(text) {
    this.props.annothernameChanged(text);
  }

  onTypeC(text) {
    this.props.TypeChanged(text);
  }

  onSummeryC(text) {
    this.props.emailChanged(text);
  }

  added() {
    if (this.props.Added) {
      this.props.navigation.navigate('Searchprospect');
      this.props.navigation.navigate('ProfileScreen');
    }
  }

  onButtonPress() {
    const {email, name, tot, Type} = this.props;
    const {Rating} = this.state;
    const {_id} = this.state.Prospect;

    console.log(email, Rating, Type, _id, 'vals');

    if (email == '') {
      this.setState({Error: 'Enter All Feilds'});
    } else {
      this.setState({Error: ''});
      this.props.AddReport({email, Rating, _id, Type});
    }
  }

  renderButton() {
    if (this.props.Loader) {
      return (
        <ActivityIndicator
          style={{marginTop: 10, alignSelf: 'center'}}
          color={VARIABLES.Color}
          size={'large'}
        />
      ); //
    } else {
      return (
        <Button
          onPress={this.onButtonPress.bind(this)}
          title="Done"
          type="outline"
          raised
          containerStyle={{
            marginTop: 20,
            alignSelf: 'flex-end',
            marginRight: 20,
            width: '50%',
          }}
          titleStyle={{color: 'white', marginRight: 10}}
          buttonStyle={{
            backgroundColor: VARIABLES.Color,
            borderColor: VARIABLES.Color,
            width: '100%',
          }}
          icon={<Icon name="check-circle" size={20} color="white" />}
          iconRight
        />
      );
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
          <Text style={{fontSize: 30, alignSelf: 'center', marginBottom: 40}}>
            {this.props.Type}
          </Text>
          <AirbnbRating
            count={5}
            reviews={['Terrible', 'Meh', 'OK', 'Very Good', 'Unbelievable']}
            defaultRating={3}
            size={40}
            onFinishRating={Rating => {
              this.setState({Rating});
            }}
          />
          <Text style={{marginLeft: '5%', marginTop: 10, fontSize: 15}}>
            Report
          </Text>
          <TextInput
            style={{
              textAlignVertical: 'top',
              height: '20%',
              width: '90%',
              alignSelf: 'center',
              borderColor: 'gray',
              borderWidth: 1,
            }}
            multiline={true}
            numberOfLines={20}
            onChangeText={this.onSummeryC.bind(this)}
            value={this.props.email}
          />
          <Text style={{color: 'red', alignSelf: 'center'}}>
            {this.state.Error}
          </Text>
          {this.renderButton()}
          {this.added()}
        </SafeAreaView>
      </TouchableWithoutFeedback>
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
    alignSelf: 'center',
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const mapStateToProps = state => {
  return {
    name: state.auth.name,
    tot: state.auth.tot,
    type: state.auth.type,
    email: state.auth.email,
    Added: state.auth.Added,
    EmailError: state.auth.EmailError,
    PasswordError: state.auth.PasswordError,
    Loader: state.auth.Loader,
    logedin: state.auth.logedin,
  };
};

export default connect(
  mapStateToProps,
  {
    NameChanged,
    AddressChanged,
    TypeChanged,
    emailChanged,
    annothernameChanged,
    AddReport,
  },
)(MeetingView);
