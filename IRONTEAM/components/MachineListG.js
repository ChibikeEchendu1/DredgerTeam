import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {
  startShift,
  stopShift,
  startMachine,
  stopMachine,
  emailChanged,
  TypeChanged,
} from '../actions';
import _ from 'lodash';
import {Input, Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {VARIABLES} from '../utils/Variables';
import Normalize from '../utils/Normalize';
import Modal, {
  ModalFooter,
  ModalButton,
  ModalContent,
  SlideAnimation,
} from 'react-native-modals';
import {Rating, AirbnbRating} from 'react-native-ratings';

const barWidth = Dimensions.get('screen').width - 40;
const SCREENWIDTH = Dimensions.get('window').width;

class MachineListG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showShift: false,
      visible: false,
      visible2: false,
      Rating: 3,
    };
  }

  onButtonPress() {
    this.props.startShift(this.props.item, this.props.index, this.props.email);
    this.setState({visible2: false});
  }

  onButtonPress2() {
    this.props.startMachine(this.props.item, this.props.index);
  }

  onButtonPress3() {
    this.props.stopMachine(this.props.item, this.props.index);
  }

  onButtonPress4() {
    this.setState({visible: false});
    this.props.stopShift(
      this.props.item,
      this.props.index,
      this.props.email,
      this.state.Rating,
      this.props.type,
    );
  }

  onNameC(text) {
    this.props.emailChanged(text);
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
          Report
        </Text>

        <TextInput
          placeholder="Todays End Report"
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
          value={this.props.email}
        />
      </View>
    );
  }

  onTypeC(text) {
    this.props.TypeChanged(text);
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
          Report
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
          }}
          multiline={true}
          numberOfLines={20}
          onChangeText={this.onNameC.bind(this)}
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

  renderuttons() {
    if (this.props.index == this.props.index2) {
      return (
        <ActivityIndicator
          style={styles.tab}
          color={VARIABLES.Color}
          size={'large'}
        />
      );
    } else {
      if (this.props.item.State == 0) {
        return (
          <Button
            onPress={this.onButtonPress.bind(this)}
            title="Start Shift"
            type="outline"
            raised
            containerStyle={{
              marginTop: 20,
              width: '50%',
              marginLeft: '6.6%',
              alignSelf: 'flex-start',
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
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <Button
              onPress={this.onButtonPress2.bind(this)}
              title="Start Machine"
              type="outline"
              raised
              disabled={this.props.item.State == 2}
              containerStyle={{marginTop: 10, width: '40%'}}
              titleStyle={{color: 'white'}}
              buttonStyle={{
                backgroundColor: 'green',
                borderColor: 'green',
                width: '100%',
              }}
            />
            <Button
              onPress={this.onButtonPress3.bind(this)}
              title="Stop Machine"
              type="outline"
              raised
              disabled={this.props.item.State == 1}
              containerStyle={{marginTop: 10, width: '40%'}}
              titleStyle={{color: 'white'}}
              buttonStyle={{
                backgroundColor: VARIABLES.myred,
                borderColor: VARIABLES.myred,
                width: '100%',
              }}
            />
          </View>
          <Button
            onPress={() => {
              this.setState({visible: true});
            }}
            title="End Shift"
            type="outline"
            raised
            containerStyle={{
              marginTop: 10,
              width: '50%',
              marginLeft: '6.6%',
              alignSelf: 'flex-start',
            }}
            titleStyle={{color: 'white'}}
            buttonStyle={{
              backgroundColor: VARIABLES.Color,
              borderColor: VARIABLES.Color,
              width: '100%',
            }}
          />
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
            <ModalContent>{this.renderContent2()}</ModalContent>
          </Modal>
        </View>
      );
    }
  }

  getDateTime2() {
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? '0' : '') + hour;

    var min = date.getMinutes();
    min = (min < 10 ? '0' : '') + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? '0' : '') + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? '0' : '') + month;

    var day = date.getDate();
    day = (day < 10 ? '0' : '') + day;

    return month + '/' + day + '/' + year + ' ' + hour + ':' + min + ':' + sec;
  }

  diff_hours(dt2, dt1, check) {
    if (check == null) {
      return 0;
    }
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60;
    console.log(Math.abs(Math.floor(diff)), 'diff', check);

    return Math.abs(Math.round(diff));
  }

  diff_mins(dt2, dt1, check) {
    if (check == null) {
      return 0;
    }
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60;
    var hours = Math.abs(Math.floor(diff));
    var mins = diff * 60 - hours * 60;
    return Math.abs(Math.floor(mins));
  }

  getAdd(dt2, dt1, check) {
    if (check == null) {
      return 0;
    }
    if (dt2 + dt1 > 60) {
      return 1;
    }
    return 0;
  }

  getMins(dt2, dt1) {
    if (dt2 + dt1 > 60) {
      return dt2 + dt1 - 60;
    }
    return dt2 + dt1;
  }

  gen_mins(dt2, dt1, chekc) {
    if (chekc == null) {
      return 0;
    }
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.floor(diff));
  }

  getDateTime() {
    var date = new Date();
    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? '0' : '') + month;

    var day = date.getDate();
    day = (day < 10 ? '0' : '') + day;

    return month + '/' + day + '/' + year;
  }

  render() {
    const dt1 = new Date(this.props.item.MaintanaceDate);
    const dt2 = new Date(this.getDateTime());
    const diffDays = Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24),
    );
    return (
      <Card containerStyle={{height: 340}}>
        <Text
          style={{
            display: 'flex',
            alignSelf: 'center',
            fontSize: 15,
            textDecorationLine: 'underline',
            marginBottom: 20,
            fontWeight: 'bold',
          }}>
          Target: {this.props.item.Target}
        </Text>
        <TouchableOpacity>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: '6.6%',
              justifyContent: 'space-between',
            }}>
            <Icon
              name="circle"
              color={
                this.props.item.State == 0
                  ? 'red'
                  : this.props.item.State == 1
                  ? 'orange'
                  : 'green'
              }
            />
            <View style={{width: '90%'}}>
              <Text style={{color: this.props.item.Fired ? 'red' : 'bleck'}}>
                Name: {this.props.item.Name}
              </Text>
              <Text style={{color: this.props.item.Fired ? 'red' : 'bleck'}}>
                fuel:
                {(this.gen_mins(
                  new Date(this.props.item.Stamp),
                  new Date(this.getDateTime2()),
                  this.props.item.Stamp,
                ) +
                  this.props.item.Tally * 60 +
                  this.props.item.TallyMins) *
                  this.props.item.Fuel}
              </Text>
              <Text style={{color: this.props.item.Fired ? 'red' : 'bleck'}}>
                SandProduced:
                {(this.gen_mins(
                  new Date(this.props.item.Stamp),
                  new Date(this.getDateTime2()),
                  this.props.item.Stamp,
                ) +
                  this.props.item.Tally * 60 +
                  this.props.item.TallyMins) *
                  this.props.item.Sand}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <Text
          style={{fontSize: Normalize(17), marginTop: 5, marginLeft: '6.6%'}}>
          Time Worked:{' '}
          {this.diff_hours(
            new Date(this.props.item.Stamp),
            new Date(this.getDateTime2()),
            this.props.item.Stamp,
          ) +
            this.props.item.Tally +
            this.getAdd(
              this.diff_mins(
                new Date(this.props.item.Stamp),
                new Date(this.getDateTime2()),
                this.props.item.Stamp,
              ),
              this.props.item.TallyMins,
            )}{' '}
          hrs{' '}
          {this.getMins(
            this.diff_mins(
              new Date(this.props.item.Stamp),
              new Date(this.getDateTime2()),
              this.props.item.Stamp,
            ),
            this.props.item.TallyMins,
          )}{' '}
          mins
        </Text>

        <View style={{borderBottomWidth: 1, paddingBottom: 4}}>
          {this.renderuttons()}
        </View>
        <Button
          onPress={() =>
            this.props.navigation.navigate('MaintanaceHome', {
              item: this.props.item,
            })
          }
          title="Maintainace"
          type="outline"
          raised
          containerStyle={{marginTop: 10, width: '50%', marginLeft: '6.6%'}}
          titleStyle={{color: 'white'}}
          buttonStyle={{
            backgroundColor: VARIABLES.Color,
            borderColor: VARIABLES.Color,
            width: '100%',
          }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: '6.6%',
            marginTop: 5,
            backgroundColor: diffDays <= 0 ? 'red' : null,
          }}>
          <Text
            style={{
              marginTop: 4,
              marginRight: 10,
            }}>
            Maintenance required In:{' '}
            {diffDays > 0 ? this.props.item.MaintainEvery - diffDays : diffDays}{' '}
            days
          </Text>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    opacity: 0.9,
    //borderWidth:5,
    position: 'absolute',
    //flex:1,
    //marginBottom:20,
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    height: '15%',
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => {
  return {
    Loader: state.auth.Loader,
    index2: state.auth.index2,
    email: state.auth.email,
    type: state.auth.type,
  };
};

export default connect(
  mapStateToProps,
  {startShift, stopShift, startMachine, stopMachine, emailChanged, TypeChanged},
)(MachineListG);
