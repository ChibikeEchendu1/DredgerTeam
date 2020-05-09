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
import {Input, Button, Card, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {INSPECTIONS} from '../utils/INSPECTIONS';

import ProgressBarAnimated from 'react-native-progress-bar-animated';

const barWidth = Dimensions.get('screen').width - 40;

class MachineListI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namegoogle: '',
      emailgoogle: '',
      value: 20,
      show: false,
      checks: new Array(INSPECTIONS.length).fill(false),
    };
  }

  renderTypes() {
    return _.map(INSPECTIONS, ({label, value}, index) => {
      return (
        <CheckBox
          center
          title={label}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={this.props.inspections[this.props.index][index]}
          containerStyle={{
            height: 10,
            marginTop: 10,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
          onPress={() => {
            this.props.inspections[this.props.index][index] = !this.props
              .inspections[this.props.index][index];
            console.log(this.props.inspections);
            this.setState(prevState => ({
              checks: {
                ...prevState.checks,
                [prevState.checks[index]]: !prevState.checks[index],
              },
            }));
          }}
        />
      );
    });
  }

  render() {
    return (
      <Card>
        <TouchableOpacity
          onPress={() => this.setState({show: !this.state.show})}
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
          </View>
        </TouchableOpacity>
        <View
          style={{
            display: this.state.show ? 'flex' : 'none',
          }}>
          {this.renderTypes()}
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
    inspections: state.auth.inspections,
  };
};

export default connect(
  mapStateToProps,
  {loginUserGoogle},
)(MachineListI);
