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
    let { sessionTime, shortBreakTime, longBreakTime } = this.props.screenProps;
    this.state = {
      switchValue: false,
      thumbColor: '#ecedea',
      sessionValue: sessionTime,
      shortBreakValue: shortBreakTime,
      longBreakValue: longBreakTime,
    }

    this.onFlipSwitch = this.onFlipSwitch.bind(this);
    this.onSessionValueChange = this.onSessionValueChange.bind(this);
    this.onShortBreakValueChange = this.onSessionValueChange.bind(this);
    this.onLongValueChange = this.onSessionValueChange.bind(this);
    this.onSaveSettings = this.onSaveSettings.bind(this);
  }

  static navigationOptions = {
    title: 'Settings',
  };

  onFlipSwitch() {
    this.setState({
      switchValue: !this.state.switchValue,
      thumbColor: this.state.switchValue ? '#ecedea' : '#138216',
    })
    this.props.screenProps.changeTheme();
  }

  onSessionValueChange(val) {
    console.log(val);
    this.setState({
      sessionValue: val
    })
  }

  onShortBreakValueChange(val) {
    this.setState({
      shortBreakValue: val
    })
  }

  onLongBreakValueChange(val) {
    this.setState({
      longBreakValue: val
    })
  }

  onSaveSettings() {
    console.log("Saving Settings");
    this.props.screenProps.saveSettings(this.state);
  }

  numList() {
    let numArr = [];
    for (i = 1; i < 61; i++) {
      numArr.push(i);
    }
    return numArr.map((d) => {
      return (
        <Picker.Item key={d} label={`${d}`} value={d} />
      )
    })
  }

  render() {
    let {
      styles,
      username,
      setSessionTime,
      setShortBreakTime,
      setLongBreakTime,
      saveSettings,
    } = this.props.screenProps;

    let { sessionValue, shortBreakValue, longBreakValue } = this.state;
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
        <View style={styles.rowContainer}>
          <Text style={styles.settingsText}>Session Minutes</Text>
          <Picker
            selectedValue={this.state.sessionValue}
            style={{ height: 50, width: 50 }}
            onValueChange={this.onSessionValueChange}
            mode='dropdown'
          >
            {this.numList()}
          </Picker>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.settingsText}>Short Break Minutes</Text>
          <TextInput
            style={styles.userInput}
            onChange={this.onShortBreakValueChange}>
            {shortBreakValue}
          </TextInput>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.settingsText}>Long Break Minutes</Text>
          <TextInput
            style={styles.userInput}
            onChange={this.onLongBreakValueChange}>
            {longBreakValue}
          </TextInput>
        </View>
        <Button title="Save" onPress={this.onSaveSettings} />

      </View>
    )

  }
}
