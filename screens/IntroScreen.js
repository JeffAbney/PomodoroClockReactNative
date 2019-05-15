import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import WelcomeViewPager from '../components/WelcomeViewpager';


export default class IntroScreen extends Component {

  static navigationOptions = {
    header: null
  };

  render() {

    let { styles } = this.props.screenProps;

    return (
      <View style={[styles.container, styles.center]}>
        <View style={styles.logoContainer}>
          <Image styles={styles.logoBig}
            source={require('../assets/images/logoBig.png')} />
        </View>
        <View style={styles.introContentContainer}>
          <WelcomeViewPager styles={styles} />
          <View style={[styles.container, styles.buttonContainer]}>
            <TouchableHighlight
              onPress={() => console.log("Sign in")}
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


      </View >
    )
  }
}