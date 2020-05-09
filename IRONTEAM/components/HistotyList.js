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

const barWidth = Dimensions.get('screen').width - 60;

class HistotyList extends Component {
  constructor(props) {
    super(props);

    this.state = {namegoogle: '', emailgoogle: '', value: 20};
  }

  render() {
    return (
      <Card style={{marginTop: 20, flex: 1, marginLeft: 7}}>
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '90%'}}>
            <Text style={{alignSelf: 'center'}}>
              From: {this.props.item.From} - {this.props.item.Till}
            </Text>
            <Text style={{color: this.props.item.Fired ? 'red' : 'bleck'}}>
              Total Dredging Time: {Math.round(this.props.item.Hours / 60)} hrs{' '}
              {this.props.item.Hours -
                Math.floor(this.props.item.Hours / 60) * 60}{' '}
              mins
            </Text>
            <Text style={{color: this.props.item.Fired ? 'red' : 'bleck'}}>
              Five Ton: {this.props.item.fiveTMoneytotal} (
              {this.props.item.fiveTtotal})
            </Text>
            <Text style={{color: this.props.item.Fired ? 'red' : 'bleck'}}>
              Ten Ton: {this.props.item.tenTMoneytotal} (
              {this.props.item.tenTtotal})
            </Text>
            <Text style={{color: this.props.item.Fired ? 'red' : 'bleck'}}>
              Fifteen Ton: {this.props.item.fifteenTMoneytotal} (
              {this.props.item.fifteenTtotal})
            </Text>
            <Text style={{color: this.props.item.Fired ? 'red' : 'bleck'}}>
              Thirty Ton: {this.props.item.thirtyTMoneytotal} (
              {this.props.item.thirtyTtotal})
            </Text>
            <Text style={{color: this.props.item.Fired ? 'red' : 'bleck'}}>
              Total Sales: {this.props.item.endingBalance} (
              {this.props.item.TotalTruck})
            </Text>
            <Text style={{color: this.props.item.Fired ? 'red' : 'bleck'}}>
              Total Expense: {this.props.item.expenseTotal}
            </Text>
          </View>
        </TouchableOpacity>
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
)(HistotyList);
