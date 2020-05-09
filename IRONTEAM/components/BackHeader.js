import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {VARIABLES} from '../utils/Variables';

const BackHeader = props => {
  return (
    <SafeAreaView
      style={[
        styles.viewStyle,
        {backgroundColor: VARIABLES.Color, opacity: 0.8},
      ]}>
      <View style={{marginLeft: 10, marginBottom: 10}}>
        <Text style={{color: 'white', fontSize: 20}}>{props.TITLE}</Text>
      </View>
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          margin: 'auto',
          marginLeft: 10,
          marginRight: 10,
        }}>
        <Icon name="cogs" size={20} color={'white'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    top: Platform.OS === 'ios' ? 0 : 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    //height: 50,
  },
});

export {BackHeader};
