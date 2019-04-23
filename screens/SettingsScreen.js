import React from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  Button,
  View,
  Picker
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    let styles = this.props.screenProps.styles;
    let username = this.props.screenProps.username;
    return (
      <View style={styles.container}>
        <Text style={styles.settingsWelcomeText}>Welcome, {username}</Text>
      </View>
    )

  }
}
