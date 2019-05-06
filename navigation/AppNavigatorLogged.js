import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainDrawerNavigator from './MainDrawerNavigator';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const AuthStack = createStackNavigator({ LogIn: LogInScreen, SignUp: SignUpScreen });

export default createAppContainer(createSwitchNavigator(
  {
    Main: MainDrawerNavigator,
    Auth: AuthStack,
  }
));