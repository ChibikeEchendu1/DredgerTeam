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

class MyContactListDetailed extends Component {
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
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Day', {
                Prospect: this.props.item,
              });
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '90%'}}>
              <Text style={{color: 'white'}}>Date: {this.props.item.Date}</Text>
              <Text style={{color: 'white'}}>
                Hours Total: {this.props.item.HoursTotal}
              </Text>

              <Text style={{color: 'white'}}>
                Sales: {this.props.item.salesTally}
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
)(MyContactListDetailed);
