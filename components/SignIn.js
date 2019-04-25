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
		this.goToSignUp = this.goToSignUp.bind(this);
		this.goToLogIn = this.goToLogIn.bind(this);
	}
	

	signOut() {
		const resetAction = StackActions.reset({
      index: 1,
      actions: [NavigationActions.navigate({ routeName: 'Home' }),
      NavigationActions.navigate({ routeName: 'LogIn' }),],
		});
		this.props.screenProps.onLogOut();
		this.props.navigation.dispatch(resetAction);
	}

	goToSignUp() {
		const { navigation } = this.props;
		navigation.navigate('SignUp');
	}

	goToLogIn() {
		const { navigation } = this.props;
		navigation.navigate('LogIn');
	}

	render() {
		const { navigation, loggedIn, username } = this.props;
		let styles = this.props.styles;

		if (!loggedIn) {
			return (
				<View style={[styles.signInContainer, styles.rowContainer]}>
					<Text style={styles.signInText} onPress={this.goToSignUp}>Sign Up</Text>
					<Text style={styles.signInText}> / </Text>
					<Text style={styles.signInText} onPress={this.goToLogIn}>Log In</Text>
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
