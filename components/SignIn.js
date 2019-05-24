import React, { Component } from 'react';
import styles from '../constants/Styles';
import { Text, View } from 'react-native';
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
		const { username } = this.props;

		{
			return (
				<View style={[styles.signInContainer, styles.rowContainer, styles.spaceBetween]}>
					<Text style={styles.welcomeText}>Welcome, {username}</Text>
					<Text style={styles.signOutText} onPress={this.signOut}>(Sign Out)</Text>
				</View>
			)
		}
	}
}
