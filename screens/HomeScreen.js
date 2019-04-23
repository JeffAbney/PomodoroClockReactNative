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

import { StackActions, NavigationActions } from 'react-navigation';
import { Clock } from '../components/Clock'

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;
    const loggedIn = navigation.getParam('loggedIn', false);
    const username = navigation.getParam('username', "guest");
    let styles = this.props.screenProps.styles;

    let goToLogIn = (time) => navigation.navigate('LogIn', {
      fromSession: true,
      activityTime: time
    });

    let goToLogSession = (time) => navigation.navigate('SubmitActivity', {
      loggedIn: true,
      username: username,
      activityTime: time
    })

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
              isLoggedIn={loggedIn}
              onEndSession={loggedIn ? goToLogSession : goToLogIn}
              styles={styles} />
          </View>
        </View>
      </View >
    );
  }
}
