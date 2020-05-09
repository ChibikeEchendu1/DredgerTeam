/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Variables, {VARIABLES} from './utils/Variables';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignupScreen from './screens/SignupScreen';
import MarketerHome from './screens/MarketerHome';
import MachineHome from './screens/MachineHome';
import MachineHomeManager from './screens/MachineHomeManager';
import MachineHomeGeneral from './screens/MachineHomeGeneral';
import MachineHomeM from './screens/MachineHomeM';
import ROperator from './screens/ROperator';
import TasksHomeManager from './screens/TasksHomeManager';
import Sales from './screens/Sales';
import SiteHome from './screens/SiteHome';
import ProspectHome from './screens/ProspectHome';
import CashierHome from './screens/CashierHome';
import TakePicture from './screens/TakePicture';
import MaintanaceHome from './screens/MaintanaceHome';
import ManagerHome from './screens/ManagerHome';
import Operator from './screens/Operator';
import Issue from './screens/Issue';
import OperationsHomeManager from './screens/OperationsHomeManager';
import AddContact from './screens/AddContact';
import Meeting from './screens/Meeting';
import Inspection from './screens/Inspection';
import Request from './screens/Request';
import Statistics from './screens/Statistics';
import CommentsScreen from './screens/CommentsScreen';
import CommentsScreenBoss from './screens/CommentsScreenBoss';
import {connect} from 'react-redux';
import Payment from './screens/Payment';
import BossScreen from './screens/BossScreen';
import SiteScreen from './screens/SiteScreen';
import Breakdown from './screens/Breakdown';

import EditSite from './screens/EditSite';

import MachineScreen from './screens/MachineScreen';
import SiteInfo from './screens/SiteInfo';
import EditMarketer from './screens/EditMarketer';
import EditMachine from './screens/EditMachine';

import {BackHeader} from './components/BackHeader';
//import ProfileScreen from './screens/ProfileScreen';
import {Input, Button} from 'react-native-elements';

