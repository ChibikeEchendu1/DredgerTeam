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
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {VARIABLES} from '../utils/Variables';
import MyContactList from './MyContactList';
import AsyncStorage from '@react-native-community/async-storage';
import {Input, Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Colorlize from '../utils/Colorlize';
import Normalize from '../utils/Normalize';

import {
  NameChanged,
  AddressChanged,
  TypeChanged,
  emailChanged,
  annothernameChanged,
  AddProspect,
  FetchInfo,
} from '../actions';
import {connect} from 'react-redux';
import StaffHeader from './StaffHeader';
import BlinkingText from './BlinkingText';

const barWidth = Dimensions.get('screen').width - 60;
const placeholder = {
  label: 'Select a Product...',
  value: null,
  color: '#9EA0A4',
};
class CashierHomeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EmailError: '',
      PasswordError: '',
      value: '',
      isLoading: false,
      Person: {},
      showText: true,
      day: [
        {Date: '7th january 2010', HoursTotal: 80, salesTally: 80},
        {Date: '7th january 2010', HoursTotal: 80, salesTally: 80},
        {Date: '7th january 2010', HoursTotal: 80, salesTally: 80},
        {Date: '7th january 2010', HoursTotal: 80, salesTally: 80},
        {Date: '7th january 2010', HoursTotal: 80, salesTally: 80},
        {Date: '7th january 2010', HoursTotal: 80, salesTally: 80},
        {Date: '7th january 2010', HoursTotal: 80, salesTally: 80},
        {Date: '7th january 2010', HoursTotal: 80, salesTally: 80},
        {Date: '7th january 2010', HoursTotal: 80, salesTally: 80},
      ],
    };
  }

  async componentDidMount() {
    var Person = await AsyncStorage.getItem('CASToken');
    Person = JSON.parse(Person);
    console.log(Person);
    this.setState({Person});
    this.props.FetchInfo(Person);
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

  renderPage() {
    if (this.props.Loader) {
      return (
        <ActivityIndicator
          style={{marginTop: 10, alignSelf: 'center'}}
          color={VARIABLES.Color}
          size={'large'}
        />
      );
    }
    return (
      <View>
        <Card>
          <BlinkingText color="red" text="TODAY" />

          <View>
            <Text
              style={{
                marginTop: 3,
                fontSize: Normalize(15),
                marginLeft: '4%',
              }}>
              DREDGING HOURS: {this.props.site.Hours || 0}hrs (
              {this.props.site.Hours / this.props.site.Day.length || 0}hrs /Day)
            </Text>
            <Text
              style={{
                fontSize: Normalize(15),
                marginLeft: '4%',
                marginTop: 3,
              }}>
              TRUCKS SOLD: {this.props.site.sales_talltotal || 0}
            </Text>
          </View>
        </Card>
        <Card>
          <Text
            style={{
              fontSize: Normalize(16),
              marginLeft: '4%',
              alignSelf: 'center',
            }}>
            CURRENT SESSION
          </Text>
          <View>
            <Text
              style={{
                marginTop: 3,
                fontSize: Normalize(15),
                marginLeft: '4%',
              }}>
              BALANCE:(₦{' '}
              {(this.props.site.salesSession * this.props.site.StaffBalance) /
                100 || 0}
              )
            </Text>
            <Text
              style={{
                marginTop: 3,
                fontSize: Normalize(15),
                marginLeft: '4%',
              }}>
              DREDGING HOURS: {this.props.site.Hours || 0}hrs (
              {this.props.site.Hours / this.props.site.Day.length || 0}hrs /Day)
            </Text>
            <Text
              style={{
                fontSize: Normalize(15),
                marginLeft: '4%',
                marginTop: 3,
              }}>
              TOTAL TRUCKS SOLD: {this.props.site.sales_talltotal || 0}
            </Text>
          </View>
        </Card>
      </View>
    );
  }
  added() {
    if (this.props.Added) {
      this.props.navigation.navigate('Searchprospect');
      this.props.navigation.navigate('ProfileScreen');
    }
  }

  renderList() {
    if (this.props.Loader) {
      return null; //
    }
    return (
      <FlatList
        style={{flex: 1}}
        data={this.props.site.Day.reverse()}
        renderItem={({item}) => this.renderRow(item)}
        keyExtractor={(item, index) => index}
        onRefresh={() => this.renderRefreshControl()}
        refreshing={this.props.Loader}
        initialNumToRender={8}
      />
    );
  }

  renderRow(item) {
    return <MyContactList navigation={this.props.navigation} item={item} />;
  }

  renderRefreshControl() {
    this.setState({isLoading: true});
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <StaffHeader title={'Home'} navigation={this.props.navigation} />
          <Card>
            <Text style={{fontSize: Normalize(15), marginTop: 10}}>
              {this.props.person.Name}
            </Text>

            <ProgressBarAnimated
              width={barWidth}
              value={this.props.person.Persentage}
              backgroundColor={Colorlize(this.props.person.Persentage)}
              backgroundColorOnComplete="#6CC644"
            />
          </Card>

          <Text
            style={{
              marginTop: 10,
              alignSelf: 'center',
              fontSize: Normalize(15),
            }}>
            SESSION HISTORY
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
    type: state.auth.type,
    email: state.auth.email,
    Loader: state.auth.Loader,
    EmailError: state.auth.EmailError,
    site: state.auth.site,
    person: state.auth.person,
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
    FetchInfo,
  },
)(CashierHomeView);
