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
import {callNumber} from '../actions';
import _ from 'lodash';
import {Input, Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {VARIABLES} from '../utils/Variables';
import Normalize from '../utils/Normalize';
import Colorlize from '../utils/Colorlize';

import ProgressBarAnimated from 'react-native-progress-bar-animated';

const barWidth = Dimensions.get('screen').width - 40;

class MyContactList extends Component {
  constructor(props) {
    super(props);

    this.state = {namegoogle: '', emailgoogle: '', value: 20};
  }

  renderView() {
    if (this.props.item.Sand || this.props.item.fuel) {
      return (
        <View>
          <Text style={{color: 'white'}}>
            Machine: {this.props.item.MachineName}
          </Text>

          <Text style={{color: 'white'}}>
            Estimated Fuel: {this.props.item.fuel}
          </Text>

          <Text style={{color: 'white'}}>
            Estimated Sand: {this.props.item.Sand}
          </Text>

          <Text style={{color: 'white'}}>
            Time Worked: {this.props.item.HoursToday} hrs{' '}
            {this.props.item.minsToday} mins
          </Text>
        </View>
      );
    } else if (this.props.item.Money || this.props.item.Total) {
      return (
        <View>
          <Text style={{color: 'white'}}>
            Total Trucks: {this.props.item.Total}
          </Text>

          <Text style={{color: 'white'}}>
            Five Ton Trucks: {this.props.item.fiveTtotal}
          </Text>
          <Text style={{color: 'white'}}>
            Ten Ton Trucks: {this.props.item.tenTtotal}
          </Text>
          <Text style={{color: 'white'}}>
            Fifteen Ton Trucks: {this.props.item.fifteenTtotal}
          </Text>
          <Text style={{color: 'white'}}>
            Thirty Ton Trucks: {this.props.item.thirtyTtotal}
          </Text>
        </View>
      );
    } else if (this.props.item.expenseTally) {
      return (
        <View>
          <Text style={{color: 'white'}}>
            Todays Expenses: {this.props.item.expenseTally}
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View
        style={{
          marginTop: 3,
          flex: 1,
          marginLeft: 7,
        }}>
        <Card containerStyle={{backgroundColor: '#8E8E93'}}>
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '90%'}}>
              <Text style={{color: 'white'}}>
                Name: {this.props.item.StaffName}
              </Text>
              <Text style={{color: 'white', marginBottom: 20}}>
                Date: {this.props.item.Date}
              </Text>
              {this.renderView()}
            </View>
          </TouchableOpacity>
        </Card>
      </View>
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
  {callNumber},
)(MyContactList);
