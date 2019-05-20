import React, { Component } from 'react';
import SignIn from '../components/SignIn';
import DrawerMenu from '../components/DrawerMenu';

import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';

import { Clock } from '../components/Clock'

export default class HomeScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    header: null
  };

  render() {
    const { navigation } = this.props;
    let { styles, isLoggedIn, username } = this.props.screenProps;
    let projectName = this.props.navigation.getParam('projectName', undefined);
    let taskName = this.props.navigation.getParam('taskName', undefined);

    return (
      <View style={styles.container}>
      <SignIn styles={styles} screenProps={this.props.screenProps} navigation={navigation}/>
        <View style={styles.container}>
          <View style={[styles.rowContainer, styles.spaceBetween]}>
            <DrawerMenu navigation={navigation} styles={styles}/>
          </View>
          <View style={styles.flex}>
            <Clock
              screenProps={this.props.screenProps}
              navigation={navigation}
              projectName={projectName}
              taskName={taskName}
            />
          </View>
        </View>
      </View >
    );
  }
}
