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
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {VARIABLES} from '../utils/Variables';
import MyProspectList from './MyProspectList';

import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  NameChanged,
  AddressChanged,
  TypeChanged,
  emailChanged,
  annothernameChanged,
  AddProspect,
  ChangeScore,
  ChangeMax,
  Promote,
  Comment,
  TransferStaff,
  Fire,
} from '../actions';
import {connect} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import Colorlize from '../utils/Colorlize';
import Normalize from '../utils/Normalize';

const barWidth = Dimensions.get('screen').width - 40;
const placeholder = {
  label: 'Select a Option...',
  value: null,
  color: '#9EA0A4',
};

const placeholder2 = {
  label: 'Select a site...',
  value: 0,
  color: '#9EA0A4',
};
class EditMarketerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EmailError: '',
      Error: '',
      PasswordError: '',
      value: null,
      isLoading: false,
      Site: 0,

      Prospect: this.props.navigation.state.params.Profile,
      sites: this.props.navigation.state.params.sites,
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
      this.props.navigation.navigate('BossScreen');
    }
  }

  renderRow(item) {
    return <MyProspectList navigation={this.props.navigation} item={item} />;
  }

  renderRefreshControl() {
    this.setState({isLoading: true});
  }

  onButtonPress() {
    const {email, name, tot, type} = this.props;
    const {value, Site, sites} = this.state;
    const {_id} = this.state.Prospect;

    console.log(email, name, tot, type, value, 'vals');

    if (value == 0) {
      if (tot == '') {
        this.setState({Error: 'Enter All Feilds'});
      } else {
        this.setState({Error: ''});
        this.props.ChangeScore({tot, _id});
      }
    } else if (value == 1) {
      var send = sites[Site];
      this.props.TransferStaff({send, _id});
    } else if (value == 3) {
      if (tot == '') {
        this.setState({Error: 'Enter All Feilds'});
      } else {
        this.setState({Error: ''});
        this.props.Comment({tot, _id});
      }
    }
  }

  renderInput() {
    if (this.state.value == null) {
      return null;
    } else if (this.state.value == 0) {
      return (
        <Input
          placeholder="Edit Score"
          value={this.props.tot}
          onChangeText={this.onnameC.bind(this)}
          inputStyle={{}}
          keyboardType="number-pad"
          errorStyle={{color: 'red'}}
          errorMessage={this.props.EmailError}
          inputContainerStyle={{
            width: '40%',
            alignSelf: 'center',
            marginTop: 30,
          }}
        />
      );
    } else if (this.state.value == 1) {
      return (
        <RNPickerSelect
          onValueChange={value => this.setState({Site: value})}
          style={pickerSelectStyles}
          placeholder={placeholder2}
          items={this.state.sites.map(function(row, index) {
            // This function defines the "mapping behaviour". name and title
            // data from each "row" from your columns array is mapped to a
            // corresponding item in the new "options" array
            return {
              value: index,
              label: row.SiteName + ' ' + row.SiteAddress,
            };
          })}
        />
      );
    } else if (this.state.value == 3) {
      return (
        <Input
          placeholder="Comment"
          value={this.props.tot}
          onChangeText={this.onnameC.bind(this)}
          inputStyle={{}}
          errorStyle={{color: 'red'}}
          errorMessage={this.props.EmailError}
          inputContainerStyle={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 30,
          }}
        />
      );
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
            alignSelf: 'center',
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
    const {Name, Persentage} = this.state.Prospect;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
          <View
            style={{
              width: '90%',
              marginLeft: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: Normalize(30)}}>{Name}</Text>
            <Text style={{fontSize: Normalize(20)}}>Score:{Persentage}%</Text>
          </View>
          <RNPickerSelect
            onValueChange={value => this.setState({value})}
            style={pickerSelectStyles}
            placeholder={placeholder}
            items={[
              {label: 'Change Rating', value: 0},
              {label: 'Transfer', value: 1},
              {label: 'Comment', value: 3},
            ]}
          />

          {this.renderInput()}
          <Text style={{alignSelf: 'center', color: 'red'}}>
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
    width: '60%',
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
    width: '60%',
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
    ChangeScore,
    ChangeMax,
    Promote,
    Comment,
    TransferStaff,
    Fire,
  },
)(EditMarketerView);
