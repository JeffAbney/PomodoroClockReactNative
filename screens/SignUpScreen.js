import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Alert,
} from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';

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
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="never">
        <TextInput style={styles.userinput} onChangeText={this._onChangeUsername} placeholder="User Name"/>
        <TextInput style={styles.userinput} secureTextEntry={true} onChangeText={this._onChangePassword} placeholder="Password"/>
        <TextInput style={styles.userinput} secureTextEntry={true} placeholder="Verfiy Password"/>
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
  contentContainer:{
      justifyContent: 'center'
  },
  userinput: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: 'red'
  },

})