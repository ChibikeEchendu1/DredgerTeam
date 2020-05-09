import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {loginUserGoogle} from '../actions';
import _ from 'lodash';
import {Input, Button, Card, normalize} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {VARIABLES} from '../utils/Variables';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

const barWidth = Dimensions.get('screen').width - 60;

class BreackDown extends Component {
  constructor(props) {
    super(props);
    this.state = {namegoogle: '', emailgoogle: '', value: 20};
  }

  renderpands() {
    return _.map(this.props.item.Parts, ({Size, Price}, index) => {
      return (
        <View
          style={{
            display: 'flex',
            marginTop: 2,
            paddingBottom: 5,
          }}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text>No {index}: </Text>
            <Text>Part: {Size}</Text>
            <Text>Price: {Price}</Text>
          </View>
        </View>
      );
    });
  }

  render() {
    return (
      <Card style={{marginTop: 20, flex: 1, marginLeft: 7}}>
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Image
            resizeMode="cover"
            style={{
              width: normalize(200),
              height: normalize(200),
            }}
            source={{
              uri: VARIABLES.IP + '/' + this.props.item.ImagesPath,
            }}
          />

          <View style={{width: '90%'}}>
            <Text>
              Machine: {this.props.item.senderName} ({this.props.item.SiteName})
            </Text>
            <Text>Date: {this.props.item.Date}</Text>
            <Text>Description: {this.props.item.Description}</Text>
            <Text style={{marginBottom: 20}}>
              WorkmanShip ₦{this.props.item.WorkmanShip}
            </Text>
          </View>
          {this.renderpands()}
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
)(BreackDown);
