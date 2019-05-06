import React from 'react';
import {
  Switch,
  Text,
  Alert,
  Button,
  View,
  Picker
} from 'react-native';
import DrawerMenu from '../components/DrawerMenu';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props)
    let { sessionTime, shortBreakTime, longBreakTime, styles } = this.props.screenProps;
    this.state = {
      switchValue: styles === lightStyles ? false : true,
      thumbColor: styles === lightStyles ? '#ecedea' : '#138216',
      sessionValue: sessionTime,
      shortBreakValue: shortBreakTime,
      longBreakValue: longBreakTime,
    }

    this.onFlipSwitch = this.onFlipSwitch.bind(this);
    this.onSessionValueChange = this.onSessionValueChange.bind(this);
    this.onShortBreakValueChange = this.onShortBreakValueChange.bind(this);
    this.onLongBreakValueChange = this.onLongBreakValueChange.bind(this);
    this.onSaveSettings = this.onSaveSettings.bind(this);
    this.saveSettingsToDatabase = this.saveSettingsToDatabase.bind(this);
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

  saveSettingsToDatabase() {
    let { username } = this.props.screenProps;
    fetch('http://localhost:3000/saveSettings', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, settings: this.state })
    })
      .then(res => {
        return res.text()
      })
      .then(res => {
        if (res == "OK") {
        console.log("Settings have been saved");
        this.props.screenProps.saveSettings(this.state);
        } else {
          Alert.alert("Error",
            "Error saving your settings",
            [{ text: "OK" }])
        }
      })
  }

  onSaveSettings() {
    this.props.screenProps.isLoggedIn ?
    this.saveSettingsToDatabase()
    :
    Alert.alert("Please Log In to save your settings.");
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

    let { styles, username } = this.props.screenProps;
    const { navigation } = this.props;
    let { sessionValue, shortBreakValue, longBreakValue } = this.state;
    

    return (
      <View style={styles.container}>
      <DrawerMenu navigation={navigation} styles={styles}/>
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
        <View style={[styles.rowContainer, styles.spaceBetween, styles.align]}>
          <Text style={styles.settingsText}>Session Minutes</Text>
          <Picker
            selectedValue={sessionValue}
            style={styles.settingsPicker}
            onValueChange={this.onSessionValueChange}
            mode='dropdown'
          >
            {this.numList()}
          </Picker>
        </View>
        <View style={[styles.rowContainer, styles.spaceBetween, styles.align]}>
          <Text style={styles.settingsText}>Short Break Minutes</Text>
          <Picker
            selectedValue={shortBreakValue}
            style={styles.settingsPicker}
            onValueChange={this.onShortBreakValueChange}
            mode='dropdown'
          >
            {this.numList()}
          </Picker>
        </View>
        <View style={[styles.rowContainer, styles.spaceBetween, styles.align]}>
          <Text style={styles.settingsText}>Long Break Minutes</Text>
          <Picker
            selectedValue={longBreakValue}
            style={styles.settingsPicker}
            onValueChange={this.onLongBreakValueChange}
            mode='dropdown'
          >
            {this.numList()}
          </Picker>
        </View>
        <Button title="Save" onPress={this.onSaveSettings} />

      </View>
    )

  }
}
