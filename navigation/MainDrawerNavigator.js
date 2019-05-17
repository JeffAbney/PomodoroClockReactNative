import React from "react";
import { createAppContainer, createDrawerNavigator, createStackNavigator } from "react-navigation";

import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import ShareScreen from '../screens/ShareScreen';
import SubmitActivityScreen from '../screens/SubmitActivityScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import IntroScreen from "../screens/IntroScreen";
import AddProjectScreen from "../screens/AddProjectScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Intro: IntroScreen,
  SubmitActivity: SubmitActivityScreen,
});

const TaskLogStack = createStackNavigator({
  Projects: ProjectsScreen,
  TaskNames: TasksScreen,
  AddProject: AddProjectScreen
});

const MainDrawerNavigator = createDrawerNavigator({
  HomeStack,
  TaskLogStack,
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