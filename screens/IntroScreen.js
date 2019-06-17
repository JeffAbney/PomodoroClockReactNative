import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import WelcomeViewPager from '../components/WelcomeViewpager';
import styles from '../constants/Styles';


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
    header: null
  };

  setLoadState(bool) {
    console.log("Toggling Load State to", bool)
    this.setState({
      loading: bool
    })
  }

  signInGoogle = async () => {
    this.setLoadState(true);
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
        let userData = {
          isLoggedIn: true,
          username: givenName,
          photoUrl: photoUrl,
          userID: id,
          email: email,
        }
        this.props.screenProps.handleSetState(userData);
        this.props.screenProps.signInDiddit(userData);
        this.setLoadState(false);
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }

  render() {

    return (
      <View style={[styles.container, styles.center]}>
        <View style={styles.logoContainer}>
          <Image styles={styles.logoBig}
            source={require('../assets/images/logoBig.png')} />
        </View>
        <View style={styles.introContentContainer}>
          <WelcomeViewPager styles={styles} />
          <View style={[styles.container, styles.introButtonContainer]}>
            <TouchableOpacity
              onPress={() => this.signInGoogle()}
              style={[
                styles.button,
                styles.logInButton
              ]}
            >
              <View styles={[styles.mainBackgroundColor, styles.buttonIcon]}>
                <Image
                  source={require('../assets/images/GoogleIcon.png')}
                  style={styles.mainBackgroundColor}
                />
              </View>
              <Text style={[styles.buttonText, styles.flex, styles.center]}>Log In</Text>
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