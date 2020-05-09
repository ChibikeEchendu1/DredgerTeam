import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {VARIABLES} from '../utils/Variables';

const Footer = props => {
  return (
    <View style={styles.viewStyle}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => props.navigation.navigate('Addprofile', {Id: props.Id})}>
        <Icon
          name="plus-circle"
          color={'white'}
          size={30}
          style={{alignSelf: 'center'}}
        />
        <View>
          <Text style={{fontSize: 15, color: '#fff'}}>Add Profile</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    opacity: 0.8,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '15%',
    backgroundColor: VARIABLES.Color,
  },
});

export {Footer};
