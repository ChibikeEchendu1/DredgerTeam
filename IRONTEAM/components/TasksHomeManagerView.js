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
import ReportsList from './ReportsList';
import {NavigationEvents} from 'react-navigation';
import {Input, Button, Card, normalize} from 'react-native-elements';
import MyContactListSales from './MyContactListSales';
import {Rating, AirbnbRating} from 'react-native-ratings';

import Icon from 'react-native-vector-icons/FontAwesome';
import {
  RequestBA,
  FetchInfoMan,
  CodeChanged,
  NameChanged,
  emailChanged,
  SetRates,
  startDay,
  endDay,
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
class TasksHomeManagerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EmailError: '',
      PasswordError: '',
      value: '',
      Rating: 3,
      isLoading: false,
      Prospect: {},
      visible: false,
      visible2: false,
    };
  }

  async componentDidMount() {
    var Prospect = await AsyncStorage.getItem('MANToken');
    Prospect = JSON.parse(Prospect);
    this.props.FetchInfoMan(Prospect);
    this.setState({Prospect}); //this.props.FetchMachineManager(person.Site);
  }

  renderRow(item, index) {
    return (
      <ReportsList
        index={index}
        navigation={this.props.navigation}
        item={item}
      />
    );
  }
  onTypeC(text) {
    this.props.TypeChanged(text);
  }
  renderRefreshControl() {
    this.setState({isLoading: true});
  }
  onNameC(text) {
    this.props.NameChanged(text);
  }

  onButtonPress() {
    if (this.props.site.DayON) {
      this.setState({visible: true}); // this.props.endDay(this.state.Prospect);
    } else {
      this.props.startDay(this.state.Prospect);
    }
  }

  onButtonPress2() {
    const {password} = this.props;
    //this.props.loginUser({password});
  }

  onButtonPress3() {
    const {password} = this.props;
    //this.props.loginUser({password});
  }

  renderContent() {
    return (
      <View>
        <Text
          style={{
            display: 'flex',
            alignSelf: 'center',
            marginBottom: 20,
          }}>
          Report how the shift went
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
          placeholder="Todays Report"
          style={{
            textAlignVertical: 'top',
            height: 70,
            width: '90%',
            alignSelf: 'center',
            borderColor: 'gray',
            borderWidth: 1,
          }}
          multiline={true}
          numberOfLines={20}
          onChangeText={this.onNameC.bind(this)}
          value={this.props.name}
        />
      </View>
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
            title={this.props.site.DayON ? 'End Shift' : 'Start Shift'}
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

  renderList() {
    if (this.props.Loader) {
      return null; //
    }
    return (
      <FlatList
        style={{flex: 1}}
        data={this.props.Reports}
        renderItem={({item, index}) => this.renderRow(item, index)}
        keyExtractor={(item, index) => index}
        onRefresh={() => this.renderRefreshControl()}
        refreshing={this.props.Loader}
        initialNumToRender={8}
      />
    );
  }

  renderShift() {
    if (this.props.site.DayON) {
      return (
        <View>
          <Card>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}>
              <Text style={{fontSize: normalize(12), marginLeft: 7}}>
                Operation Funds:
              </Text>
              <Text style={{fontSize: normalize(12), marginLeft: 7}}>
                Total Expenses Today:
              </Text>
            </View>

            <Button
              onPress={() => {
                this.props.navigation.navigate('Request');
              }}
              title="Expense"
              type="outline"
              raised
              containerStyle={{
                marginLeft: 20,
                alignSelf: 'flex-end',
                width: '40%',
              }}
              iconRight
              icon={<Icon name="arrow-right" size={15} color="white" />}
              titleStyle={{color: 'white', marginRight: 10}}
              buttonStyle={{
                backgroundColor: VARIABLES.Color,
                borderColor: VARIABLES.Color,
                width: '100%',
              }}
            />
          </Card>
          <Text
            style={{
              marginTop: 10,
              alignSelf: 'center',
              fontSize: Normalize(15),
            }}>
            Reports Today
          </Text>

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
                  onPress={() => {
                    this.props.endDay(
                      this.state.Prospect,
                      this.props.name,
                      this.state.Rating,
                    ),
                      this.setState({visible: false});
                  }}
                />
              </ModalFooter>
            }>
            <ModalContent>{this.renderContent()}</ModalContent>
          </Modal>
        </View>
      );
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <NavigationEvents
            onDidFocus={async () => {
              var Prospect = await AsyncStorage.getItem('MANToken');
              Prospect = JSON.parse(Prospect);
              this.props.FetchInfoMan(Prospect);
            }}
          />
          <Card>{this.renderButton()}</Card>
          <View>{this.renderShift()}</View>
          {this.renderList()}
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
    Reports: state.auth.Reports,
    Code: state.auth.Code,
    type: state.auth.type,
    Added: state.auth.Added,
    EmailError: state.auth.EmailError,
    PasswordError: state.auth.PasswordError,
    Loader: state.auth.Loader,
    logedin: state.auth.logedin,
    email: state.auth.email,
  };
};

export default connect(
  mapStateToProps,
  {
    RequestBA,
    FetchInfoMan,
    CodeChanged,
    NameChanged,
    emailChanged,
    SetRates,
    startDay,
    endDay,
  },
)(TasksHomeManagerView);