const TabNavigator = createBottomTabNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      gesturesEnabled: false,
      headerLeft: null,
      tabBarVisible: false,
    },
  },
  AuthScreen: {
    screen: AuthScreen,
    navigationOptions: {
      gesturesEnabled: false,
      headerLeft: null,
      tabBarVisible: false,
    },
  },
  SignupScreen: {
    screen: SignupScreen,
    navigationOptions: {
      gesturesEnabled: false,
      headerLeft: null,
      tabBarVisible: false,
    },
  },
  Main: {
    screen: createBottomTabNavigator(
      {
        Home: {
          screen: createStackNavigator({
            ProspectHome: {
              screen: ProspectHome,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,
                header: null,
              }),
            },

            Payment: {
              screen: Payment,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>PAYMENT</Text>
                ),
              }),
            },
          }),
          navigationOptions: {
            gesturesEnabled: false,
            headerLeft: null,
            tabBarIcon: ({tintColor}) => (
              <Icon name="home" size={25} color={tintColor} />
            ),
          },
        },
        Machine: {
          screen: createStackNavigator({
            MachineHomeGeneral: {
              screen: MachineHomeGeneral,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color, marginLeft: 10}}>
                    MACHINE
                  </Text>
                ),
              }),
            },
            MaintanaceHome: {
              screen: MaintanaceHome,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color, marginLeft: 10}}>
                    MACHINE
                  </Text>
                ),
              }),
            },
          }),
          navigationOptions: {
            gesturesEnabled: false,
            headerLeft: null,
            tabBarIcon: ({tintColor}) => (
              <Icon name="industry" size={25} color={tintColor} />
            ),
          },
        },

        Comments: {
          screen: createStackNavigator({
            CommentsScreen: {
              screen: CommentsScreen,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color, marginLeft: 10}}>
                    COMMENTS
                  </Text>
                ),
              }),
            },
          }),
          navigationOptions: {
            gesturesEnabled: false,
            headerLeft: null,
            tabBarIcon: ({tintColor}) => (
              <Icon name="comments-o" size={25} color={tintColor} />
            ),
          },
        },
      },
      {
        initialRouteName: 'Home',
        tabBarOptions: {
          activeTintColor: VARIABLES.Color,
          inactiveColor: '#3e2465',
          showIcon: true,
          style: {
            backgroundColor: 'white',
          },
          // barStyle: { backgroundColor: '#FA2700' },
          // activeBackgroundColor: '#FA2700',
        },
      },
    ),
    navigationOptions: {
      gesturesEnabled: false,
      headerLeft: null,
      tabBarVisible: false,
    },
  },
  CAS: {
    screen: createBottomTabNavigator(
      {
        Home: {
          screen: createStackNavigator({
            CashierHome: {
              screen: CashierHome,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,
                header: null,
              }),
            },

            Payment: {
              screen: Payment,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>PAYMENT</Text>
                ),
              }),
            },

            AddContact: {
              screen: AddContact,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>NEW CONTACT</Text>
                ),
              }),
            },
          }),
          navigationOptions: {
            gesturesEnabled: false,
            headerLeft: null,
            tabBarIcon: ({tintColor}) => (
              <Icon name="home" size={25} color={tintColor} />
            ),
          },
        },
        Sales: {
          screen: createStackNavigator({
            Sales: {
              screen: Sales,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color, marginLeft: 10}}>
                    SALES
                  </Text>
                ),
              }),
            },
          }),
          navigationOptions: {
            gesturesEnabled: false,
            headerLeft: null,
            tabBarIcon: ({tintColor}) => (
              <Icon name="folder" size={25} color={tintColor} />
            ),
          },
        },

        Comments: {
          screen: createStackNavigator({
            CommentsScreen: {
              screen: CommentsScreen,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color, marginLeft: 10}}>
                    COMMENTS
                  </Text>
                ),
              }),
            },
          }),
          navigationOptions: {
            gesturesEnabled: false,
            headerLeft: null,
            tabBarIcon: ({tintColor}) => (
              <Icon name="comments-o" size={25} color={tintColor} />
            ),
          },
        },
      },
      {
        initialRouteName: 'Home',
        tabBarOptions: {
          activeTintColor: VARIABLES.Color,
          inactiveColor: '#3e2465',
          showIcon: true,
          style: {
            backgroundColor: 'white',
          },
          // barStyle: { backgroundColor: '#FA2700' },
          // activeBackgroundColor: '#FA2700',
        },
      },
    ),
    navigationOptions: {
      gesturesEnabled: false,
      headerLeft: null,
      tabBarVisible: false,
    },
  },
  MAN: {
    screen: createBottomTabNavigator(
      {
        Home: {
          screen: createStackNavigator({
            ManagerHome: {
              screen: ManagerHome,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,
                header: null,
              }),
            },

            Payment: {
              screen: Payment,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>PAYMENT</Text>
                ),
              }),
            },

            AddContact: {
              screen: AddContact,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>NEW CONTACT</Text>
                ),
              }),
            },

            Meeting: {
              screen: Meeting,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>NEW MEETING</Text>
                ),
              }),
            },
          }),
          navigationOptions: {
            gesturesEnabled: false,
            headerLeft: null,
            tabBarIcon: ({tintColor}) => (
              <Icon name="home" size={25} color={tintColor} />
            ),
          },
        },
        Tasks: {
          screen: createStackNavigator({
            TasksHomeManager: {
              screen: TasksHomeManager,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color, marginLeft: 10}}>
                    Tasks
                  </Text>
                ),
              }),
            },
            Request: {
              screen: Request,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),

                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color, marginLeft: 10}}>
                    Expense
                  </Text>
                ),
              }),
            },
          }),
          navigationOptions: {
            gesturesEnabled: false,
            headerLeft: null,
            tabBarIcon: ({tintColor}) => (
              <Icon name="tasks" size={25} color={tintColor} />
            ),
          },
        },
        Operations: {
          screen: createStackNavigator({
            OperationsHomeManager: {
              screen: OperationsHomeManager,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerTitle: () => (
                  <Text
                    style={{
                      color: VARIABLES.Color,
                      marginLeft: 10,
                    }}>
                    OPERATIONS
                  </Text>
                ),
              }),
            },
            Inspection: {
              screen: Inspection,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>INSPECTION</Text>
                ),
              }),
            },
            Operator: {
              screen: Operator,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>MACHINE</Text>
                ),
              }),
            },
            ROperator: {
              screen: ROperator,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>MACHINE</Text>
                ),
              }),
            },
          }),
          navigationOptions: {
            gesturesEnabled: false,
            headerLeft: null,
            tabBarIcon: ({tintColor}) => (
              <Icon name="file" size={25} color={tintColor} />
            ),
          },
        },
        Machines: {
          screen: createStackNavigator({
            MachineHomeManager: {
              screen: MachineHomeManager,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color, marginLeft: 10}}>
                    MACHINE
                  </Text>
                ),
              }),
            },
            MachineHomeM: {
              screen: MachineHomeM,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>MACHINE</Text>
                ),
              }),
            },
            Operator: {
              screen: Operator,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>MACHINE</Text>
                ),
              }),
            },
            Issue: {
              screen: Issue,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>MACHINE</Text>
                ),
              }),
            },
            TakePicture: {
              screen: TakePicture,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,
                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>ISSUE</Text>
                ),
              }),
            },

            ROperator: {
              screen: ROperator,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>MACHINE</Text>
                ),
              }),
            },
          }),
          navigationOptions: {
            gesturesEnabled: false,
            headerLeft: null,
            tabBarIcon: ({tintColor}) => (
              <Icon name="industry" size={25} color={tintColor} />
            ),
          },
        },

        Comments: {
          screen: createStackNavigator({
            CommentsScreen: {
              screen: CommentsScreen,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color, marginLeft: 10}}>
                    COMMENTS
                  </Text>
                ),
              }),
            },
          }),
          navigationOptions: {
            gesturesEnabled: false,
            headerLeft: null,
            tabBarIcon: ({tintColor}) => (
              <Icon name="comments-o" size={25} color={tintColor} />
            ),
          },
        },
      },
      {
        initialRouteName: 'Home',
        tabBarOptions: {
          activeTintColor: VARIABLES.Color,
          inactiveColor: '#3e2465',
          showIcon: true,
          style: {
            backgroundColor: 'white',
          },
          // barStyle: { backgroundColor: '#FA2700' },
          // activeBackgroundColor: '#FA2700',
        },
      },
    ),
    navigationOptions: {
      gesturesEnabled: false,
      headerLeft: null,
      tabBarVisible: false,
    },
  },
  Boss: {
    screen: createBottomTabNavigator(
      {
        SITES: {
          screen: createStackNavigator({
            SiteScreen: {
              screen: SiteScreen,

              navigationOptions: ({navigate, navigation}) => ({
                headerTitle: () => (
                  <View
                    style={{
                      color: VARIABLES.Color,
                      display: 'flex',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 10,
                    }}>
                    <Text>SITE</Text>
                  </View>
                ),
              }),
            },

            SiteHome: {
              screen: SiteHome,

              navigationOptions: ({navigate, navigation}) => ({
                headerTitle: () => (
                  <View
                    style={{
                      color: VARIABLES.Color,
                      display: 'flex',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 10,
                    }}>
                    <Text>SITE</Text>
                  </View>
                ),
              }),
            },
            SiteInfo: {
              screen: SiteInfo,

              navigationOptions: ({navigate, navigation}) => ({
                headerTitle: () => (
                  <View
                    style={{
                      color: VARIABLES.Color,
                      display: 'flex',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 10,
                    }}>
                    <Text>SITE</Text>
                  </View>
                ),
              }),
            },
            EditSite: {
              screen: EditSite,

              navigationOptions: ({navigate, navigation}) => ({
                headerTitle: () => (
                  <View
                    style={{
                      color: VARIABLES.Color,
                      display: 'flex',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 10,
                    }}>
                    <Text>SITE</Text>
                  </View>
                ),
              }),
            },

            MarketerHome: {
              screen: MarketerHome,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>STAFF</Text>
                ),
              }),
            },
            EditMarketer: {
              screen: EditMarketer,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>EDIT</Text>
                ),
              }),
            },
            MachineHome: {
              screen: MachineHome,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>MACHINE</Text>
                ),
              }),
            },
            Operator: {
              screen: Operator,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>MACHINE</Text>
                ),
              }),
            },
            ROperator: {
              screen: ROperator,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>MACHINE</Text>
                ),
              }),
            },
            EditMachine: {
              screen: EditMachine,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>EDIT</Text>
                ),
              }),
            },
          }),
          navigationOptions: {
            gesturesEnabled: false,
            headerLeft: null,
            tabBarIcon: ({tintColor}) => (
              <Icon name="map-marker" size={25} color={tintColor} />
            ),
          },
        },
        BREAKDOWN: {
          screen: createStackNavigator({
            Breakdown: {
              screen: Breakdown,

              navigationOptions: ({navigate, navigation}) => ({
                headerTitle: () => (
                  <View
                    style={{
                      color: VARIABLES.Color,
                      display: 'flex',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 10,
                    }}>
                    <Text>SITE</Text>
                  </View>
                ),
              }),
            },
          }),
          navigationOptions: {
            gesturesEnabled: false,
            headerLeft: null,
            tabBarIcon: ({tintColor}) => (
              <Icon name="warning" size={25} color={tintColor} />
            ),
          },
        },

        Staff: {
          screen: createStackNavigator({
            BossScreen: {
              screen: BossScreen,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,
                header: null,
              }),
            },
            MarketerHome: {
              screen: MarketerHome,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>STAFF</Text>
                ),
              }),
            },
            EditMarketer: {
              screen: EditMarketer,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>EDIT</Text>
                ),
              }),
            },
          }),
          navigationOptions: {
            gesturesEnabled: false,
            headerLeft: null,
            tabBarIcon: ({tintColor}) => (
              <Icon name="users" size={25} color={tintColor} />
            ),
          },
        },
        Machines: {
          screen: createStackNavigator({
            MachineScreen: {
              screen: MachineScreen,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color, marginLeft: 20}}>
                    MACHINE
                  </Text>
                ),
              }),
            },
            MachineHome: {
              screen: MachineHome,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>MACHINE</Text>
                ),
              }),
            },
            Operator: {
              screen: Operator,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>MACHINE</Text>
                ),
              }),
            },
            ROperator: {
              screen: ROperator,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>MACHINE</Text>
                ),
              }),
            },
            EditMachine: {
              screen: EditMachine,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerLeft: () => (
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Icon
                      color={VARIABLES.Color}
                      size={25}
                      name={'chevron-left'}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>EDIT</Text>
                ),
              }),
            },
          }),
          navigationOptions: {
            gesturesEnabled: false,
            headerLeft: null,
            tabBarIcon: ({tintColor}) => (
              <Icon name="industry" size={25} color={tintColor} />
            ),
          },
        },

        Comments: {
          screen: createStackNavigator({
            CommentsScreenBoss: {
              screen: CommentsScreenBoss,
              navigationOptions: ({navigate, navigation, goBack}) => ({
                gesturesEnabled: false,

                headerTitle: () => (
                  <Text style={{color: VARIABLES.Color}}>COMMENTS</Text>
                ),
              }),
            },
          }),
          navigationOptions: {
            gesturesEnabled: false,
            headerLeft: null,
            tabBarIcon: ({tintColor}) => (
              <Icon name="comments-o" size={25} color={tintColor} />
            ),
          },
        },
      },
      {
        initialRouteName: 'Staff',
        tabBarOptions: {
          activeTintColor: VARIABLES.Color,
          inactiveColor: '#3e2465',
          showIcon: true,
          style: {
            backgroundColor: 'white',
          },
          // barStyle: { backgroundColor: '#FA2700' },
          // activeBackgroundColor: '#FA2700',
        },
      },
    ),
    navigationOptions: {
      gesturesEnabled: false,
      headerLeft: null,
      tabBarVisible: false,
    },
  },
});

const mapStateToProps = state => {
  return {
    Loader: state.auth.Loader,
  };
};

export default connect(
  mapStateToProps,
  null,
)(createAppContainer(TabNavigator));
