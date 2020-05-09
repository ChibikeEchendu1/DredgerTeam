import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {loginUserGoogle} from '../actions';
import _ from 'lodash';
import {Input, Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {VARIABLES} from '../utils/Variables';
import Normalize from '../utils/Normalize';
import Colorlize from '../utils/Colorlize';

import ProgressBarAnimated from 'react-native-progress-bar-animated';

const barWidth = Dimensions.get('screen').width - 40;

class StaffMachineList extends Component {
  constructor(props) {
    super(props);

    this.state = {namegoogle: '', emailgoogle: '', value: 20};
  }

  render() {
    return (
      <Card>
        <View style={{flex: 1, marginLeft: 7}}>
          <TouchableOpacity
            onPress={() => {
              console.log('nave');

              this.props.navigation.navigate(this.props.type, {
                Prospect: this.props.item,
                sites: this.props.sites,
              });
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '90%'}}>
              <Text>Name: {this.props.item.Name}</Text>
            </View>
            <Icon name="chevron-right" size={20} color="black" />
          </TouchableOpacity>
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
  };
};

export default connect(
  mapStateToProps,
  {loginUserGoogle},
)(StaffMachineList);
