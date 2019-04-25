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
    let { sessionTime, shortBreakTime, longBreakTime } = this.props;

    this.state = {
      sessionLength: sessionTime,
      shortBreakLength: shortBreakTime,
      longBreakLength: longBreakTime,
      secondsLeft: sessionTime * 60,
      clockIsRunning: false,
      isSession: true,
      clockHasStarted: false,
      isLoggedIn: this.props.loggedIn
    }

    this.intervalHandle;
    this._onPressSessionDecrease = this._onPressSessionDecrease.bind(this);
    this._onPressSessionIncrease = this._onPressSessionIncrease.bind(this);
    this._onPressBreakDecrease = this._onPressBreakDecrease.bind(this);
    this._onPressBreakIncrease = this._onPressBreakIncrease.bind(this);
    this._onPressStart = this._onPressStart.bind(this);
    this._onPressPause = this._onPressPause.bind(this);
    this._onPressReset = this._onPressReset.bind(this);
    this.tick = this.tick.bind(this);
    this.resetClock = this.resetClock.bind(this);
  }

  _onPressSessionDecrease() {
    let { sessionLength, isSession, secondsLeft } = this.state;
    if (sessionLength > 1) {
      this.setState({
        sessionLength: --sessionLength,
        secondsLeft: isSession ? secondsLeft - 60 : secondsLeft
      })
    }
    else {
      Alert.alert("That's as low as it goes!")
    }
  }

  _onPressSessionIncrease() {
    let { sessionLength, isSession, secondsLeft } = this.state;
    if (sessionLength < 60)
      this.setState({
        sessionLength: ++sessionLength,
        secondsLeft: isSession ? secondsLeft + 60 : secondsLeft
      })
    else {
      Alert.alert("That's as high as it goes!")
    }
  }

  _onPressBreakDecrease() {
    let { breakLength, isSession, secondsLeft } = this.state;
    if (breakLength > 1) {
      this.setState({
        shortBreakLength: --shortBreakLength,
        secondsLeft: !isSession ? secondsLeft - 60 : secondsLeft
      })
    } else {
      Alert.alert("That's as low as it goes!")
    }

  }

  _onPressBreakIncrease() {
    let { breakLength, isSession, secondsLeft } = this.state;
    if (breakLength < 60) {
      this.setState({
        shortBreakLength: ++shortBreakLength,
        secondsLeft: !isSession ? secondsLeft + 60 : secondsLeft
      })
    } else {
      Alert.alert("That's as high as it goes!")
    }

  }

  _onPressStart() {
    this.intervalHandle = setInterval(this.tick, 1000);
    this.setState({
      clockHasStarted: true,
      clockIsRunning: true,
    })
  }

  _onPressPause() {
    clearInterval(this.intervalHandle);
    this.setState({
      clockIsRunning: false,
    })
  }

  _onPressReset() {
    Alert.alert(
      'Reset Clock',
      'Are you sure you want to reset the clock?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.resetClock() },
      ],
      { cancelable: false },
    );
  }

  resetClock() {
    let { sessionLength, shortBreakLength, longBreakLength } = this.props;
    clearInterval(this.intervalHandle);
    this.setState({
      sessionLength: sessionLength,
      shortBreakLength: shortBreakLength,
      secondsLeft: sessionLength * 60,
      clockIsRunning: false,
      isSession: true,
      clockHasStarted: false
    })

  }

  tick() {
    let { secondsLeft, isSession, shortBreakLength, sessionLength } = this.state;
    if (secondsLeft === 1) {
      if (isSession) {
        clearInterval(this.intervalHandle);
        this.setState({
          clockIsRunning: false,
        })
        this.props.onEndSession(this.state.sessionLength);
      }
      this.setState({
        secondsLeft:
          isSession ?
            Math.floor(shortBreakLength * 60)
            :
            Math.floor(sessionLength * 60),
        isSession: !isSession,
      })
    } else {
      this.setState({
        secondsLeft: --secondsLeft
      })
    }

  }

  render() {
    let fmtMSS = (s) => (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
    let { isSession, clockIsRunning, clockHasStarted } = this.state;
    let styles = this.props.styles;
    return (
      <View style={[styles.container, styles.center, styles.align]}>
        <Text style={styles.clock}>{isSession ? "Session" : "Break"}</Text>
        <Text style={styles.clock}>{fmtMSS(this.state.secondsLeft)}</Text>
        <View style={styles.rowContainer}>
          <View style={[styles.container, styles.center, styles.align]}>
            <Text style={styles.timeAdjusterLabel}>Session</Text>
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
              <Text style={styles.setTimeText}>{this.state.sessionLength}</Text>
              <TouchableHighlight
                style={styles.touchableArrow}
                onPress={this._onPressSessionIncrease}>
                <Image source={require('../assets/images/next.png')} />
              </TouchableHighlight>
            </View>
          </View>
          <View style={[styles.container, styles.center, styles.align]}>
            <Text style={styles.timeAdjusterLabel}>Break</Text>
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
              <Text style={styles.setTimeText}>{this.state.shortBreakLength}</Text>
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
            style={styles.button}>
            <Text style={styles.buttonText}>
              {clockIsRunning ? "Pause" : "Start"}
            </Text>
          </TouchableHighlight>
          {!clockHasStarted ?
            <View />
            :
            <TouchableHighlight
              title="Reset"
              onPress={this._onPressReset}
              style={styles.button}>
              <Text>Reset</Text>
            </TouchableHighlight>}

        </View>
      </View>
    )
  }
}
