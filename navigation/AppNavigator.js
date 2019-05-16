import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainDrawerNavigator from './MainDrawerNavigator';
import IntroScreen from '../screens/IntroScreen';

const AuthStack =
  createStackNavigator({
    Into: IntroScreen,
  });

export default createAppContainer(createSwitchNavigator(
  {
    Auth: AuthStack,
    Main: MainDrawerNavigator,
  },
));