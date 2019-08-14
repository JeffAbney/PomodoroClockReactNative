import React from "react";
import { createAppContainer, createDrawerNavigator, createStackNavigator } from "react-navigation";

import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import AboutScreen from '../screens/AboutScreen';
import ShareScreen from '../screens/ShareScreen';
import SubmitActivityScreen from '../screens/SubmitActivityScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import IntroScreen from "../screens/IntroScreen";
import AddProjectScreen from "../screens/AddProjectScreen";
import CustomDrawerNavigator from './CustomDrawerNavigator.js';
import PrivacyScreen from '../screens/PrivacyScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Intro: IntroScreen,

});

const TaskLogStack = createStackNavigator({
  Projects: ProjectsScreen,
  Tasks: TasksScreen,
  AddProject: AddProjectScreen,
  SubmitActivity: SubmitActivityScreen,
});

const MainDrawerNavigator = createDrawerNavigator({
  HomeStack,
  TaskLogStack,
  Share: {
    screen: ShareScreen,
  },
  About: {
    screen: AboutScreen
  },
  Privacy: {
    screen: PrivacyScreen
  }

},
  {
    contentComponent: CustomDrawerNavigator,
    drawerWidth: 300
  });

const MainApp = createAppContainer(MainDrawerNavigator);
export default MainApp;