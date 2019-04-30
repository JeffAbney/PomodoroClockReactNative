import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { createAppContainer, createDrawerNavigator, createStackNavigator } from "react-navigation";

import HomeScreen from '../screens/HomeScreen';
import ActivityLogScreen from '../screens/ActivityLogScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import ShareScreen from '../screens/ShareScreen';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SubmitActivityScreen from '../screens/SubmitActivityScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  LogIn: LogInScreen,
  SignUp: SignUpScreen,
  SubmitActivity: SubmitActivityScreen,
});

const MainDrawerNavigator = createDrawerNavigator({
  HomeStack,
  MyActvities: {
    screen: ActivityLogScreen,
  },
  Settings: {
    screen: SettingsScreen,
  },
  Share: {
    screen: ShareScreen,
  },
  About: {
    screen: AboutScreen
  }
});

const MainApp = createAppContainer(MainDrawerNavigator);
export default MainApp;