import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


export default class LogInScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    }

    this._onChangeUsername = this._onChangeUsername.bind(this);
    this._onChangePassword = this._onChangePassword.bind(this);
    this._onLogInSubmit = this._onLogInSubmit.bind(this);
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

  _onLogInSubmit() {
    let { username, password } = this.state;
    const { navigation } = this.props;
    const fromSession = navigation.getParam('fromSession', false);
    const activityTime = navigation.getParam('activityTime', 10);
    fetch('http://localhost:3000', {
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
          if (fromSession) {
            console.log("LogIn", activityTime)
            this.props.navigation.navigate('SubmitActivity', {
              loggedIn: true,
              username: username,
              activityTime: activityTime
            });
          } else {
            this.props.navigation.navigate('Home', {
              loggedIn: true,
              username: username
            });
            this.props.screenProps.onLogIn(username);
          }
        } else {
          Alert.alert("Error",
            "Username and Password do not match any registered user",
            [{ text: "OK" }])
        }
      })
  }

  render() {

    return (
      <View style={styles.container}>
        <TextInput style={styles.userinput} onChangeText={this._onChangeUsername} placeholder="User Name" />
        <TextInput style={styles.userinput} secureTextEntry={true} onChangeText={this._onChangePassword} placeholder="Password" />
        <Button title="Log In" onPress={this._onLogInSubmit} />
        <Text onPress={() => this.props.navigation.navigate('SignUp')}>Don't have an account? Sign Up!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 15
  },
  userinput: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: 'blue'
  },

})