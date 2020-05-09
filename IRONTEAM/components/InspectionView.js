/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  SafeAreaView,
  FlatList,
  Dimensions,
  Platform,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Text,
} from 'react-native';
import {VARIABLES} from '../utils/Variables';
import BossSection from './BossSection';
import BossHeader from './BossHeader';
import Modal, {
  ModalFooter,
  ModalButton,
  ModalContent,
  SlideAnimation,
} from 'react-native-modals';
import MachineListI from './MachineListI';
import {Input, Button, CheckBox} from 'react-native-elements';
import {Rating, AirbnbRating} from 'react-native-ratings';

import Icon from 'react-native-vector-icons/FontAwesome';
import {
  NameChanged,
  FetchMachineManager,
  CodeChanged,
  AddMachineBoss,
  costChanged,
  emailChanged,
  sendInspection,
} from '../actions';
import {connect} from 'react-redux';
import Normalize from '../utils/Normalize';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';

const SCREENWIDTH = Dimensions.get('window').width;
const placeholder = {
  label: 'Select a Position...',
  value: null,
  color: '#9EA0A4',
};

const placeholder2 = {
  label: 'Select a site...',
  value: 0,
  color: '#9EA0A4',
};
class MachineHomeManagerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EmailError: '',
      PasswordError: '',
      Profiles: {Partner: []},
      isLoading: false,
      visible: false,
      value: 0,
      flip: 0,
      Site: 0,
      Rating: 3,
      checked: [],
    };
  }

  async componentDidMount() {
    //componentDidMount
    var person = await AsyncStorage.getItem('MANToken');
    person = JSON.parse(person);
    this.props.FetchMachineManager(person.Site);
  }
  getProfiles() {
    return this.state.Profiles.Partner;
  }
  onSummeryC(text) {
    this.props.emailChanged(text);
  }
  renderRefreshControl() {
    this.setState({isLoading: true});
  }

  onNameC(text) {
    this.props.NameChanged(text);
  }
  onCodeC(text) {
    this.props.CodeChanged(text);
  }

  onHodeC(text) {
    this.props.costChanged(text);
  }

  rednderAdd() {
    if (this.props.Loader) {
      return (
        <ActivityIndicator
          style={styles.tab}
          color={VARIABLES.Color}
          size={'large'}
        />
      );
    }
    return (
      <View style={styles.viewStyle}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => this.setState({visible: true})}>
          <Icon
            name="plus-circle"
            color={'white'}
            size={30}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderList() {
    if (this.props.Loader) {
      return (
        <ActivityIndicator
          style={{
            marginTop: 10,
            alignSelf: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
          color={VARIABLES.Color}
          size={'large'}
        />
      ); //
    }
    return (
      <FlatList
        style={{height: '72%'}}
        data={this.props.items.filter(items => {
          return (
            items.Name.toLowerCase().indexOf(this.props.name.toLowerCase()) !==
            -1
          );
        })}
        renderItem={({item, index}) => this.renderRow(item, index)}
        keyExtractor={(item, index) => index}
        onRefresh={() => this.renderRefreshControl()}
        refreshing={this.props.Loader}
        initialNumToRender={8}
      />
    );
  }

  renderRow(item, index) {
    return (
      <MachineListI
        sites={this.props.sites}
        navigation={this.props.navigation}
        index={index}
        States={this.props.inspections[index]}
        item={item}
      />
    );
  }

  createRows() {
    this.props.items.forEach(element => {
      this.setState({
        checked: [
          ...this.state.checked,
          [false, false, false, false, false, false, false, false],
        ],
      });
    });
  }
  onButtonPress() {
    //  this.props.loginUser({password});
    this.props.sendInspection(this.state.Rating, this.props.email);
  }

  added() {
    if (this.props.Added) {
      this.props.navigation.navigate('OperationsHomeManager');
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <AirbnbRating
            count={5}
            reviews={['Terrible', 'bad', 'OK', 'Good', 'very Good']}
            defaultRating={3}
            size={30}
            onFinishRating={Rating => {
              this.setState({Rating});
            }}
          />
          <Text style={{marginLeft: '5%', marginTop: 10, fontSize: 15}}>
            Report
          </Text>
          <TextInput
            style={{
              textAlignVertical: 'top',

              height: '20%',
              width: '90%',
              alignSelf: 'center',
              borderColor: 'gray',
              borderWidth: 1,
            }}
            placeholder={'Report all observations here!'}
            multiline={true}
            numberOfLines={20}
            onChangeText={this.onSummeryC.bind(this)}
            value={this.props.email}
          />
          {this.renderList()}
          <Button
            onPress={this.onButtonPress.bind(this)}
            title="Finish!"
            type="outline"
            raised
            containerStyle={{
              alignSelf: 'flex-end',
              marginRight: '5%',
              width: '50%',
              marginBottom: 5,
            }}
            titleStyle={{color: 'white'}}
            buttonStyle={{
              backgroundColor: VARIABLES.Color,
              borderColor: VARIABLES.Color,
              width: '100%',
            }}
          />
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
    width: '90%',
    borderColor: 'gray',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    width: '90%',
    marginTop: 10,
    alignSelf: 'center',
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  viewStyle: {
    opacity: 0.8,
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Platform.OS == 'ios' ? 25 : 50,
    flexDirection: 'row',
    width: 50,
    height: 50,
    backgroundColor: VARIABLES.Color,
  },
});

//GetCart(this.props.auth.Cart, this.props.create.Market),
const mapStateToProps = state => {
  return {
    items: state.auth.items,
    sites: state.auth.sites,
    Loader: state.auth.Loader,
    name: state.auth.name,
    Code: state.auth.Code,
    cost: state.auth.cost,
    email: state.auth.email,
    inspections: state.auth.inspections,
    Added: state.auth.Added,
  };
};

export default connect(
  mapStateToProps,
  {
    NameChanged,
    FetchMachineManager,
    CodeChanged,
    AddMachineBoss,
    costChanged,
    emailChanged,
    sendInspection,
  },
)(MachineHomeManagerView);
