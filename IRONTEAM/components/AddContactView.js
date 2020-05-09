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
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  NameChanged,
  AddressChanged,
  TypeChanged,
  emailChanged,
  annothernameChanged,
  AddProspect,
  AddContact,
} from '../actions';
import {connect} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';

const placeholder = {
  label: 'Select Position...',
  value: null,
  color: '#9EA0A4',
};
class AddContactView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EmailError: '',
      Prospect: this.props.navigation.state.params.Prospect,
      value: '',
      Error: '',
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
      this.props.navigation.navigate('ProfileScreen', {
        Prospect: this.state.Prospect,
      });
    }
  }

  onButtonPress() {
    const {email, name, type} = this.props;
    const {value, Prospect} = this.state;
    const _id = this.state.Prospect._id;
    if (name == '' || type == '' || value == '' || value == null) {
      this.setState({Error: 'Enter All Feilds'});
    } else {
      this.setState({Error: ''});
      this.props.AddContact({name, type, value, _id});
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
          title="Add"
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
          icon={<Icon name="plus" size={20} color="white" />}
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
          <Text style={{fontSize: 30, alignSelf: 'center'}}>New Contact</Text>
          <Input
            placeholder="Name"
            value={this.props.name}
            onChangeText={this.onEmailC.bind(this)}
            inputStyle={{}}
            errorStyle={{color: 'red'}}
            errorMessage={this.props.EmailError}
            inputContainerStyle={{width: '90%', alignSelf: 'center'}}
          />

          <Input
            value={this.props.type}
            inputStyle={{}}
            onChangeText={this.onTypeC.bind(this)}
            placeholder="Number"
            keyboardType="number-pad"
            errorStyle={{color: 'red'}}
            errorMessage={this.props.PasswordError}
            inputContainerStyle={{
              width: '90%',
              alignSelf: 'center',
              marginTop: 30,
            }}
          />

          <RNPickerSelect
            onValueChange={value => this.setState({value})}
            style={pickerSelectStyles}
            placeholder={placeholder}
            items={[
              {label: 'Owner/proprietor', value: 'Owner/proprietor'},
              {
                label: 'Principal/Head Manager',
                value: 'Principal/Head Manager',
              },
              {label: 'OtherAdmin', value: 'OtherAdmin'},
              {label: 'ICT Personel', value: 'ICT Personel'},
              {label: 'Secretary/Other', value: 'Secretary/Other'},
            ]}
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
    AddProspect,
    AddContact,
  },
)(AddContactView);
