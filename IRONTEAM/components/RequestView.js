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
  AddRequest,
} from '../actions';
import {REQUEST} from '../utils/Request';

import {connect} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';

const placeholder = {
  label: 'Select Item...',
  value: null,
  color: '#9EA0A4',
};

const placeholder2 = {
  label: 'Select Product...',
  value: null,
  color: '#9EA0A4',
};
class RequestView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EmailError: '',
      value: '',
      item: '',
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
      this.props.navigation.navigate('UtilitesOPtiions');
      this.props.navigation.navigate('ProfileScreen');
    }
  }

  onButtonPress() {
    const {email, name, type, tot} = this.props;
    const {item} = this.state;
    if (name == '' || email == '' || type == '' || tot == '') {
      this.setState({Error: 'Enter All Feilds'});
    } else {
      this.setState({Error: ''});
      this.props.AddRequest({name, email, tot, type});
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
          icon={<Icon name="sticky-note" size={20} color="white" />}
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
          <Text style={{fontSize: 30, alignSelf: 'center', marginTop: 40}}>
            Expense
          </Text>

          <Input
            value={this.props.name}
            onChangeText={this.onEmailC.bind(this)}
            placeholder="Item"
            errorStyle={{color: 'red'}}
            errorMessage={this.props.PasswordError}
            inputContainerStyle={{
              width: '90%',
              alignSelf: 'center',
              marginBottom: 30,
            }}
          />
          <Input
            value={this.props.type}
            onChangeText={this.onTypeC.bind(this)}
            placeholder="Quantity"
            keyboardType="number-pad"
            errorStyle={{color: 'red'}}
            errorMessage={this.props.PasswordError}
            inputContainerStyle={{
              width: '90%',
              alignSelf: 'center',
              marginBottom: 30,
            }}
          />

          <Input
            value={this.props.tot}
            onChangeText={this.onnameC.bind(this)}
            placeholder="Price Per Unit"
            keyboardType="number-pad"
            errorStyle={{color: 'red'}}
            errorMessage={this.props.PasswordError}
            inputContainerStyle={{
              width: '90%',
              alignSelf: 'center',

              marginBottom: 30,
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
              paddingLeft: 10,
            }}
            placeholder="We bought this because"
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
    width: '80%',
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
    AddRequest,
  },
)(RequestView);