import React, { Component } from 'react';

import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    }

    this._onChangeUsername = this._onChangeUsername.bind(this);
    this._onChangePassword = this._onChangePassword.bind(this);
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

  render() {
    return (
      <View style={styles.container}>
        <Text>User Name</Text>
        <TextInput style={styles.userinput} onChangeText={this._onChangeUsername} />
        <Text>PassWord</Text>
        <TextInput style={styles.userinput} onChangeText={this._onChangePassword} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  userinput: {
    padding: 20,
    backgroundColor: 'blue'
  },

})