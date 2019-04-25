import React from 'react';
import {
  Switch,
  Text,
  Alert,
  Button,
  View,
  Picker
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      switchValue: false,
      thumbColor: '#ecedea'
    }

    this.onFlipSwitch = this.onFlipSwitch.bind(this);
  }

  static navigationOptions = {
    title: 'Settings',
  };

  onFlipSwitch() {
    this.setState({
      switchValue: !this.state.switchValue,
      thumbColor: this.state.switchValue ? '#ecedea' : '#138216'
    })
    this.props.screenProps.changeTheme();

  }

  render() {
    let styles = this.props.screenProps.styles;
    let username = this.props.screenProps.username;
    return (
      <View style={styles.container}>
        <Text style={styles.settingsWelcomeText}>Welcome, {username}</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.settingsText}>Night Mode: </Text>
          <Switch
            value={this.state.switchValue}
            onValueChange={this.onFlipSwitch}
            trackColor={{ false: '#ecedea', true: '#138216' }}
            thumbColor={this.state.thumbColor}>
          </Switch>
        </View>

      </View>
    )

  }
}
