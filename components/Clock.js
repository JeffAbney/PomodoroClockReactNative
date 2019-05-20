import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  Alert,
} from 'react-native';



export class Clock extends Component {
  constructor(props) {
    super(props);

    this._onPressSessionDecrease = this._onPressSessionDecrease.bind(this);
    this._onPressSessionIncrease = this._onPressSessionIncrease.bind(this);
    this._onPressBreakDecrease = this._onPressBreakDecrease.bind(this);
    this._onPressBreakIncrease = this._onPressBreakIncrease.bind(this);
    this._onPressStart = this._onPressStart.bind(this);
    this._onPressPause = this._onPressPause.bind(this);
    this._onPressReset = this._onPressReset.bind(this);
    this._onSubmitActivity = this._onSubmitActivity.bind(this);
    this.goToLogSessionAlert = this.goToLogSessionAlert.bind(this);
  }

  _onPressSessionDecrease() {
    let { sessionTime, setSessionTime } = this.props.screenProps;
    if (sessionTime > 1) {
      setSessionTime(sessionTime - 1)
    }
    else {
      Alert.alert("That's as low as it goes!")
    }
  }

  _onPressSessionIncrease() {
    let { sessionTime, setSessionTime } = this.props.screenProps;
    if (sessionTime < 60)
      setSessionTime(sessionTime + 1)
    else {
      Alert.alert("That's as high as it goes!")
    }
  }

  _onPressBreakDecrease() {
    let { shortBreakTime, setShortBreakTime } = this.props.screenProps;
    if (shortBreakTime > 1) {
      setShortBreakTime(shortBreakTime - 1)
    } else {
      Alert.alert("That's as low as it goes!")
    }

  }

  _onPressBreakIncrease() {
    let { shortBreakTime, setShortBreakTime } = this.props.screenProps;
    if (shortBreakTime < 60) {
      setShortBreakTime(shortBreakTime + 1)
    } else {
      Alert.alert("That's as high as it goes!")
    }

  }

  _onPressStart() {
    this.props.screenProps.startTimer();
  }

  _onPressPause() {
    this.props.screenProps.pauseTimer();
  }

  _onPressReset() {
    this.props.screenProps.resetTimer();
  }

  goToLogSessionAlert(time) {
    let { userId, clockStartedOver } = this.props.screenProps;
    let { projectName, taskName } = this.props
    Alert.alert(
      'Session Over',
      'Save this session',
      [
        {
          text: 'No thanks',
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
            clockStartedOver();
            if (projectName === undefined) {
              this.props.navigation.navigate('SubmitActivity', {
                loggedIn: true,
                taskName: taskName
              })
            } else {
              this._onSubmitActivity();
            }
          }
        },
      ],
      { cancelable: false },
    )
  }

  _onSubmitActivity() {
    const { navigation, projectName, taskName } = this.props;
    const { userID, sessionTime } = this.props.screenProps;
    let taskTime = sessionTime;

    fetch('http://localhost:3000/log', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: userID,
        projectName: projectName,
        taskName: taskName,
        taskTime: taskTime,
        date: new Date()
      })
    })
      .then(res => {
        return res.text()
      })
      .then(res => {
        console.log("clock res", res);
        if (res === "OK") {
          navigation.navigate('Tasks', {
            projectName: projectName
          })
        } else {
          Alert.alert("Error",
            "There was a problem saving your activity",
            [{ text: "OK" }]);
          navigation.navigate('Home', {
            loggedIn: true,
            username: username
          })
        }
      })
  }

  render() {
    let fmtMSS = (s) => (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;

    let {
      isSession,
      clockIsRunning,
      clockHasStarted,
      secondsLeft,
      styles,
      sessionTime,
      shortBreakTime,
      longBreakTime,
      timeIsUp,
      username } = this.props.screenProps;


    if (isSession && secondsLeft === 1) {
      this.goToLogSessionAlert(sessionTime);
    }
    
    return (
      <View style={[styles.container, styles.center, styles.align]}>
        <Text style={styles.clock}>{isSession ? "SESSION" : "BREAK"}</Text>
        <Text style={styles.clock}>{fmtMSS(secondsLeft)}</Text>
        <View style={styles.rowContainer}>
          <View style={[styles.container, styles.center, styles.align]}>
            <Text style={styles.timeAdjusterLabel}>SESSION</Text>
            <View
              style={[
                styles.rowContainer,
                styles.center,
                styles.align
              ]}>
              <TouchableHighlight
                style={styles.touchableArrow}
                onPress={this._onPressSessionDecrease}>
                <Image source={require('../assets/images/back.png')} />
              </TouchableHighlight>
              <Text style={styles.setTimeText}>{sessionTime}</Text>
              <TouchableHighlight
                style={styles.touchableArrow}
                onPress={this._onPressSessionIncrease}>
                <Image source={require('../assets/images/next.png')} />
              </TouchableHighlight>
            </View>
          </View>
          <View style={[styles.container, styles.center, styles.align]}>
            <Text style={styles.timeAdjusterLabel}>BREAK</Text>
            <View
              style={[
                styles.rowContainer,
                styles.center,
                styles.align
              ]}>
              <TouchableHighlight
                style={styles.touchableArrow}
                onPress={this._onPressBreakDecrease}>
                <Image source={require('../assets/images/back.png')} />
              </TouchableHighlight>
              <Text style={styles.setTimeText}>{shortBreakTime}</Text>
              <TouchableHighlight
                style={styles.touchableArrow}
                onPress={this._onPressBreakIncrease}>
                <Image source={require('../assets/images/next.png')} />
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={[styles.rowContainer, styles.buttonContainer]}>
          <TouchableHighlight
            title={clockIsRunning ? "Pause" : "Start"}
            onPress={clockIsRunning ? this._onPressPause : this._onPressStart}
            style={[styles.button, styles.flex]}>
            <Text style={styles.buttonText}>
              {clockIsRunning ? "PAUSE" : "START"}
            </Text>
          </TouchableHighlight>
          {!clockHasStarted ?
            <View />
            :
            <TouchableHighlight
              title="Reset"
              onPress={this._onPressReset}
              style={[styles.button, styles.flex]}>
              <Text style={styles.buttonText}>RESET</Text>
            </TouchableHighlight>}

        </View>
      </View>
    )
  }
}

