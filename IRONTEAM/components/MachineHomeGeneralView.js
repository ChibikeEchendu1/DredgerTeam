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
  Text,
} from 'react-native';
import {VARIABLES} from '../utils/Variables';

import Modal, {
  ModalFooter,
  ModalButton,
  ModalContent,
  SlideAnimation,
} from 'react-native-modals';
import MachineListG from './MachineListG';
import {Input, Button, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  NameChanged,
  FetchMachineGEN,
  CodeChanged,
  AddMachineBoss,
  costChanged,
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
      checked: false,
    };
  }

  async componentDidMount() {
    //componentDidMount
    var person = await AsyncStorage.getItem('loginToken');
    person = JSON.parse(person);
    this.props.FetchMachineGEN(person);
  }
  getProfiles() {
    return this.state.Profiles.Partner;
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

  onScrollEnd(e) {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    console.log('scrolled to page ', pageNum);
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
        // style={{height: '72%'}}
        data={this.props.items.filter(items => {
          return (
            items.Name.toLowerCase().indexOf(this.props.name.toLowerCase()) !==
            -1
          );
        })}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => this.renderRow(item, index)}
        onMomentumScrollEnd={this.onScrollEnd}
        onRefresh={() => this.renderRefreshControl()}
        refreshing={this.props.Loader}
      />
    );
  }

  renderRow(item, index) {
    return (
      <MachineListG
        sites={this.props.sites}
        navigation={this.props.navigation}
        item={item}
        index={index}
      />
    );
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <NavigationEvents
            onDidFocus={async () => {
              var person = await AsyncStorage.getItem('loginToken');
              person = JSON.parse(person);
              this.props.FetchMachineGEN(person);
            }}
          />

          {this.renderList()}
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
  };
};

export default connect(
  mapStateToProps,
  {NameChanged, FetchMachineGEN, CodeChanged, AddMachineBoss, costChanged},
)(MachineHomeManagerView);
