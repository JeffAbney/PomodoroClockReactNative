import React, { Component } from 'react';
import SignIn from '../components/SignIn'

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


    let goToLogIn = (time) => navigation.navigate('LogIn', {
      fromSession: true,
      activityTime: time
    });

    let goToLogSession = (time) => navigation.navigate('SubmitActivity', {
      loggedIn: true,
      username: username,
      activityTime: time
    })

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <SignIn
            loggedIn={loggedIn}
            navigation={navigation}
            username={username} 
            screenProps={this.props.screenProps} />
          <View style={styles.clockContainer}>
            <Clock
              isLoggedIn={loggedIn}
              onEndSession={loggedIn ? goToLogSession : goToLogIn} />
          </View>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
    justifyContent: 'center',
    backgroundColor: 'brown',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signInContainer: {
    justifyContent: 'flex-end',
    paddingRight: 20,
    paddingTop: 30,
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  welcomeText: {
    paddingLeft: 15,
  },
  signOutText: {
    color: 'grey',
  },
  clockContainer: {
    flex: 1,
    backgroundColor: 'blue',
  },
  clock: {
    fontSize: 60,
  },
  timeAdjusterLabel: {
    fontSize: 24,
    paddingBottom: 15,
  },
  touchableArrow: {
    width: 25,
    alignItems: 'center'
  },
  setTimeText: {
    paddingRight: 8,
    paddingLeft: 8,
    fontSize: 32,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 50,
    width: 300,
    height: 50,
  },
  button: {
    flex: 1,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 4,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'red',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
});
