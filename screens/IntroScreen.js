import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import { Google } from 'expo';
import WelcomeViewPager from '../components/WelcomeViewpager';
import styles from '../constants/Styles';
import * as AppAuth from 'expo-app-auth';

export default class IntroScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    }

    this.signInGoogle = this.signInGoogle.bind(this);
    this.setLoadState = this.setLoadState.bind(this);
  }

  static navigationOptions = {
    header: null,
    drawerLabel: 'About',
  };

  setLoadState(bool) {
    console.log("Toggling Load State to", bool)
    this.setState({
      loading: bool
    })
  }

  signInGoogle = async () => {
    this.setLoadState(true);
    const { type, accessToken, user } = await Google.logInAsync({
      redirectUrl: `${AppAuth.OAuthRedirect}:/oauth2redirect/google`,
      behavior: 'web',
     // iosClientId: `<YOUR_IOS_CLIENT_ID_FOR_EXPO>`,
      androidClientId: `524273864505-uht4d97k4jmemue6d0khcu9n5qiq3gv0.apps.googleusercontent.com`,
     // iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
      androidStandaloneAppClientId: `524273864505-uht4d97k4jmemue6d0khcu9n5qiq3gv0.apps.googleusercontent.com`,
    });
    
    if (type === 'success') {
      console.log("Google reply", user);
        let { givenName, photoUrl, id, email } = user;
        let userData = {
          accessToken: accessToken,
          isLoggedIn: true,
          username: givenName,
          photoUrl: photoUrl,
          userID: id,
          email: email,
        }
        this.props.screenProps.handleSetState(userData);
        this.props.screenProps.signInDiddit(userData);
      } else {
        console.log("cancelled");
        this.setLoadState(false);
    } 
  }

  render() {

    return (
      <View style={[styles.container, styles.center]}>
        <View style={[styles.logoContainer]}>
          <Image 
            style={styles.logoBig} 
            source={require('../assets/images/Logo_diddit.png')} />
        </View>
        <View style={styles.introContentContainer}>
          <WelcomeViewPager styles={styles} />
          <View style={[styles.container, styles.introButtonContainer]}>
            <TouchableOpacity
              onPress={() => this.signInGoogle()}
              style={[
                styles.button,
                styles.logInButton,
              ]}
            >
              <View style={[styles.absolutePosition, styles.mainBackgroundColor, {height: 46, width: 46, padding: 10, borderBottomLeftRadius: 7, borderTopLeftRadius: 7}]}>
              <Image
                  source={require('../assets/images/google.png')}
                  style={[styles.mainBackgroundColor, {height: 26, width: 26}]}
                />
              </View>
              <Text style={[
                styles.buttonText, 
                styles.flex, 
                styles.center, 
                styles.logInButtonText
                ]}>Log In</Text>
            </TouchableOpacity>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Home')}
              style={[styles.logInButton,
              styles.button,
              styles.padding,
              styles.center,
              styles.margin,
              styles.introButton,
              styles.clearButton
              ]}
            >
              <Text style={[styles.buttonText, styles.clearButtonText]}>Use diddit without Log In</Text>
            </TouchableHighlight>
          </View>
        </View>
        {this.state.loading === true ? <View style={styles.loadingOverlay}></View > : <View></View>}
      </View >
    )
  }
}