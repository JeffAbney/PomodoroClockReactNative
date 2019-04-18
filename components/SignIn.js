import React, { Component } from 'react';

import {
	Image,
	Text,
	TouchableHighlight,
	View,
	Alert,
	StyleSheet,
	Platform
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

export default class SignIn extends Component {
	constructor(props) {
		super(props);

		this.signOut = this.signOut.bind(this);
	}
	

	signOut() {
		const resetAction = StackActions.reset({
      index: 1,
      actions: [NavigationActions.navigate({ routeName: 'Home' }),
      NavigationActions.navigate({ routeName: 'LogIn' }),],
		});
		
		console.log("Props", this.props);
		this.props.screenProps.onLogOut();
		this.props.navigation.dispatch(resetAction);
	}

	render() {
		const { navigation, loggedIn, username } = this.props;
		

		if (!loggedIn) {
			return (
				<View style={[styles.signInContainer, styles.rowContainer]}>
					<Text onPress={() => navigation.navigate('SignUp')}>Sign Up</Text>
					<Text> / </Text>
					<Text onPress={() => navigation.navigate('LogIn')}>Log In</Text>
				</View>
			)
		} else {
			return (
				<View style={[styles.signInContainer, styles.rowContainer, styles.spaceBetween]}>
					<Text style={styles.welcomeText}>Welcome, {username}</Text>
					<Text style={styles.signOutText} onPress={this.signOut}>(Sign Out)</Text>
				</View>
			)
		}
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
