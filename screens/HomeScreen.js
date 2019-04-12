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



export class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      secondsLeft: 1500,
      clockIsRunning: false,
      isSession: true,
      clockHasStarted: false
    }

    this.intervalHandle;

    this._onPressButton = this._onPressButton.bind(this);
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

  _onPressButton() {
    Alert.alert('You tapped the button!')
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
        breakLength: --breakLength,
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
        breakLength: ++breakLength,
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
    clearInterval(this.intervalHandle);
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      secondsLeft: 1500,
      clockIsRunning: false,
      isSession: true,
      clockHasStarted: false
    })

  }

  tick() {
    let { secondsLeft, isSession, breakLength, sessionLength } = this.state;
    if (secondsLeft === 1) {
      this.setState({
        secondsLeft: isSession ? Math.floor(breakLength * 60) : Math.floor(sessionLength * 60),
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
    return (
      <View style={[styles.container, styles.centeredContainer]}>
        <Text style={styles.clock}>{fmtMSS(this.state.secondsLeft)}</Text>
        <View style={styles.rowContainer}>
          <View style={styles.centeredContainer}>
            <Text style={styles.timeAdjusterLabel}>Session</Text>
            <View style={[styles.rowContainer, styles.centeredContainer]}>
              <TouchableHighlight style={styles.touchableArrow} onPress={this._onPressSessionDecrease}>
                <Image source={require('../assets/images/back.png')} />
              </TouchableHighlight>
              <Text style={styles.setTimeText}>{this.state.sessionLength}</Text>
              <TouchableHighlight style={styles.touchableArrow} onPress={this._onPressSessionIncrease}>
                <Image source={require('../assets/images/next.png')} />
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.centeredContainer}>
            <Text style={styles.timeAdjusterLabel}>Break</Text>
            <View style={[styles.rowContainer, styles.centeredContainer]}>
              <TouchableHighlight style={styles.touchableArrow} onPress={this._onPressBreakDecrease}>
                <Image source={require('../assets/images/back.png')} />
              </TouchableHighlight>
              <Text style={styles.setTimeText}>{this.state.breakLength}</Text>
              <TouchableHighlight style={styles.touchableArrow} onPress={this._onPressBreakIncrease}>
                <Image source={require('../assets/images/next.png')} />
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={[styles.rowContainer, styles.buttonContainer]}>
          <TouchableHighlight title={clockIsRunning ? "Pause" : "Start"} onPress={clockIsRunning ? this._onPressPause : this._onPressStart} style={styles.button}>
            <Text> {clockIsRunning ? "Pause" : "Start"} </Text>
          </TouchableHighlight>
          {!clockHasStarted ?
            <View />
            :
            <TouchableHighlight title="Reset" onPress={this._onPressReset} style={styles.button}>
              <Text>Reset</Text>
            </TouchableHighlight>}

        </View>
      </View>
    )
  }
}



  


export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };


  render() {
    const { navigation } = this.props;
    const loggedIn = navigation.getParam('loggedIn', false);

    let signInSection = function() {
      if (!loggedIn) {
        return (
          <View style={[styles.signInContainer, styles.rowContainer]}>
            <Text onPress={() => navigation.navigate('SignUp')}>Sign Up</Text>
            <Text> / </Text>
            <Text onPress={() => navigation.navigate('LogIn')}>Log In</Text>
          </View>
        )
      } else {
        return (
          <View style={[styles.signInContainer, styles.rowContainer]}>
            <Text onPress={() => navigation.navigate('LogIn')}>Sign Out</Text>
          </View>
        )
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {signInSection()}
          <View style={styles.clockContainer}>
            <Clock />
          </View>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
    justifyContent: 'center',
    backgroundColor: 'brown',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signInContainer: {
    justifyContent: 'flex-end',
    paddingRight: 20,
    paddingTop: 30,
  },
  clockContainer: {
    flex: 1,
    backgroundColor: 'blue',
  },
  clock: {
    fontSize: 60,
  },
  timeAdjusterLabel: {
    fontSize: 24,
    paddingBottom: 15,
  },
  touchableArrow: {
    width: 25,
    alignItems: 'center'
  },
  setTimeText: {
    paddingRight: 8,
    paddingLeft: 8,
    fontSize: 32,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 50,
    width: 300,
    height: 50,
  },
  button: {
    flex: 1,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 4,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },


  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'red',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
});
