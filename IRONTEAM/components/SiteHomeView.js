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
  FetchInfoSite,
  CodeChanged,
  NameChanged,
  emailChanged,
  SetRates,
  PasswordChanged,
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
class SiteHomeView extends Component {
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
    this.props.FetchInfoSite(this.state.Prospect);
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
        <View>
          <BlinkingText
            color={this.props.site.DayON ? 'red' : 'black'}
            text="Today"
          />
          <Button
            onPress={this.onButtonPress.bind(this)}
            title={this.props.site.DayON ? 'End Day' : 'Start Day'}
            type="outline"
            raised
            containerStyle={{
              marginTop: 5,
              alignSelf: 'center',
              width: '50%',
            }}
            titleStyle={{color: 'white'}}
            buttonStyle={{
              backgroundColor: VARIABLES.Color,
              borderColor: VARIABLES.Color,
              width: '100%',
            }}
          />
        </View>
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
          <NavigationEvents
            onDidFocus={() => {
              this.props.FetchInfoSite(this.state.Prospect);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('SiteInfo', {
                Prospect: this.state.Prospect,
                sites: this.state.sites,
              });
            }}
            style={{
              height: '20%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-evenly',
            }}>
            <Card
              containerStyle={{
                width: '90%',
                display: 'flex',
                flexDirection: 'column',
              }}>
              <View>
                <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
                  Site Address: {this.state.Prospect.SiteAddress}
                </Text>

                <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
                  {this.state.Prospect.SiteName}
                </Text>
              </View>
              <Icon
                style={{alignSelf: 'flex-end'}}
                name="chevron-right"
                size={20}
                color="black"
              />
            </Card>
          </TouchableOpacity>
          <View
            style={{
              height: '70%',
              display: 'flex',
              flexDirection: 'column',
              marginTop: 20,
              justifyContent: 'space-evenly',
            }}>
            <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
              Machines
            </Text>
            {this.renderList()}
            <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>Staff</Text>
            {this.renderList2()}
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.auth.name,
    tot: state.auth.tot,
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
  };
};

export default connect(
  mapStateToProps,
  {
    RequestBA,
    FetchInfoSite,
    CodeChanged,
    NameChanged,
    emailChanged,
    SetRates,
    PasswordChanged,
  },
)(SiteHomeView);
