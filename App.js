import React from 'react';
import { Platform, StatusBar, View, Alert } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { AsyncStorage } from "react-native"
import AppNavigator from './navigation/AppNavigator';
import lightStyles from './constants/LightStyles';
import darkStyles from './constants/DarkStyles';
import AppNavigatorLogged from './navigation/AppNavigatorLogged';
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
      secondsLeft: 5,
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
    this._storeData = this._storeData.bind(this);
    this._retrieveData = this._retrieveData.bind(this);

  }

  logIn(username) {
    console.log("Loggin in");

    fetch('http://localhost:3000/getSettings', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      })
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.settings === null) {
          this.setState({
            username: username,
            isLoggedIn: true,
          })
        } else {
          console.log("Response", res);
          this.setState({
            username: username,
            isLoggedIn: true,
            styles: res.styles === "lightStyles" ? lightStyles : darkStyles,
            sessionTime: res.sessionValue,
            shortBreakTime: res.shortBreakValue,
            longBreakTime: res.longBreakValue,
            secondsLeft: this.state.isSession ? res.sessionValue * 60 : res.shortBreakValue * 60
          });
          this._storeData(username, JSON.stringify(res));
        }
      })

  }


  logOut() {
    this._clearData();
    this.setState({
      isLoggedIn: false,
      username: "Guest",
      styles: lightStyles,
      sessionTime: sessionTime,
      shortBreakTime: shortBreakTime,
      longBreakTime: longBreakTime,
      secondsLeft: 5,
      clockIsRunning: false,
      isSession: true,
      clockHasStarted: false,
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
    let setState = this.setState({
      styles: settings.switchValue === false ? lightStyles : darkStyles,
      sessionTime: settings.sessionValue,
      shortBreakTime: settings.shortBreakValue,
      longBreakTime: settings.longBreakValue,
      secondsLeft: this.state.isSession ? settings.sessionValue * 60 : settings.shortBreakValue * 60
    })
    !this.state.clockHasStarted ?
      setState
      :
      Alert.alert(
        'Saving Settings while clock is running will reset clock.',
        'Are you sure you want to reset the clock?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          { text: 'OK', onPress: () => setState },
        ],
        { cancelable: false },
      );
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

    let screenProps = {
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
      username: username,
    }

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
          {isLoggedIn ?
            <AppNavigatorLogged screenProps={screenProps} />
            :
            <AppNavigator screenProps={screenProps} />}
        </View>
      );
    }
  }

  _storeData = async (username, settings) => {
    try {
      console.log("Trying to save");
      await AsyncStorage.multiSet([['username', username], ['settings', settings]], function (error) {
        if (error) { console.log("Storage error", error); }
      })
    } catch (e) {
      console.log("Error trying to save in Async")
    }
  }

  _retrieveData = async () => {
    let username = "Guest"
    let settings = {};
    try {
      const value = await AsyncStorage.multiGet(['username', 'settings']).then(response => {
        username = response[0][1];
        settings = JSON.parse(response[1][1]);
      })
      if (value !== null) {
        // We have data!!
        if(settings.settings !== null) {
          console.log("Got the settings", username, settings)
          this.setState({
            username: username,
            isLoggedIn: true,
            styles: settings.styles === "lightStyles" ? lightStyles : darkStyles,
            sessionTime: settings.sessionValue,
            shortBreakTime: settings.shortBreakValue,
            longBreakTime: settings.longBreakValue,
            secondsLeft: this.state.isSession ? settings.sessionValue * 60 : settings.shortBreakValue * 60
  
          });
          console.log("User info found!", username);
        } else {
          console.log("User has no saved settings");
          this.setState({
            username: username,
            isLoggedIn: true,
          })
        }
        
      } else {
        console.log("No user saved", username);
      }
    } catch (error) {
      console.log("Error Retrieving Data")
    }
  }

  _clearData = async () => {
    try {
      console.log("Clearing User data");
      await AsyncStorage.removeItem('username');
    } catch (e) {
      console.log("Error trying clear Data")
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
      this._retrieveData(),
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
