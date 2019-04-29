import React, { Component } from 'react';
import SignIn from '../components/SignIn';

import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Alert,
} from 'react-native';

import { Clock } from '../components/Clock'

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;
    const loggedIn = navigation.getParam('loggedIn', false);
    const username = navigation.getParam('username', "guest");
    let { styles } = this.props.screenProps;



    //After a user is logged in and checks log, switching user to chekc logs doesnt refresh log array.

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <SignIn
            loggedIn={loggedIn}
            navigation={navigation}
            username={username}
            screenProps={this.props.screenProps}
            styles={styles} />
          <View style={styles.clockContainer}>
            <Clock
              screenProps={this.props.screenProps}
            />
          </View>
        </View>
      </View >
    );
  }
}
