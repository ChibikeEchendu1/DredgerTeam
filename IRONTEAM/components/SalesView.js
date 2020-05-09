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
import MyContactListSales from './MyContactListSales';
import AsyncStorage from '@react-native-community/async-storage';
import {Input, Button, Card, normalize} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import {Rating, AirbnbRating} from 'react-native-ratings';

import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Colorlize from '../utils/Colorlize';
import Normalize from '../utils/Normalize';
import RNPickerSelect from 'react-native-picker-select';

import {
  NameChanged,
  sendSales,
  TypeChanged,
  emailChanged,
  annothernameChanged,
  PasswordChanged,
  AddProspect,
  FetchInfo,
  startShiftCah,
  endShiftCah,
} from '../actions';
import {connect} from 'react-redux';
import StaffHeader from './StaffHeader';
import BlinkingText from './BlinkingText';
import Modal, {
  ModalFooter,
  ModalButton,
  ModalContent,
  SlideAnimation,
} from 'react-native-modals';
const barWidth = Dimensions.get('screen').width - 60;
const placeholder = {
  label: 'Select Truck...',
  value: 5,
  color: '#9EA0A4',
};
const SCREENWIDTH = Dimensions.get('window').width;

class SalesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EmailError: '',
      PasswordError: '',
      value: 5,
      Rating: 3,
      isLoading: false,
      visible: false,
      5: {money: 0, Total: 0},
      10: {money: 0, Total: 0},
      15: {money: 0, Total: 0},
      30: {money: 0, Total: 0},
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
    this.props.PasswordChanged(text);
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

  renderList() {
    if (this.props.Loader) {
      return null; //
    }
    return (
      <FlatList
        style={{flex: 1}}
        data={this.props.Sales}
        renderItem={({item}) => this.renderRow(item)}
        keyExtractor={(item, index) => index}
        onRefresh={() => this.renderRefreshControl()}
        refreshing={this.props.Loader}
        initialNumToRender={8}
      />
    );
  }

  renderRow(item) {
    return (
      <MyContactListSales navigation={this.props.navigation} item={item} />
    );
  }

  renderRefreshControl() {
    this.setState({isLoading: true});
  }

  clear() {
    this.setState({
      5: {money: 0, Total: 0},
      10: {money: 0, Total: 0},
      15: {money: 0, Total: 0},
      30: {money: 0, Total: 0},
    });
  }

  onButtonPress() {
    const {name, password} = this.props;
    console.log('press');
    console.log(name);
    console.log(password);
    console.log(this.state[5]);
    console.log(this.state[10]);
    console.log(this.state[15]);
    if (name == '' && password == '') {
      console.log('empty');

      this.setState({PasswordError: 'Set Quantity'});
    } else if (name == '') {
      if (this.state.value == 5) {
        this.setState({
          5: {
            money:
              this.state[5].money +
              this.props.site.fiveTPrice * Number(password),
            Total: this.state[5].Total + Number(password),
          },
        });
      } else if (this.state.value == 10) {
        this.setState({
          10: {
            money:
              this.state[10].money +
              this.props.site.tenTPrice * Number(password),
            Total: this.state[10].Total + Number(password),
          },
        });
      } else if (this.state.value == 15) {
        this.setState({
          15: {
            money:
              this.state[15].money +
              this.props.site.fifteenTPrice * Number(password),
            Total: this.state[15].Total + Number(password),
          },
        });
      } else if (this.state.value == 30) {
        this.setState({
          30: {
            money:
              this.state[30].money +
              this.props.site.thirtyTPrice * Number(password),
            Total: this.state[30].Total + Number(password),
          },
        });
      }
      this.setState({PasswordError: ''});
    } else {
      if (this.state.value == 5) {
        this.setState({
          5: {
            money: this.state[5].money + Number(name) * Number(password),
            Total: this.state[5].Total + Number(password),
          },
        });
      } else if (this.state.value == 10) {
        this.setState({
          10: {
            money: this.state[10].money + Number(name) * Number(password),
            Total: this.state[10].Total + Number(password),
          },
        });
      } else if (this.state.value == 15) {
        this.setState({
          15: {
            money: this.state[15].money + Number(name) * Number(password),
            Total: this.state[15].Total + Number(password),
          },
        });
      } else if (this.state.value == 30) {
        this.setState({
          30: {
            money: this.state[30].money + Number(name) * Number(password),
            Total: this.state[30].Total + Number(password),
          },
        });
      }

      this.setState({PasswordError: ''});
    }
  }

  onButtonPress2() {
    this.props.sendSales(
      {
        5: this.state[5],
        10: this.state[10],
        15: this.state[15],
        30: this.state[30],
      },
      this.props.person,
    );

    this.setState({
      5: {money: 0, Total: 0},
      10: {money: 0, Total: 0},
      15: {money: 0, Total: 0},
      30: {money: 0, Total: 0},
    });
  }

  onButtonPress3() {
    this.props.startShiftCah(this.props.person);
  }

  onButtonPress4() {
    this.setState({visible: false});
    this.props.endShiftCah(
      this.props.person,
      this.props.email,
      this.state.Rating,
      this.props.type,
    );
  }

  renderButtons() {
    if (this.props.Loader) {
      return <ActivityIndicator color={VARIABLES.Color} size={'large'} />;
    }
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Button
          onPress={() => this.clear()}
          title=""
          type="outline"
          raised
          containerStyle={{
            marginTop: 30,
            alignSelf: 'flex-end',
            width: '20%',
          }}
          icon={<Icon name="remove" size={15} color="white" />}
          titleStyle={{color: 'white'}}
          buttonStyle={{
            backgroundColor: VARIABLES.myred,
            borderColor: VARIABLES.myred,
            width: '100%',
          }}
        />
        <Button
          onPress={this.onButtonPress.bind(this)}
          title="Add"
          type="outline"
          raised
          containerStyle={{
            marginTop: 30,
            alignSelf: 'flex-end',
            marginLeft: 20,
            width: '30%',
          }}
          titleStyle={{color: 'white'}}
          buttonStyle={{
            backgroundColor: VARIABLES.Color,
            borderColor: VARIABLES.Color,
            width: '100%',
          }}
        />

        <Button
          onPress={this.onButtonPress2.bind(this)}
          title="Submit"
          type="outline"
          raised
          containerStyle={{
            marginTop: 30,
            marginLeft: 20,
            alignSelf: 'flex-end',
            width: '30%',
          }}
          titleStyle={{color: 'white'}}
          buttonStyle={{
            backgroundColor: VARIABLES.green,
            borderColor: VARIABLES.green,
            width: '100%',
          }}
        />
      </View>
    );
  }

  sum(obj) {
    var sum = 0;
    for (var el in obj) {
      if (obj.hasOwnProperty(el)) {
        sum += parseFloat(obj[el].money);
      }
    }
    return sum;
  }

  renderShift() {
    if (this.props.person.On) {
      return (
        <View>
          <Card>
            <Text
              style={{fontWeight: 'bold', alignSelf: 'center', fontSize: 15}}>
              Target: {this.props.person.Target}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Text style={{fontSize: normalize(15), marginLeft: 7}}>
                Total:
                {this.state[5].money +
                  this.state[10].money +
                  this.state[15].money +
                  this.state[30].money}
              </Text>
              <Text style={{fontSize: normalize(15), marginLeft: 7}}>
                Total Trucks:
                {this.state[5].Total +
                  this.state[10].Total +
                  this.state[15].Total +
                  this.state[30].Total}
              </Text>
            </View>
            <RNPickerSelect
              onValueChange={value => this.setState({value})}
              style={pickerSelectStyles}
              placeholder={placeholder}
              items={[
                {label: 'Five(5) Ton', value: 5},
                {label: 'Ten(10) Ton', value: 10},
                {label: 'Fifteen(15) Ton', value: 15},
                {label: 'Thirty(30) Ton', value: 30},
              ]}
            />

            <Input
              value={this.props.password}
              inputStyle={{marginLeft: 7}}
              onChangeText={this.onPasswordC.bind(this)}
              placeholder="Quantity"
              keyboardType="number-pad"
              errorStyle={{color: 'red', marginLeft: '5%'}}
              errorMessage={this.state.PasswordError}
              inputContainerStyle={{
                width: '90%',
                alignSelf: 'center',
                marginTop: 10,
              }}
            />
            <Input
              value={this.props.name}
              inputStyle={{marginLeft: 7}}
              onChangeText={this.onEmailC.bind(this)}
              placeholder="Special Price?"
              keyboardType="number-pad"
              errorStyle={{color: 'red', marginLeft: '5%'}}
              errorMessage={this.props.PasswordError}
              inputContainerStyle={{
                width: '90%',
                alignSelf: 'center',
                marginTop: 10,
              }}
            />
            {this.renderButtons()}
          </Card>
          <Text
            style={{
              marginTop: 10,
              alignSelf: 'center',
              fontSize: Normalize(15),
            }}>
            Sales Today
          </Text>
        </View>
      );
    }
  }
  renderContent() {
    return (
      <View>
        <Text
          style={{
            display: 'flex',
            alignSelf: 'center',
            marginBottom: 10,
          }}>
          How did the shift go
        </Text>
        <AirbnbRating
          count={5}
          reviews={['Terrible', 'bad', 'OK', 'Good', 'very Good']}
          defaultRating={3}
          size={20}
          onFinishRating={Rating => {
            this.setState({Rating});
          }}
        />
        <TextInput
          placeholder="Todays End Report"
          style={{
            textAlignVertical: 'top',
            height: 70,
            width: '90%',
            alignSelf: 'center',
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 10,
          }}
          multiline={true}
          numberOfLines={20}
          onChangeText={this.onSummeryC.bind(this)}
          value={this.props.email}
        />

        <Input
          value={this.props.type}
          inputStyle={{marginLeft: 7}}
          onChangeText={this.onTypeC.bind(this)}
          placeholder="Target for tomorrow"
          errorStyle={{color: 'red', marginLeft: '5%'}}
          errorMessage={this.props.PasswordError}
          inputContainerStyle={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 10,
            marginBottom: 10,
          }}
        />
      </View>
    );
  }
  renderShiftstate() {
    if (this.props.Loader) {
      return <ActivityIndicator color={VARIABLES.Color} size={'large'} />;
    }
    if (this.props.person.On) {
      return (
        <Button
          onPress={() => {
            this.setState({visible: true});
          }}
          title="End Shift"
          type="outline"
          raised
          containerStyle={{
            marginLeft: 20,
            alignSelf: 'flex-end',
            width: '40%',
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
    return (
      <Button
        onPress={this.onButtonPress3.bind(this)}
        title="Start Shift"
        type="outline"
        raised
        containerStyle={{
          marginLeft: 20,
          alignSelf: 'flex-end',
          width: '40%',
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

  sum2(obj) {
    var sum = 0;
    for (var el in obj) {
      if (obj.hasOwnProperty(el)) {
        sum += parseFloat(obj[el].Total);
      }
    }
    return sum;
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <Card>{this.renderShiftstate()}</Card>
          <Modal
            width={SCREENWIDTH - 40}
            visible={this.state.visible}
            onTouchOutside={() => {
              this.setState({visible: false});
            }}
            modalAnimation={
              new SlideAnimation({
                slideFrom: 'bottom',
              })
            }
            footer={
              <ModalFooter>
                <ModalButton
                  textStyle={{color: VARIABLES.Color}}
                  text="CANCEL"
                  onPress={() => {
                    this.setState({visible: false});
                  }}
                />
                <ModalButton
                  textStyle={{color: VARIABLES.Color}}
                  text="Report"
                  onPress={this.onButtonPress4.bind(this)}
                />
              </ModalFooter>
            }>
            <ModalContent>{this.renderContent()}</ModalContent>
          </Modal>
          {this.renderShift()}
          {this.renderList()}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    width: '90%',
    borderColor: 'gray',
    alignSelf: 'center',

    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    width: '90%',

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
    type: state.auth.type,
    email: state.auth.email,
    password: state.auth.password,
    Loader: state.auth.Loader,
    EmailError: state.auth.EmailError,
    site: state.auth.site,
    person: state.auth.person,
    logedin: state.auth.logedin,
    AddedCahs: state.auth.AddedCahs,
    Sales: state.auth.Sales,
  };
};

export default connect(
  mapStateToProps,
  {
    NameChanged,
    sendSales,
    TypeChanged,
    emailChanged,
    annothernameChanged,
    AddProspect,
    FetchInfo,
    PasswordChanged,
    startShiftCah,
    endShiftCah,
  },
)(SalesView);
