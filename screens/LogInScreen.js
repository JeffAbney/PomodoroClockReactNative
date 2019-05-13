import React, { Component } from 'react';

import {
  Text,
  View,
  Alert,
  Button,
  TouchableHighlight,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


export default class LogInScreen extends Component {
  constructor(props) {
    super(props);


    this.signInGoogle = this.signInGoogle.bind(this);
    this.getSettings = this.getSettings.bind(this);
  }
  static navigationOptions = {
    header: null,
  };

  signInGoogle = async () => {
    let androidClientId =
      '524273864505-drdo8v3rdegsfi9jtqo469llhssg2euv.apps.googleusercontent.com'

    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: androidClientId,
        scopes: ["profile", "email"]
      })
      if (result.type === "success") {
        console.log("Google reply", result);
        let { givenName, photoUrl, id, email } = result.user;
        this.props.screenProps.handleSetState({
          isLoggedIn: true,
          username: givenName,
          photoUrl: photoUrl,
          userID: id,
          email: email,
        })
        this.getSettings(id, givenName);
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }

  getSettings(userID, username) {
    console.log("Loggin in");
    fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: userID,
        username: username,
      })
    }).then(res =>
      res.json()
    )
      .then(res => {
        console.log('login 66', res)
        if (!res.username) {
          console.log("68 - new user");
        } else {
          if (res.settings === null) {
            console.log("Response - no settings", res);
            let appState = JSON.stringify(res);
            console.log("Saving data locally - no settings", appState)
            this.props.screenProps._storeDataLocal(appState);
          } else {
            console.log("Response - with settings", res);
            this.props.screenProps.handleSetState({
              styles: res.settings.styles === "lightStyles" ? lightStyles : darkStyles,
              sessionTime: res.settings.sessionValue,
              shortBreakTime: res.settings.shortBreakValue,
              longBreakTime: res.settings.longBreakValue,
              secondsLeft: this.props.screenProps.isSession ?
                res.settings.sessionValue * 60 :
                res.settings.shortBreakValue * 60
            });
            let appState = JSON.stringify(res);
            console.log("Saving data locally - with settings", appState)
            this.props.screenProps._storeDataLocal(appState);
          }
        }
      })
  }


  render() {
    let { styles, signInGoogle } = this.props.screenProps;
    return (
      <View style={[styles.container, styles.center, styles.align]}>
        <View style={[styles.buttonContainer]}>
          <TouchableHighlight
            onPress={() => this.signInGoogle()}
            style={[styles.logInButton,
            styles.button,
            styles.padding,
            styles.center,
            styles.margin
            ]}
          >
            <Text style={styles.buttonText}>Log In With Google</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Home')}
            style={[styles.logInButton,
            styles.button,
            styles.padding,
            styles.center,
            styles.margin
            ]}
          >
            <Text style={styles.buttonText}>Use diddit without Log In</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}