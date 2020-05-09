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
import BossSection from './BossSection';
import BossHeader from './BossHeader';
import Modal, {
  ModalFooter,
  ModalButton,
  ModalContent,
  SlideAnimation,
} from 'react-native-modals';
import MachineListM from './MachineListM';
import {Input, Button, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  NameChanged,
  FetchMachineManager,
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
    var person = await AsyncStorage.getItem('MANToken');
    person = JSON.parse(person);
    this.props.FetchMachineManager(person.Site);
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
        renderItem={({item}) => this.renderRow(item)}
        keyExtractor={(item, index) => index}
        onRefresh={() => this.renderRefreshControl()}
        refreshing={this.props.Loader}
        initialNumToRender={8}
      />
    );
  }

  renderContent() {
    if (this.props.sites.length == 0) {
      return (
        <Text
          style={{
            display: 'flex',
            alignSelf: 'center',
            marginBottom: 20,
            color: this.state.flip == 0 ? 'black' : 'red',
          }}>
          NO SITE
        </Text>
      ); //
    }
    return (
      <View>
        <Text
          style={{
            display: 'flex',
            alignSelf: 'center',
            marginBottom: 20,
          }}>
          Add Machine
        </Text>
        <Input
          placeholder="Name"
          onChangeText={this.onCodeC.bind(this)}
          value={this.props.Code}
          inputStyle={{marginLeft: 7}}
          errorStyle={{color: 'red', marginLeft: '5%'}}
          errorMessage={this.props.CodeError}
          inputContainerStyle={{
            width: '90%',
            alignSelf: 'center',
          }}
        />
        <Input
          placeholder="Hiring Cost"
          onChangeText={this.onHodeC.bind(this)}
          value={this.props.cost}
          inputStyle={{marginLeft: 7}}
          errorStyle={{color: 'red', marginLeft: '5%'}}
          errorMessage={this.props.CodeError}
          keyboardType="number-pad"
          inputContainerStyle={{
            width: '90%',
            alignSelf: 'center',
            marginBottom: 5,
          }}
        />
        <CheckBox
          center
          title="Click Here"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={this.state.checked}
          onPress={() => this.setState({checked: !this.state.checked})}
        />
        <RNPickerSelect
          onValueChange={value => this.setState({Site: value})}
          style={pickerSelectStyles}
          placeholder={placeholder2}
          items={this.props.sites.map(function(row, index) {
            // This function defines the "mapping behaviour". name and title
            // data from each "row" from your columns array is mapped to a
            // corresponding item in the new "options" array
            return {
              value: index,
              label: row.SiteName + ' ' + row.SiteAddress,
            };
          })}
        />
      </View>
    );
  }

  renderRow(item) {
    return (
      <MachineListM
        sites={this.props.sites}
        navigation={this.props.navigation}
        item={item}
      />
    );
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <NavigationEvents
            onDidFocus={async () => {
              var person = await AsyncStorage.getItem('MANToken');
              person = JSON.parse(person);
              this.props.FetchMachineManager(person.Site);
            }}
          />
          <Input
            placeholder="...Search Name"
            leftIcon={<Icon name="search" size={20} color={VARIABLES.Color} />}
            containerStyle={{width: '80%', marginTop: '5%'}}
            value={this.props.name}
            onChangeText={this.onNameC.bind(this)}
            errorStyle={{color: 'red', marginLeft: '5%'}}
            inputStyle={{marginLeft: 5}}
            errorMessage={this.props.NameError}
            inputContainerStyle={{width: '100%'}}
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
  {NameChanged, FetchMachineManager, CodeChanged, AddMachineBoss, costChanged},
)(MachineHomeManagerView);
