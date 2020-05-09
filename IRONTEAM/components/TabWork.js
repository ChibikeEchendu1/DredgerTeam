/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {VARIABLES} from '../utils/Variables';
import AsyncStorage from '@react-native-community/async-storage';
import Normalize from '../utils/Normalize';
import {Card} from 'react-native-elements';
const initialLayout = {
  width: Dimensions.get('window').width,
};
const SCREENWIDTH = Dimensions.get('window').width;
const TabViewExample = props => {
  const FirstRoute = () => (
    <FlatList
      style={{height: '62%'}}
      data={props.Items}
      renderItem={({item}) => renderRow(item)}
      keyExtractor={(item, index) => index}
      onRefresh={() => renderRefreshControl()}
      refreshing={props.Loader}
      initialNumToRender={8}
    />
  );

  const ThirddRoute = () => (
    <FlatList
      style={{height: '62%'}}
      data={props.requesr}
      renderItem={({item}) => renderRow2(item)}
      keyExtractor={(item, index) => index}
      onRefresh={() => renderRefreshControl()}
      refreshing={props.Loader}
      initialNumToRender={8}
    />
  );

  const ForthRoute = () => (
    <FlatList
      style={{height: '62%'}}
      data={props.bug}
      renderItem={({item}) => renderRow3(item)}
      keyExtractor={(item, index) => index}
      onRefresh={() => renderRefreshControl()}
      refreshing={props.Loader}
      initialNumToRender={8}
    />
  );

  const renderRefreshControl = () => {
    console.log('lol');
  };
  ///QANDA

  ///Request
  const renderRow2 = item => {
    return (
      <Card>
        <TouchableOpacity
          onPress={async () => {
            props.navigation.navigate({
              routeName: 'StoreItem',
              params: {
                item: item,
                Waiting: 0,
              },
            });
          }}
          style={{width: SCREENWIDTH}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: SCREENWIDTH,
              justifyContent: 'space-between',
              marginLeft: 20,
            }}>
            <View>
              <Text
                style={{
                  // alignSelf: 'center',
                  //marginBottom: 10,
                  width: '90%',

                  fontSize: Normalize(15),
                }}>
                {item.Item}
              </Text>
              <Text
                style={{
                  // alignSelf: 'center',
                  //marginBottom: 10,

                  fontSize: Normalize(15),
                }}>
                {item.Report}
              </Text>
              <Text
                style={{
                  // alignSelf: 'center',
                  //marginBottom: 10,
                  width: '90%',

                  fontSize: Normalize(15),
                }}>
                {'Quantity: '}
                {item.Quantity}{' '}
              </Text>
              <Text
                style={{
                  // alignSelf: 'center',
                  //marginBottom: 10,
                  width: '90%',

                  fontSize: Normalize(15),
                }}>
                Price {item.Price * item.Quantity}{' '}
              </Text>
              <Text
                style={{
                  // alignSelf: 'center',
                  //marginBottom: 10,
                  width: '100%',

                  fontSize: Normalize(15),
                }}>
                Date: {item.Date}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  const renderRow3 = item => {
    return (
      <Card>
        <TouchableOpacity
          onPress={async () => {
            props.navigation.navigate({
              routeName: 'StoreItem',
              params: {
                item: item,
                Waiting: 0,
              },
            });
          }}
          style={{width: SCREENWIDTH}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: SCREENWIDTH,
              justifyContent: 'space-between',
              marginLeft: 20,
            }}>
            <View>
              <Text
                style={{
                  // alignSelf: 'center',
                  //marginBottom: 10,
                  width: '90%',

                  fontSize: Normalize(15),
                }}>
                {'Report: '}
                {item.SenderName}{' '}
              </Text>
              <Text
                style={{
                  // alignSelf: 'center',
                  //marginBottom: 10,

                  fontSize: Normalize(15),
                }}>
                {item.FeedBack}
              </Text>

              <Text
                style={{
                  // alignSelf: 'center',
                  //marginBottom: 10,
                  width: '90%',

                  fontSize: Normalize(15),
                }}>
                {'Date: '}
                {item.Date}{' '}
              </Text>
              <Text
                style={{
                  // alignSelf: 'center',
                  //marginBottom: 10,
                  width: '90%',

                  fontSize: Normalize(15),
                }}>
                {item.Type}{' '}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };
  ///Comment
  const renderRow = item => {
    return (
      <Card>
        <TouchableOpacity
          onPress={async () => {
            props.navigation.navigate({
              routeName: 'StoreItem',
              params: {
                item: item,
              },
            });
          }}
          style={{width: SCREENWIDTH}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: SCREENWIDTH,
              justifyContent: 'space-between',
              marginLeft: 20,
            }}>
            <View>
              <Text
                style={{
                  // alignSelf: 'center',
                  //marginBottom: 10,
                  width: '90%',

                  fontSize: Normalize(15),
                }}>
                {'Comment '}
                {item.Comment}{' '}
              </Text>
              <Text
                style={{
                  // alignSelf: 'center',
                  //marginBottom: 10,
                  fontSize: Normalize(15),
                }}>
                {'Date '}
                {item.Date}{' '}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Comments'},
    // {key: 'second', title: 'Q&A'},
    {key: 'third', title: 'Expense'},
    {key: 'forth', title: 'Reports'},
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    third: ThirddRoute,
    forth: ForthRoute,
  });

  return (
    <TabView
      renderTabBar={props => (
        <TabBar
          indicatorStyle={{backgroundColor: 'white'}}
          tabStyle={{backgroundColor: VARIABLES.Color}}
          {...props}
        />
      )}
      activeColor="red"
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

export {TabViewExample};
