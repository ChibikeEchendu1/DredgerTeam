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
import HistotyList from './HistotyList';

import {NavigationEvents} from 'react-navigation';
import {Input, Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  RequestBA,
  FetchInfoSiteHistory,
  CodeChanged,
  NameChanged,
  emailChanged,
  SetRates,
  PasswordChanged,
  changeRates,
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
class SiteInfoView extends Component {
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
    this.props.FetchInfoSiteHistory(this.state.Prospect);
  }

  renderRow(item) {
    return (
      <HistotyList
        type={'MachineHome'}
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
        data={this.props.items}
        renderItem={({item}) => this.renderRow(item)}
        keyExtractor={(item, index) => index}
        onRefresh={() => this.renderRefreshControl()}
        refreshing={this.props.Loader}
        initialNumToRender={8}
      />
    );
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
            <View
              style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
              <Text style={{alignSelf: 'center', fontSize: 20}}>General</Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('EditSite', {
                    Prospect: this.state.Prospect, // end session, add operation cost.//old sessions
                    sites: this.state.sites,
                  })
                }
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="edit"
                  color={VARIABLES.sparing}
                  size={25}
                  style={{alignSelf: 'center', marginLeft: 10}}
                />
              </TouchableOpacity>
            </View>
            <Text style={{display: 'flex', fontSize: 15}}>
              All Time: Income ({this.state.Prospect.HereComesTheMoney}) Expense
              ({this.state.Prospect.HereComesTheExpense}){' '}
            </Text>
            <Text style={{display: 'flex', fontSize: 15}}>
              Session: Income ({this.state.Prospect.salesSession}) Expense (
              {this.state.Prospect.EstimateMoneyTotal}){' '}
            </Text>
            <Text>
              Total Dredging Time: {Math.round(this.state.Prospect.Hours / 60)}{' '}
              hrs{' '}
              {this.state.Prospect.Hours -
                Math.floor(this.state.Prospect.Hours / 60) * 60}{' '}
              mins
            </Text>
            <Text style={{display: 'flex', fontSize: 15, marginTop: 9}}>
              Current Operating Money: {this.state.Prospect.OperatingMoney}{' '}
            </Text>

            <Text style={{display: 'flex', fontSize: 15}}>
              Last Inspection: {this.state.Prospect.LastInspection}{' '}
            </Text>
            <Text style={{display: 'flex', fontSize: 15, color: 'red'}}>
              Funds Request: {this.state.Prospect.ExpenseRequest}{' '}
            </Text>
            <Text style={{display: 'flex', fontSize: 15, color: 'red'}}>
              Reason: {this.state.Prospect.ExpenseReason}{' '}
            </Text>
          </Card>

          <Card>
            <BlinkingText color="red" text="TODAY" />
            <Text style={{display: 'flex', fontSize: 15}}>
              Trucks Sold: 5Ton ({this.state.Prospect.fiveTtally}) (
              {this.state.Prospect.fiveTMoney})
            </Text>
            <Text style={{display: 'flex', fontSize: 15}}>
              Trucks Sold: 10Ton ({this.state.Prospect.tenTtally}) (
              {this.state.Prospect.tenTMoney})
            </Text>
            <Text style={{display: 'flex', fontSize: 15}}>
              Trucks Sold: 15Ton ({this.state.Prospect.fifteenTtally}) (
              {this.state.Prospect.fifteenTMoney})
            </Text>
            <Text style={{display: 'flex', fontSize: 15}}>
              Trucks Sold: 30Ton ({this.state.Prospect.thirtyTtally}) (
              {this.state.Prospect.thirtyTMoney})
            </Text>
            <Text style={{display: 'flex', fontSize: 15}}>
              Trucks Sold: Total ({this.state.Prospect.sales_tallyToday}) (
              {this.state.Prospect.salesToday})
            </Text>
          </Card>
          <Text style={{display: 'flex', fontSize: 15, alignSelf: 'center'}}>
            Past Sessions
          </Text>
          {this.renderList()}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.auth.name,
    items: state.auth.items,
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
  };
};

export default connect(
  mapStateToProps,
  {
    RequestBA,
    FetchInfoSiteHistory,
    CodeChanged,
    NameChanged,
    emailChanged,
    SetRates,
    PasswordChanged,
    changeRates,
  },
)(SiteInfoView);
