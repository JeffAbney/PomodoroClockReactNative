import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainDrawerNavigator from './MainDrawerNavigator';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import IntroScreen from '../screens/IntroScreen';

const AuthStack =
  createStackNavigator({
    Into: IntroScreen,
    LogIn: LogInScreen,
    SignUp: SignUpScreen
  });

export default createAppContainer(createSwitchNavigator(
  {
    Auth: AuthStack,
    Main: MainDrawerNavigator,
  },
));