/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {VARIABLES} from '../utils/Variables';
import {Input, Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {emailChanged, PasswordChanged, loginUser} from '../actions';
import {connect} from 'react-redux';
import Normalize from '../utils/Normalize';

import _ from 'lodash';

const MoneyValid = /^[0-9]+(\.[0-9]{1,2})?$/;

class AddImagesViews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EmailError: '',
      PasswordError: '',
      Sub: 0,
      SizeError: '',
      PriceError: '',
      Show1: 0,
      Show2: 0,
      Show3: 0,
      Show4: 0,
      Images1: null,
      Images2: null,
      Images3: null,
      Images4: null,
      pands: [{Size: '', Price: 0.0}],
      Prospect: this.props.navigation.state.params.Prospect,
    };
    this.addSize = this.addSize.bind(this);
    this.removeSize = this.removeSize.bind(this);
  }

  onEmailC(text) {
    this.props.emailChanged(text);
  }

  addSize(event) {
    this.setState({pands: [...this.state.pands, {Size: '', Price: 0.0}]});
    _.each(this.state.pands, ({placeholder}, index2) => {
      var tog = 0;
      if (
        this.state.pands[index2].Size == ' ' ||
        this.state.pands[index2].Size == ''
      ) {
        this.setState({SizeError: 'All Parts Must have values'});
        console.log(this.state.SizeError);
        return false;
      }
      this.setState({SizeError: ''});
    });
    _.each(this.state.pands, ({placeholder}, index2) => {
      if (
        this.state.pands[index2].Price == ' ' ||
        this.state.pands[index2].Price == ''
      ) {
        this.setState({PriceError: 'All Cost Must have values'});
        console.log(this.state.PriceError);
        return false;
      } else if (!MoneyValid.test(this.state.pands[index2].Price)) {
        this.setState({
          PriceError:
            this.state.pands[index2].Price + ' is not in money format',
        });
        console.log(this.state.PriceError);
        return false;
      } else {
        this.setState({PriceError: ''});
      }
    });
  }

  removeSize(event) {
    var array = [...this.state.pands]; // make a separate copy of the array
    var index = this.state.pands.length - 1;
    if (index !== 0) {
      array.splice(index, 1);
      this.setState({pands: array});
    }
  }

  Login() {
    if (this.props.logedin) {
      this.props.navigation.navigate('Main');
    }
  }

  onPasswordC(text) {
    this.props.PasswordChanged(text);
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
      return [
        <Button
          onPress={this.removeSize}
          title="Remove"
          type="outline"
          raised
          containerStyle={{marginTop: 30, alignSelf: 'center', width: '35%'}}
          titleStyle={{color: 'white'}}
          buttonStyle={{
            backgroundColor: VARIABLES.Color,
            borderColor: VARIABLES.Color,
            width: '100%',
          }}
          icon={
            <Icon
              color={'white'}
              name="remove"
              size={20}
              style={{alignSelf: 'center', marginLeft: 10}}
            />
          }
          iconRight
        />,
        <Button
          onPress={this.addSize}
          title="Add"
          type="outline"
          raised
          containerStyle={{marginTop: 30, alignSelf: 'center', width: '35%'}}
          titleStyle={{color: 'white'}}
          buttonStyle={{
            backgroundColor: VARIABLES.Color,
            borderColor: VARIABLES.Color,
            width: '100%',
          }}
          icon={
            <Icon
              color={'white'}
              name="plus"
              size={20}
              style={{alignSelf: 'center', marginLeft: 10}}
            />
          }
          iconRight
        />,
      ];
    }
  }

  renderDone() {
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
          buttonStyle={{
            borderColor: VARIABLES.Color,
            backgroundColor: VARIABLES.Color,
          }}
          containerStyle={{
            marginTop: 10,
            marginRight: '5%',
            alignSelf: 'flex-end',
            width: '40%',
            marginBottom: Normalize(6),
          }}
          icon={
            <Icon
              color={'white'}
              name="chevron-right"
              size={15}
              style={{alignSelf: 'center', marginLeft: 10}}
            />
          }
          iconRight
          onPress={() =>
            this.props.navigation.navigate('TakePicture', {
              Parts: this.state.pands,
              Description: this.props.email,
              WorkmanShip: this.props.password,
              Prospect: this.state.Prospect,
            })
          }
          titleStyle={{}}
          title={'Next'}
        />
      );
    }
  }

  renderErrors() {
    return [
      <Text style={{color: VARIABLES.myred}}>{this.state.PriceError}</Text>,
      <Text style={{color: VARIABLES.myred}}>{this.state.SizeError}</Text>,
    ];
  }

  handleChangeSize(e, index) {
    this.state.pands[index].Size = e;
    this.setState({pands: this.state.pands});
    console.log(this.state.pands);

    _.each(this.state.pands, ({placeholder}, index2) => {
      var tog = 0;
      if (
        this.state.pands[index2].Size == ' ' ||
        this.state.pands[index2].Size == ''
      ) {
        this.setState({SizeError: 'All Parts Must have values'});
        console.log(this.state.SizeError);
        return false;
      }
      this.setState({SizeError: ''});
    });
  }

  handleChangePrice(e, index) {
    this.state.pands[index].Price = e;
    this.setState({pands: this.state.pands});
    console.log(this.state.pands);

    _.each(this.state.pands, ({placeholder}, index2) => {
      if (
        this.state.pands[index2].Price == ' ' ||
        this.state.pands[index2].Price == ''
      ) {
        this.setState({PriceError: 'All Cost Must have values'});
        console.log(this.state.PriceError);
        return false;
      } else if (!MoneyValid.test(this.state.pands[index2].Price)) {
        this.setState({
          PriceError:
            this.state.pands[index2].Price + ' is not in money format',
        });
        console.log(this.state.PriceError);
        return false;
      } else {
        this.setState({PriceError: ''});
      }
    });
  }

  renderpands() {
    return _.map(this.state.pands, ({Size, Price}, index) => {
      return (
        <Card>
          <View
            style={{
              display: 'flex',
              marginTop: 2,
              paddingBottom: 5,
            }}>
            <Text>{index + 1}</Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Input
                  placeholder="Part"
                  value={this.state.pands[index].Size}
                  onChangeText={e => {
                    this.handleChangeSize(e, index);
                  }}
                  errorStyle={{color: 'red', marginLeft: '5%'}}
                  inputStyle={{marginLeft: 7}}
                  errorMessage={this.props.NameError}
                  //inputContainerStyle={{width: '45%'}}
                />
              </View>
              <View style={{flex: 1}}>
                <Input
                  placeholder="Cost"
                  value={this.state.pands[index].Price}
                  onChangeText={e => {
                    this.handleChangePrice(e, index);
                  }}
                  keyboardType="number-pad"
                  errorStyle={{color: 'red', marginLeft: '5%'}}
                  errorMessage={this.props.NameError}
                  //inputContainerStyle={{width: '45%'}}
                />
              </View>
            </View>
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        {this.renderDone()}
        <Card>
          <Text style={{marginLeft: 20}}>Description</Text>
          <TextInput
            style={{
              textAlignVertical: 'top',
              height: 90,
              width: '90%',
              alignSelf: 'center',
              borderColor: 'gray',
              borderWidth: 1,
            }}
            multiline={true}
            numberOfLines={20}
            onChangeText={this.onEmailC.bind(this)}
            value={this.props.email}
          />
        </Card>
        <Card>
          <Text style={{marginLeft: 20}}>Workmanship</Text>
          <Input
            value={this.props.password}
            inputStyle={{}}
            onChangeText={this.onPasswordC.bind(this)}
            placeholder="Cost"
            keyboardType="number-pad"
            errorStyle={{color: 'red'}}
            errorMessage={null}
            inputContainerStyle={{
              width: '90%',
              alignSelf: 'center',
              marginTop: 5,
            }}
          />
        </Card>
        <KeyboardAvoidingView
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginBottom: 10,
          }}>
          {this.renderButton()}
        </KeyboardAvoidingView>

        <ScrollView style={{height: '90%', flex: 1}}>
          {this.renderpands()}
        </ScrollView>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          {this.renderErrors()}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    EmailError: state.auth.EmailError,
    PasswordError: state.auth.PasswordError,
    Loader: state.auth.Loader,
    logedin: state.auth.logedin,
  };
};

export default connect(
  mapStateToProps,
  {emailChanged, PasswordChanged, loginUser},
)(AddImagesViews);
