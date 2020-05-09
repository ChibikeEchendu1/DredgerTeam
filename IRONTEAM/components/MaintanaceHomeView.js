import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {emailChanged, AddReport} from '../actions';
import _ from 'lodash';
import {Input, Button, Card, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {INSPECTIONS} from '../utils/INSPECTIONS';
import {VARIABLES} from '../utils/Variables';

import ProgressBarAnimated from 'react-native-progress-bar-animated';

const barWidth = Dimensions.get('screen').width - 40;

class MaintanaceHomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namegoogle: '',
      emailgoogle: '',
      value: 20,
      isLoading: false,
      checks: new Array(INSPECTIONS.length).fill(false),
      item: this.props.navigation.state.params.item,
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
          checked={this.props.inspections2[index]}
          containerStyle={{
            height: 10,
            marginTop: 10,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
          onPress={() => {
            console.log(this.props.inspections2);

            this.props.inspections2[index] = !this.props.inspections2[index];
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

  onSummeryC(text) {
    this.props.emailChanged(text);
  }

  renderRow(item, index) {
    return (
      <CheckBox
        center
        title={item.label}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={this.props.inspections2[index]}
        containerStyle={{
          height: 10,
          marginTop: 10,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
        onPress={() => {
          console.log(this.props.inspections2);

          this.props.inspections2[index] = !this.props.inspections2[index];
          this.setState(prevState => ({
            checks: {
              ...prevState.checks,
              [prevState.checks[index]]: !prevState.checks[index],
            },
          }));
        }}
      />
    );
  }
  renderRefreshControl() {
    this.setState({isLoading: true});
  }

  added() {
    if (this.props.Added) {
      this.props.navigation.navigate('MachineHomeGeneral', {
        Prospect: this.state.Prospect,
      });
    }
  }

  onButtonPress() {
    const {email, name, tot, Type} = this.props;
    const {Rating, item} = this.state;

    if (email == '') {
      this.setState({Error: 'Enter All Feilds'});
    } else {
      this.setState({Error: ''});
      this.props.AddReport(email, item);
    }
  }

  renderList() {
    if (this.props.Loader) {
      return (
        <ActivityIndicator
          style={styles.tab}
          color={VARIABLES.Color}
          size={'large'}
        />
      ); //
    }
    return (
      <FlatList
        style={{height: '50%'}}
        data={INSPECTIONS}
        renderItem={({item, index}) => this.renderRow(item, index)}
        keyExtractor={(item, index) => index}
        onRefresh={() => this.renderRefreshControl()}
        refreshing={this.props.Loader}
        initialNumToRender={8}
      />
    );
  }

  renderSend() {
    if (this.props.Loader) {
      return null;
    }
    return (
      <Button
        onPress={this.onButtonPress.bind(this)}
        title="Done"
        type="outline"
        raised
        containerStyle={{
          marginTop: 20,

          width: '40%',
        }}
        titleStyle={{color: 'white', marginRight: 10}}
        buttonStyle={{
          backgroundColor: VARIABLES.Color,
          borderColor: VARIABLES.Color,
          width: '100%',
        }}
        icon={<Icon name="check-circle" size={20} color="white" />}
        iconRight
      />
    );
  }

  render() {
    return (
      <View>
        <View
          style={{height: '40%', display: 'flex', justifyContent: 'center'}}>
          <Card>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Icon
                name="circle"
                color={
                  this.state.item.State == 0
                    ? 'red'
                    : this.state.item.State == 1
                    ? 'orange'
                    : 'green'
                }
              />
              <View style={{width: '90%'}}>
                <Text>Name: {this.state.item.Name}</Text>
              </View>
            </View>
          </Card>
          <Card containerStyle={{height: '60%'}}>
            <TextInput
              style={{
                textAlignVertical: 'top',
                height: '100%',
                width: '90%',
                alignSelf: 'center',
                borderColor: 'gray',
                borderWidth: 1,
                paddingLeft: 20,
              }}
              placeholder="Enter all issues here"
              multiline={true}
              numberOfLines={20}
              onChangeText={this.onSummeryC.bind(this)}
              value={this.props.email}
            />
          </Card>
        </View>
        <Card>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{width: '60%'}}>
              <Text>USE CHECK LIST AS A GUIDE</Text>
            </View>
            {this.renderSend()}
          </View>
        </Card>
        {this.added()}
        {this.renderList()}
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
    inspections: state.auth.inspections,
    email: state.auth.email,
    Added: state.auth.Added,
    inspections2: state.auth.inspections2,
  };
};

export default connect(
  mapStateToProps,
  {emailChanged, AddReport},
)(MaintanaceHomeView);
