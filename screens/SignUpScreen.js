import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  Alert,
  Button
} from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      verifyPassword: ""
    }

    this._onChangeUsername = this._onChangeUsername.bind(this);
    this._onChangePassword = this._onChangePassword.bind(this);
    this._onChangeVerifyPassword = this._onChangeVerifyPassword.bind(this);
    this._onSignUpSubmit = this._onSignUpSubmit.bind(this);
  }
  static navigationOptions = {
    header: null,
  };

  _onChangeUsername(name) {
    this.setState({
      username: name
    })
  }

  _onChangePassword(password) {
    this.setState({
      password: password
    })
  }

  _onChangeVerifyPassword(verifyPassword) {
    this.setState({
      verifyPassword: verifyPassword
    })
  }

  _onSignUpSubmit() {
    let { username, password, verifyPassword } = this.state;
    if (password !== verifyPassword) {
      Alert.alert("Error", "Password do not match")
    } else {
      fetch('http://localhost:3000/createUser', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password })
      })
        .then(res => {
          return res.text()
        })
        .then(res => {
          console.log(res);
          if (res == "OK") {
            this.props.navigation.navigate('Home', {
              loggedIn: true,
            })
          } else {

            Alert.alert("Error",
              "Username Taken",
              [{ text: "OK" }])
          }
        })
    }
  }


render() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="never">
      <TextInput style={styles.userinput} onChangeText={this._onChangeUsername} placeholder="User Name" />
      <TextInput style={styles.userinput} secureTextEntry={true} onChangeText={this._onChangePassword} placeholder="Password" />
      <TextInput style={styles.userinput} secureTextEntry={true} onChangeText={this._onChangeVerifyPassword} placeholder="Verfiy Password" />
      <Button title="Sign Up" onPress={this._onSignUpSubmit} />
      <Text onPress={() => this.props.navigation.navigate('LogIn')}>Already have an account? Sign In!</Text>
    </ScrollView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 35,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15
  },
  contentContainer: {
    justifyContent: 'center'
  },
  userinput: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: 'red'
  },

})