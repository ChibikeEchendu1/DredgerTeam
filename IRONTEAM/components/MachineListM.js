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

import ProgressBarAnimated from 'react-native-progress-bar-animated';

const barWidth = Dimensions.get('screen').width - 40;

class MachineListM extends Component {
  constructor(props) {
    super(props);

    this.state = {namegoogle: '', emailgoogle: '', value: 20};
  }

  render() {
    return (
      <Card style={{marginTop: 20, flex: 1, marginLeft: 7}}>
        <TouchableOpacity
          onPress={() => {
            console.log('nave');

            this.props.navigation.navigate('MachineHomeM', {
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
          <Icon
            name="circle"
            color={
              this.props.item.State == 0
                ? 'red'
                : this.props.item.State == 1
                ? 'orange'
                : 'green'
            }
          />
          <View style={{width: '90%'}}>
            <Text style={{color: this.props.item.Fired ? 'red' : 'bleck'}}>
              Name: {this.props.item.Name}
            </Text>
            <Text style={{color: this.props.item.Fired ? 'red' : 'bleck'}}>
              HireingCost: {this.props.item.HireingCost}
            </Text>
            <Text style={{color: this.props.item.Fired ? 'red' : 'bleck'}}>
              Site Name: {this.props.item.SiteName}
            </Text>
            <Text style={{color: this.props.item.Fired ? 'red' : 'bleck'}}>
              Site Address: {this.props.item.SiteAddress}
            </Text>
            <Text>Operators: {this.props.item.Operators.join(', ')}</Text>
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
)(MachineListM);
