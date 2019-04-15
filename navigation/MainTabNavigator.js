import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ActivityLogScreen from '../screens/ActivityLogScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SubmitActivityScreen from '../screens/SubmitActivityScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  LogIn: LogInScreen,
  SignUp: SignUpScreen,
  SubmitActivity: SubmitActivityScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ActivityLogStack = createStackNavigator({
  ActivityLog: ActivityLogScreen,
});

ActivityLogStack.navigationOptions = {
  tabBarLabel: 'Log',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  ActivityLogStack,
  SettingsStack,
});
