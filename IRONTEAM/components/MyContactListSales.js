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
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {VARIABLES} from '../utils/Variables';
import Normalize from '../utils/Normalize';
import Colorlize from '../utils/Colorlize';

import ProgressBarAnimated from 'react-native-progress-bar-animated';

const barWidth = Dimensions.get('screen').width - 40;

class MyContactListSales extends Component {
  constructor(props) {
    super(props);

    this.state = {namegoogle: '', emailgoogle: '', value: 20};
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
          <Text
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            Total: {this.props.item.Money} ({this.props.item.Total})
          </Text>
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '90%'}}>
              <Text style={{color: 'white', marginTop: 7}}>
                5 Ton: {this.props.item.fiveTMoney} (
                {this.props.item.fiveTtotal})
              </Text>
              <Text style={{color: 'white'}}>
                10 Ton: {this.props.item.tenTMoney} ({this.props.item.tenTtotal}
                )
              </Text>
              <Text style={{color: 'white'}}>
                15 Ton: {this.props.item.fifteenTMoney} (
                {this.props.item.fifteenTtotal})
              </Text>
              <Text style={{color: 'white'}}>
                30 Ton: {this.props.item.thirtyTMoney} (
                {this.props.item.thirtyTtotal})
              </Text>
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
)(MyContactListSales);
