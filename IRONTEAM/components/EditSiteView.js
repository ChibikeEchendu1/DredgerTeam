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
  FlatList,
  Dimensions,
} from 'react-native';
import Modal, {
  ModalFooter,
  ModalButton,
  ModalContent,
  SlideAnimation,
} from 'react-native-modals';
import {VARIABLES} from '../utils/Variables';
import StaffMachineList from './StaffMachineList';

import {NavigationEvents} from 'react-navigation';
import {Input, Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  RequestBA,
  FetchInfoSiteBalance,
  CodeChanged,
  NameChanged,
  emailChanged,
  SetRates,
  PasswordChanged,
  changeRates,
  AddBa,
  finishSession,
} from '../actions';
import {connect} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import Colorlize from '../utils/Colorlize';
import Normalize from '../utils/Normalize';
import AsyncStorage from '@react-native-community/async-storage';
import BlinkingText from './BlinkingText';
const SCREENWIDTH = Dimensions.get('window').width;

const barWidth = Dimensions.get('screen').width - 40;
const placeholder = {
  label: 'Select a Product...',
  value: null,
  color: '#9EA0A4',
};
class EditSiteView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EmailError: '',
      PasswordError: '',
      value: '',
      isLoading: false,
      visible: false,
      visible2: false,
      Prospect: this.props.navigation.state.params.Prospect,
      sites: this.props.navigation.state.params.sites,
    };
  }

  async componentDidMount() {
    this.props.FetchInfoSiteBalance(this.state.Prospect);
  }

  renderRow(item) {
    return (
      <StaffMachineList
        type={'MachineHome'}
        navigation={this.props.navigation}
        sites={this.props.sites}
        item={item}
      />
    );
  }

  renderRow2(item) {
    return (
      <StaffMachineList
        type={'MarketerHome'}
        navigation={this.props.navigation}
        sites={this.props.sites}
        item={item}
      />
    );
  }

  renderRefreshControl() {
    this.setState({isLoading: true});
  }
  onNameC(text) {
    this.props.NameChanged(text);
  }

  onButtonPress() {
    // const {password} = this.props;
    //this.props.loginUser({password});
    this.props.navigation.navigate('Inspection');
  }

  onButtonPress2() {
    const {password} = this.props;
    //this.props.loginUser({password});
  }

  onButtonPress3() {
    const {password} = this.props;
    //this.props.loginUser({password});
  }

  renderList() {
    if (this.props.Loader) {
      return null; //
    }
    return (
      <FlatList
        style={{flex: 1}}
        data={this.props.sitesinfo.machines}
        renderItem={({item}) => this.renderRow(item)}
        keyExtractor={(item, index) => index}
        onRefresh={() => this.renderRefreshControl()}
        refreshing={this.props.Loader}
        initialNumToRender={8}
      />
    );
  }

  renderList2() {
    if (this.props.Loader) {
      return (
        <ActivityIndicator
          style={{marginTop: 10, alignSelf: 'center'}}
          color={VARIABLES.Color}
          size={'large'}
        />
      ); //
    }
    return (
      <FlatList
        style={{flex: 1}}
        data={this.props.sitesinfo.staff}
        renderItem={({item}) => this.renderRow2(item)}
        keyExtractor={(item, index) => index}
        onRefresh={() => this.renderRefreshControl()}
        refreshing={this.props.Loader}
        initialNumToRender={8}
      />
    );
  }

  renderButton() {
    if (this.props.index2 == 1) {
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
          onPress={() =>
            this.props.changeRates(this.state.Prospect, this.props.password)
          }
          title="Change"
          type="outline"
          raised
          containerStyle={{
            marginTop: 5,
            width: '50%',
          }}
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

  renderButton2() {
    if (this.props.index2 == 2) {
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
          onPress={() => this.props.finishSession(this.state.Prospect)}
          title="FINISH"
          type="outline"
          raised
          containerStyle={{
            marginTop: 5,
            width: '50%',
          }}
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

  renderButton3() {
    if (this.props.index2 == 3) {
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
          onPress={() => this.props.AddBa(this.state.Prospect, this.props.Code)}
          title="Add"
          type="outline"
          raised
          containerStyle={{
            marginTop: 5,
            width: '50%',
          }}
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
  onCodeC(text) {
    this.props.CodeChanged(text);
  }
  renderText(text) {
    if (this.props.Loader) {
      return (
        <ActivityIndicator
          style={{marginTop: 10, alignSelf: 'center'}}
          color={VARIABLES.Color}
          size={'small'}
        />
      ); //
    } else {
      return <Text style={{marginTop: 5}}>{text}</Text>;
    }
  }

  onEmailC(text) {
    this.props.emailChanged(text);
  }

  onPC(text) {
    this.props.PasswordChanged(text);
  }

  onPasswordC(text) {
    this.props.PasswordChanged(text);
  }

  added() {
    if (this.props.Added) {
      this.props.navigation.navigate('SiteHome', {
        sites: this.state.sites,
        Prospect: this.state.Prospect,
      });
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Card>
            <Text style={{alignSelf: 'center', fontSize: 20}}>
              Finish Session{' '}
            </Text>
            {this.renderButton2()}
          </Card>

          <Card>
            <Text style={{alignSelf: 'center', fontSize: 20, marginTop: 9}}>
              Add Operating Money{' '}
            </Text>
            <Text style={{display: 'flex', fontSize: 15, color: 'red'}}>
              Funds Request: {this.props.balance.Funds}{' '}
            </Text>
            <Text style={{display: 'flex', fontSize: 15, marginTop: 9}}>
              Current Operating Money: {this.props.balance.OperatingMoney}{' '}
            </Text>
            <Text style={{display: 'flex', fontSize: 15, marginTop: 9}}>
              Current Expense: {this.state.Prospect.expenseTotal}{' '}
            </Text>

            <Input
              value={this.props.Code}
              inputStyle={{marginLeft: 7}}
              onChangeText={this.onCodeC.bind(this)}
              placeholder="Amount"
              keyboardType="number-pad"
              errorStyle={{color: 'red', marginLeft: '5%'}}
              errorMessage={this.state.PasswordError}
              inputContainerStyle={{
                width: '90%',
                marginTop: 4,
              }}
            />
            {this.renderButton3()}
          </Card>

          <Card>
            <Text style={{alignSelf: 'center', fontSize: 20}}>
              Change Staff Balance
            </Text>
            <Text style={{display: 'flex', fontSize: 15, marginTop: 9}}>
              Current Staff Balance: {this.props.balance.Balance}
              {'% '}
            </Text>
            <Input
              value={this.props.password}
              inputStyle={{marginLeft: 7}}
              onChangeText={this.onPasswordC.bind(this)}
              placeholder="New Balance"
              keyboardType="number-pad"
              errorStyle={{color: 'red', marginLeft: '5%'}}
              errorMessage={this.state.PasswordError}
              inputContainerStyle={{
                width: '90%',
                marginTop: 4,
              }}
            />
            {this.renderButton()}
            {this.added()}
          </Card>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.auth.name,
    Added: state.auth.Added,
    site: state.auth.site,
    Code: state.auth.Code,
    type: state.auth.type,
    sitesinfo: state.auth.sitesinfo,
    EmailError: state.auth.EmailError,
    PasswordError: state.auth.PasswordError,
    Loader: state.auth.Loader,
    logedin: state.auth.logedin,
    email: state.auth.email,
    password: state.auth.password,
    balance: state.auth.balance,
    index2: state.auth.index2,
  };
};

export default connect(
  mapStateToProps,
  {
    RequestBA,
    FetchInfoSiteBalance,
    CodeChanged,
    NameChanged,
    emailChanged,
    SetRates,
    PasswordChanged,
    changeRates,
    AddBa,
    finishSession,
  },
)(EditSiteView);
