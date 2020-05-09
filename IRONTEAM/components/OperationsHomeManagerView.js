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
import MyProspectList from './MyProspectList';
import {NavigationEvents} from 'react-navigation';
import {Input, Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  RequestBA,
  FetchInfo,
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
class OperationsHomeManagerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EmailError: '',
      PasswordError: '',
      value: '',
      isLoading: false,
      Prospect: {},
      visible: false,
      visible2: false,
    };
  }

  async componentDidMount() {
    var Prospect = await AsyncStorage.getItem('MANToken');
    Prospect = JSON.parse(Prospect);
    this.props.FetchInfo(Prospect);
    this.setState({Prospect}); //this.props.FetchMachineManager(person.Site);
  }

  renderRow(item) {
    return <MyProspectList navigation={this.props.navigation} item={item} />;
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

  renderContent() {
    return (
      <View>
        <Text
          style={{
            display: 'flex',
            alignSelf: 'center',
            marginBottom: 20,
          }}>
          Request ₦
        </Text>
        <Input
          placeholder="Amount"
          onChangeText={this.onCodeC.bind(this)}
          value={this.props.Code}
          keyboardType="number-pad"
          inputStyle={{marginLeft: 7}}
          errorStyle={{color: 'red', marginLeft: '5%'}}
          errorMessage={this.props.CodeError}
          inputContainerStyle={{
            width: '90%',
            alignSelf: 'center',
          }}
        />
        <Input
          placeholder="For..."
          onChangeText={this.onNameC.bind(this)}
          value={this.props.name}
          inputStyle={{marginLeft: 7}}
          errorStyle={{color: 'red', marginLeft: '5%'}}
          errorMessage={this.props.CodeError}
          inputContainerStyle={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 20,
          }}
        />
      </View>
    );
  }

  renderContent2() {
    return (
      <View>
        <Text
          style={{
            display: 'flex',
            alignSelf: 'center',
            marginBottom: 20,
          }}>
          SET RATES
        </Text>
        <Input
          placeholder="5 ton"
          onChangeText={this.onCodeC.bind(this)}
          value={this.props.Code}
          keyboardType="number-pad"
          inputStyle={{marginLeft: 7}}
          errorStyle={{color: 'red', marginLeft: '5%'}}
          errorMessage={this.props.CodeError}
          inputContainerStyle={{
            width: '90%',
            alignSelf: 'center',
          }}
        />
        <Input
          placeholder="10 ton"
          onChangeText={this.onNameC.bind(this)}
          value={this.props.name}
          keyboardType="number-pad"
          inputStyle={{marginLeft: 7}}
          errorStyle={{color: 'red', marginLeft: '5%'}}
          errorMessage={this.props.CodeError}
          inputContainerStyle={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 20,
          }}
        />

        <Input
          placeholder="15 ton"
          onChangeText={this.onEmailC.bind(this)}
          value={this.props.email}
          keyboardType="number-pad"
          inputStyle={{marginLeft: 7}}
          errorStyle={{color: 'red', marginLeft: '5%'}}
          errorMessage={this.props.CodeError}
          inputContainerStyle={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 20,
          }}
        />

        <Input
          placeholder="30 ton"
          onChangeText={this.onPC.bind(this)}
          value={this.props.password}
          keyboardType="number-pad"
          inputStyle={{marginLeft: 7}}
          errorStyle={{color: 'red', marginLeft: '5%'}}
          errorMessage={this.props.CodeError}
          inputContainerStyle={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 20,
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
          <NavigationEvents
            onDidFocus={async () => {
              var Prospect = await AsyncStorage.getItem('MANToken');
              Prospect = JSON.parse(Prospect);
              this.props.FetchInfo(Prospect);
            }}
          />
          <Card>
            <Text
              style={{
                fontSize: 16,
                textDecorationLine: 'underline',
                fontWeight: 'bold',
              }}>
              INSPECTIONS
            </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text
                style={{
                  marginTop: 15,
                  marginRight: 10,
                }}>
                Last Inspection:
              </Text>
              {this.renderText(this.props.site.LastInspection)}
            </View>
            <Button
              onPress={this.onButtonPress.bind(this)}
              title={'Start Inspection'}
              type="outline"
              raised
              containerStyle={{
                marginTop: 5,
                alignSelf: 'flex-end',
                width: '50%',
              }}
              titleStyle={{color: 'white'}}
              buttonStyle={{
                backgroundColor: VARIABLES.Color,
                borderColor: VARIABLES.Color,
                width: '100%',
              }}
            />
          </Card>

          <Card>
            <Text
              style={{
                fontSize: 16,
                textDecorationLine: 'underline',
                fontWeight: 'bold',
              }}>
              EXPENSE REPORT
            </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text
                style={{
                  marginTop: 15,
                  marginRight: 10,
                }}>
                Operating Money:
              </Text>
              {this.renderText(this.props.site.OperatingMoney)}
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text
                style={{
                  marginTop: 15,
                  marginRight: 10,
                }}>
                Expense Money:
              </Text>
              {this.renderText(this.props.site.OperatingExpense)}
            </View>
            <Button
              onPress={() => this.setState({visible: true})}
              title={'Request Operating Fund'}
              type="outline"
              raised
              containerStyle={{
                marginTop: 5,
                alignSelf: 'flex-end',
                width: '60%',
              }}
              titleStyle={{color: 'white'}}
              buttonStyle={{
                backgroundColor: VARIABLES.Color,
                borderColor: VARIABLES.Color,
                width: '100%',
              }}
            />
          </Card>

          <Card>
            <Text
              style={{
                fontSize: 16,
                textDecorationLine: 'underline',
                fontWeight: 'bold',
              }}>
              TRUCK RATES
            </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text
                style={{
                  marginTop: 5,
                  marginRight: 5,
                }}>
                FIVE TON:
              </Text>
              {this.renderText(this.props.site.tenTPrice)}
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text
                style={{
                  marginTop: 5,
                  marginRight: 5,
                }}>
                TEN TON:
              </Text>
              {this.renderText(this.props.site.fiveTPrice)}
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text
                style={{
                  marginTop: 5,
                  marginRight: 5,
                }}>
                FIFTEEN TON:
              </Text>
              {this.renderText(this.props.site.fifteenTPrice)}
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text
                style={{
                  marginTop: 5,
                  marginRight: 5,
                }}>
                THIRTY TON:
              </Text>
              {this.renderText(this.props.site.thirtyTPrice)}
            </View>
            <Button
              onPress={() => this.setState({visible2: true})}
              title={'Set Rates'}
              type="outline"
              raised
              containerStyle={{
                marginTop: 15,
                alignSelf: 'flex-end',
                width: '50%',
              }}
              titleStyle={{color: 'white'}}
              buttonStyle={{
                backgroundColor: VARIABLES.Color,
                borderColor: VARIABLES.Color,
                width: '100%',
              }}
            />
          </Card>
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
                  text="Request"
                  onPress={() => {
                    this.props.RequestBA(
                      this.props.Code,
                      this.state.Prospect,
                      this.props.name,
                    ),
                      this.setState({visible: false});
                  }}
                />
              </ModalFooter>
            }>
            <ModalContent>{this.renderContent()}</ModalContent>
          </Modal>
          <Modal
            width={SCREENWIDTH - 40}
            visible={this.state.visible2}
            onTouchOutside={() => {
              this.setState({visible2: false});
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
                    this.setState({visible2: false});
                  }}
                />
                <ModalButton
                  textStyle={{color: VARIABLES.Color}}
                  text="SET"
                  onPress={() => {
                    this.props.SetRates(
                      this.props.Code,
                      this.props.name,
                      this.props.email,
                      this.props.password,
                      this.state.Prospect,
                    ),
                      this.setState({visible2: false});
                  }}
                />
              </ModalFooter>
            }>
            <ModalContent>{this.renderContent2()}</ModalContent>
          </Modal>
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
    Added: state.auth.Added,
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
    FetchInfo,
    CodeChanged,
    NameChanged,
    emailChanged,
    SetRates,
    PasswordChanged,
  },
)(OperationsHomeManagerView);
