import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
import ProgressBarAnimated from 'react-native-progress-bar-animated';

const barWidth = Dimensions.get('screen').width - 60;

class SiteList extends Component {
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

            this.props.navigation.navigate('SiteHome', {
              Prospect: this.props.item,
              sites: this.props.sites,
            });
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              marginBottom: 10,
              fontSize: 16,
              textDecorationLine: 'underline',
            }}>
            {this.props.item.SiteName}
          </Text>
          <View style={{width: '90%'}}>
            <Text>Site Address: {this.props.item.SiteAddress}</Text>
            <Text>
              StaffBalance:{' ₦'}
              {(this.props.item.salesSession * this.props.item.StaffBalance) /
                100 || 0}
            </Text>
            <Text style={{marginTop: 20}}>
              Money Since Begging: ₦{this.props.item.HereComesTheMoney}
            </Text>
            <Text>
              Expense Since Begging: ₦{this.props.item.HereComesTheExpense}
            </Text>
            <Text>
              Net Since Begging: ₦
              {this.props.item.HereComesTheMoney -
                this.props.item.HereComesTheExpense}
            </Text>
            <Text style={{marginTop: 5}}>
              Money Since Session: ₦{this.props.item.salesSession || 0}
            </Text>
            <Text>
              Expense Since Session: ₦{this.props.item.expenseTotal || 0}
            </Text>
            <Text>
              Net Since Session: ₦
              {this.props.item.salesSession - this.props.item.expenseTotal || 0}
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
)(SiteList);
