import React from 'react';
import { Platform, StatusBar, View, Alert } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import lightStyles from './constants/LightStyles';
import darkStyles from './constants/DarkStyles';

let sessionTime = 1;
let shortBreakTime = 5;
let longBreakTime = 15;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isLoggedIn: false,
      username: "Guest",
      styles: lightStyles,
      sessionTime: sessionTime,
      shortBreakTime: shortBreakTime,
      longBreakTime: longBreakTime,
      secondsLeft: sessionTime * 60,
      clockIsRunning: false,
      isSession: true,
      clockHasStarted: false,
    };

    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
    this.setSessionTime = this.setSessionTime.bind(this);
    this.setShortBreakTime = this.setShortBreakTime.bind(this);
    this.setLongBreakTime = this.setLongBreakTime.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.resetClockState = this.resetClockState.bind(this);
    this.tick = this.tick.bind(this);
  }

  logIn(username) {
    console.log("Loggin in");
    this.setState({
      isLoggedIn: true,
      username: username
    });
  }

  logOut() {
    this.setState({
      isLoggedIn: false,
      username: "Guest"
    });
  }

  changeTheme() {
    this.setState({
      styles: this.state.styles === lightStyles ? darkStyles : lightStyles
    })
  }

  setSessionTime(min) {
    this.setState({
      sessionTime: min,
      secondsLeft: !this.state.isSession ?
        this.state.secondsLeft
        :
        min > this.state.sessionTime ?
          this.state.secondsLeft + 60
          :
          this.state.secondsLeft - 60
    })
  }

  setShortBreakTime(min) {
    this.setState({
      shortBreakTime: min,
      secondsLeft: this.state.isSession ?
      this.state.secondsLeft
      :
      min > this.state.shortBreakTime ?
        this.state.secondsLeft + 60
        :
        this.state.secondsLeft - 60
    })
  }

  setLongBreakTime(min) {
    this.setState({
      longBreakTime: min
    })
  }

  saveSettings(settings) {
    console.log("From App", settings);
    console.log("App State", this.state);
    this.setState({
      styles: settings.switchValue === false ? lightStyles : darkStyles,
      sessionTime: settings.sessionValue,
      shortBreakTime: settings.shortBreakValue,
      longBreakTime: settings.longBreakValue,
    })
  }

  startTimer() {
    this.intervalHandle = setInterval(this.tick, 1000);
    this.setState({
      clockHasStarted: true,
      clockIsRunning: true,
    })
  }

  pauseTimer() {
    clearInterval(this.intervalHandle);
    this.setState({
      clockIsRunning: false,
    })
  }

  resetTimer() {
    Alert.alert(
      'Reset Clock',
      'Are you sure you want to reset the clock?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.resetClockState() },
      ],
      { cancelable: false },
    );
  }

  resetClockState() {
    clearInterval(this.intervalHandle);
    this.setState({
      sessionTime: sessionTime,
      shortBreakTime: shortBreakTime,
      longBreakTime: longBreakTime,
      secondsLeft: sessionTime * 60,
      clockIsRunning: false,
      isSession: true,
      clockHasStarted: false,
    })

  }

  tick() {
    let { secondsLeft, isSession, sessionTime, shortBreakTime, longBreakTime, isLoggedIn } = this.state;

    let goToLogIn = (time) => navigation.navigate('LogIn', {
      fromSession: true,
      activityTime: time
    });

    let goToLogSession = (time) => navigation.navigate('SubmitActivity', {
      loggedIn: true,
      username: username,
      activityTime: time
    })

    if (secondsLeft === 1) {
      if (isSession) {
        clearInterval(this.intervalHandle);
        this.setState({
          clockIsRunning: false,
        })
        isLoggedIn ? goToLogSession : goToLogIn;
      }
      this.setState({
        secondsLeft:
          isSession ?
            Math.floor(shortBreakTime * 60)
            :
            Math.floor(sessionTime * 60),
        isSession: !isSession,
      })
    } else {
      this.setState({
        secondsLeft: --secondsLeft
      })
    }

  }

  render() {
    let {
      clockHasStarted,
      clockIsRunning,
      isLoggedIn,
      isSession,
      sessionTime,
      secondsLeft,
      shortBreakTime,
      longBreakTime,
      styles,
      username
    } = this.state;



    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator
            screenProps={{
              changeTheme: this.changeTheme,
              clockHasStarted: clockHasStarted,
              clockIsRunning: clockIsRunning,
              isSession: isSession,
              isLoggedIn: isLoggedIn,
              onLogOut: this.logOut,
              onLogIn: this.logIn,
              sessionTime: sessionTime,
              shortBreakTime: shortBreakTime,
              longBreakTime: longBreakTime,
              saveSettings: this.saveSettings,
              secondsLeft: secondsLeft,
              setSessionTime: this.setSessionTime,
              setShortBreakTime: this.setShortBreakTime,
              setLongBreakTime: this.setLongBreakTime,
              startTimer: this.startTimer,
              pauseTimer: this.pauseTimer,
              resetTimer: this.resetTimer,
              styles: styles,
              tick: this.tick,
              username: username,

            }} />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/back.png'),
        require('./assets/images/border.png'),
        require('./assets/images/button.png'),
        require('./assets/images/next.png'),
        require('./assets/images/pause.png'),
        require('./assets/images/play.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
