import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {verifyreprot} from '../actions';
import _ from 'lodash';
import {Input, Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {VARIABLES} from '../utils/Variables';
import Normalize from '../utils/Normalize';
import Colorlize from '../utils/Colorlize';

import ProgressBarAnimated from 'react-native-progress-bar-animated';

const barWidth = Dimensions.get('screen').width - 40;

class ReportsList extends Component {
  constructor(props) {
    super(props);

    this.state = {namegoogle: '', emailgoogle: '', value: 20, lol: false};
  }

  onButtonPress() {
    this.props.verifyreprot(this.props.index, this.props.item);
  }

  renderView() {
    if (this.props.index == this.props.index2) {
      return (
        <ActivityIndicator
          style={styles.tab}
          color={VARIABLES.Color}
          size={'large'}
        />
      );
    }
    return (
      <Button
        onPress={this.onButtonPress.bind(this)}
        title="Verify Report "
        type="outline"
        raised
        containerStyle={{
          marginTop: 20,
          width: '50%',
          marginLeft: '6.6%',
          alignSelf: 'flex-end',
        }}
        titleStyle={{color: 'white'}}
        buttonStyle={{
          backgroundColor: VARIABLES.Color,
          borderColor: VARIABLES.Color,
          width: '100%',
        }}
      />
    );
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
                Name: {this.props.item.SenderName}
              </Text>
              <Text style={{color: 'white'}}>Date: {this.props.item.Date}</Text>
              <Text style={{color: 'white'}}>
                Report: {this.props.item.FeedBack}
              </Text>
            </View>
          </TouchableOpacity>
          {this.renderView()}
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
    index2: state.auth.index2,
  };
};

export default connect(
  mapStateToProps,
  {verifyreprot},
)(ReportsList);
