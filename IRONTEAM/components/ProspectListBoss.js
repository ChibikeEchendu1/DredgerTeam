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

import ProgressBarAnimated from 'react-native-progress-bar-animated';

const barWidth = Dimensions.get('screen').width - 40;

class ProspectListBoss extends Component {
  constructor(props) {
    super(props);

    this.state = {namegoogle: '', emailgoogle: ''};
  }

  render() {
    return (
      <View style={{marginTop: 10, flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('ProspectHomeMarketer', {
              Prospect: this.props.item,
            });
          }}>
          <View>
            <Text
              style={{
                color: this.props.item.Founder == '-1' ? 'red' : 'black',
              }}>
              Name: {this.props.item.Name}
            </Text>
            <Text>Address: {this.props.item.Address}</Text>
            <Text>Product: {this.props.item.Product}</Text>

            <ProgressBarAnimated
              width={barWidth}
              value={this.props.item.Persentage}
              backgroundColor={Colorlize(this.props.item.Persentage)}
              backgroundColorOnComplete="#6CC644"
            />
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
)(ProspectListBoss);
