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
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {VARIABLES} from '../utils/Variables';
import Normalize from '../utils/Normalize';
import Colorlize from '../utils/Colorlize';
import {Rating, AirbnbRating} from 'react-native-ratings';

import ProgressBarAnimated from 'react-native-progress-bar-animated';

const barWidth = Dimensions.get('screen').width - 40;

class ReportList extends Component {
  constructor(props) {
    super(props);

    this.state = {namegoogle: '', emailgoogle: '', value: 20};
  }

  render() {
    return (
      <View style={{marginTop: 25, flex: 1, marginLeft: 7}}>
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '90%'}}>
            <Text
              style={{
                marginTop: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              Rating:
              <Rating
                ratingCount={this.props.item.Stars}
                type="rocket"
                imageSize={20}
                readonly={true}
                ratingColor={VARIABLES.Color}
                startingValue={this.props.item.Stars}
              />
            </Text>
            <Text style={{}}>Type: {this.props.item.Type}</Text>
            <Text style={{}}>Date: {this.props.item.Date}</Text>
            <Text style={{}}>Report: {this.props.item.FeedBack}</Text>
          </View>
        </TouchableOpacity>
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
)(ReportList);
