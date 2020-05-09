/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {VARIABLES} from '../utils/Variables';
import ProfileSectionMachine from './ProfileSectionMachine';

import MyContactList from './MyContactList';
import {Input, Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NameChanged, FetchMyProspects, fetchShifts} from '../actions';
import {connect} from 'react-redux';

class MachineHomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EmailError: '',
      PasswordError: '',
      Profiles: {Partner: []},
      isLoading: false,
      Prospect: this.props.navigation.state.params.Prospect,
      sites: this.props.navigation.state.params.sites,
    };
  }

  componentDidMount() {
    this.props.fetchShifts(this.state.Prospect);
  }

  getProfiles() {
    return this.state.Profiles.Partner;
  }

  renderRefreshControl() {
    this.setState({isLoading: true});
  }

  onNameC(text) {
    this.props.NameChanged(text);
  }
  renderList() {
    if (this.props.Loader) {
      return (
        <ActivityIndicator
          style={{
            marginTop: 10,
            alignSelf: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
          color={VARIABLES.Color}
          size={'large'}
        />
      ); //
    }
    return (
      <FlatList
        style={{height: '72%'}}
        data={this.props.days.reverse().filter(items => {
          return (
            items.Date.toLowerCase().indexOf(this.props.name.toLowerCase()) !==
            -1
          );
        })}
        renderItem={({item}) => this.renderRow(item)}
        keyExtractor={(item, index) => index}
        onRefresh={() => this.renderRefreshControl()}
        refreshing={this.props.Loader}
        initialNumToRender={8}
      />
    );
  }

  renderRow(item) {
    return <MyContactList navigation={this.props.navigation} item={item} />;
  }
  onButtonPress() {
    this.props.navigation.navigate('Operator', {Prospect: this.state.Prospect});
  }
  onButtonPress2() {
    this.props.navigation.navigate('ROperator', {
      Prospect: this.state.Prospect,
    });
  }

  getDateTime() {
    var date = new Date();
    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? '0' : '') + month;

    var day = date.getDate();
    day = (day < 10 ? '0' : '') + day;

    return month + '/' + day + '/' + year;
  }
  renderText(text) {
    if (this.props.Loader) {
      return (
        <ActivityIndicator
          style={{marginTop: 10, alignSelf: 'center'}}
          color={VARIABLES.Color}
          size={'small'}
        />
      ); //
    } else {
      return <Text style={{marginTop: 10}}>{text}</Text>;
    }
  }
  render() {
    const dt1 = new Date(this.state.Prospect.MaintanaceDate);
    const dt2 = new Date(this.getDateTime());
    const diffDays = Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24),
    );
    console.log(diffDays, dt1, dt2);

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <Card>
            <ProfileSectionMachine
              navigation={this.props.navigation}
              Profile={this.state.Prospect}
              sites={this.state.sites}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 15,
              }}>
              <Button
                onPress={this.onButtonPress.bind(this)}
                title="Add Operator"
                type="outline"
                raised
                containerStyle={{alignSelf: 'center', width: '45%'}}
                titleStyle={{color: 'white'}}
                buttonStyle={{
                  backgroundColor: VARIABLES.Color,
                  borderColor: VARIABLES.Color,
                  width: '100%',
                }}
              />
              <Button
                onPress={this.onButtonPress2.bind(this)}
                title="Remove Operator"
                type="outline"
                raised
                containerStyle={{alignSelf: 'center', width: '45%'}}
                titleStyle={{color: 'white'}}
                buttonStyle={{
                  backgroundColor: VARIABLES.Color,
                  borderColor: VARIABLES.Color,
                  width: '100%',
                }}
              />
            </View>
          </Card>
          <Card>
            <Text
              style={{
                fontSize: 16,
                textDecorationLine: 'underline',
                fontWeight: 'bold',
              }}>
              MAINTENANCE
            </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text
                style={{
                  marginTop: 10,
                  marginRight: 10,
                }}>
                Last Maintenance:
              </Text>
              {this.renderText(this.state.Prospect.MaintanaceDate)}
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text
                style={{
                  marginTop: 4,
                  marginRight: 10,
                }}>
                Maintenance required In:{' '}
                {this.state.Prospect.MaintainEvery - diffDays} days
              </Text>
            </View>
            <Button
              onPress={this.onButtonPress.bind(this)}
              title={'Start Maintenance'}
              type="outline"
              raised
              containerStyle={{
                marginTop: 5,
                alignSelf: 'flex-end',
                width: '50%',
              }}
              titleStyle={{color: 'white'}}
              buttonStyle={{
                backgroundColor: VARIABLES.Color,
                borderColor: VARIABLES.Color,
                width: '100%',
              }}
            />
          </Card>
          <Input
            placeholder="...Search Name"
            leftIcon={<Icon name="search" size={20} color={VARIABLES.Color} />}
            containerStyle={{width: '80%', marginTop: 20}}
            value={this.props.name}
            onChangeText={this.onNameC.bind(this)}
            errorStyle={{color: 'red', marginLeft: '5%'}}
            inputStyle={{marginLeft: 5}}
            errorMessage={this.props.NameError}
            inputContainerStyle={{width: '100%'}}
          />
          {this.renderList()}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

//GetCart(this.props.auth.Cart, this.props.create.Market),
const mapStateToProps = state => {
  return {
    items: state.auth.items,
    Loader: state.auth.Loader,
    name: state.auth.name,
    days: state.auth.days,
  };
};

export default connect(
  mapStateToProps,
  {NameChanged, FetchMyProspects, fetchShifts},
)(MachineHomeView);
