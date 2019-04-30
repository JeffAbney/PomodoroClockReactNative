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
    const loggedIn = navigation.getParam('loggedIn', false);
    const username = navigation.getParam('username', "guest");
    let { styles } = this.props.screenProps;

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={[styles.rowContainer, styles.spaceBetween]}>
            <DrawerMenu navigation={navigation} styles={styles}/>
            <SignIn
              loggedIn={loggedIn}
              navigation={navigation}
              username={username}
              screenProps={this.props.screenProps}
              styles={styles} />
          </View>
          <View style={styles.clockContainer}>
            <Clock
              screenProps={this.props.screenProps}
              navigation={navigation}
            />
          </View>
        </View>
      </View >
    );
  }
}
