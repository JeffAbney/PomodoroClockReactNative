import React from 'react';
import { Platform, StatusBar, View, Alert, AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import styles from './constants/Styles';
import AppNavigatorLogged from './navigation/AppNavigatorLogged';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: "",
      isLoadingComplete: false,
      isLoggedIn: false,
      username: "Guest",
      userID: undefined,
      userEmail: undefined,
      sessionTime: 0,
      clockIsRunning: false,
      clockHasStarted: false,
      timeIsUp: false,
      userProjects: {}
    };

    this.getProjects = this.getProjects.bind(this);
    this.logOut = this.logOut.bind(this);
    this.setSessionTime = this.setSessionTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.resetClockState = this.resetClockState.bind(this);
    this.tick = this.tick.bind(this);
    this._storeDataLocal = this._storeDataLocal.bind(this);
    this._retrieveDataLocal = this._retrieveDataLocal.bind(this);
    this.clockStartedOver = this.clockStartedOver.bind(this);
    this.handleSetState = this.handleSetState.bind(this);
    this.signInDiddit = this.signInDiddit.bind(this);
  }

  handleSetState(newState) {
    this.setState(newState);
  }

  signInDiddit(userData) {
    console.log("Loggin in");
    fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    })
      .then(res =>
        res.json()
      )
      .then(res => {
        console.log("Response - signInDiddit", res.projects);
        this.setState({
          userProjects: res.projects
        });
        return res;
      })
      .then(res => {
        console.log("Saving data locally")
        this._storeDataLocal();
      })
  }

  getProjects() {
    console.log("Getting Log");
    let userID = this.state.userID
    fetch('http://localhost:3000/showLog', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: userID,
      })
    })
      .then(res =>
        res.json()
      )
      .then(res => {
        this.setState({
          userProjects: res.projects,
        })
        console.log("Setting projects in state")
        return res;
      })
      .then( res => {
         this._storeDataLocal();
      }
      )
      .then(res => 
         res
      )
  }



  logOut() {
    this._clearDataLocal();
    this.setState({
      isLoggedIn: false,
      username: "Guest",
      sessionTime: 0,
      clockIsRunning: false,
      isSession: true,
      clockHasStarted: false,
      userProjects: {},
    });
  }


  setSessionTime(sec) {
    this.setState({
      sessionTime: sec,
    })
  }

  startTimer() {
    this.intervalHandle = setInterval(this.tick, 1000);
    this.setState({
      clockHasStarted: true,
      clockIsRunning: true,
      timeIsUp: false,
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
      sessionTime: 0,
      clockIsRunning: false,
      clockHasStarted: false,
      timeIsUp: false,
    })
  }

  clockStartedOver() {
    this.setState({
      timeIsUp: false,
    })
  }


  tick() {
    let { sessionTime } = this.state;
    this.setState({
      sessionTime: ++sessionTime
    })
  }

  render() {
    let {
      clockHasStarted,
      clockIsRunning,
      isLoggedIn,
      sessionTime,
      username,
      userID,
      photoUrl,
      userProjects,
    } = this.state;

    let screenProps = {

      clockHasStarted: clockHasStarted,
      clockIsRunning: clockIsRunning,
      clockStartedOver: this.clockStartedOver,
      getProjects: this.getProjects,
      isLoggedIn: isLoggedIn,
      onLogOut: this.logOut,
      sessionTime: sessionTime,
      signInDiddit: this.signInDiddit,
      startTimer: this.startTimer,
      _storeDataLocal: this._storeDataLocal,
      pauseTimer: this.pauseTimer,
      resetTimer: this.resetTimer,
      username: username,
      userID: userID,
      userProjects: userProjects,
      photoUrl: photoUrl,
      handleSetState: this.handleSetState,
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

  _storeDataLocal = async () => {
    let { photoUrl, username, userID, userEmail, userProjects } = this.state;
    let appState = JSON.stringify({
      photoUrl: photoUrl,
      isLoggedIn: true,
      username: username,
      userID: userID,
      userEmail: userEmail,
      userProjects: userProjects,
    })

    try {
      console.log("Trying to save state in _storeDataLocal");
     await AsyncStorage.setItem("appState", appState, function (error) {
        if (error) {
          console.log("Storage error", error);
          return "ERROR";
        } else {
          console.log("State Stored locally");
          return "OK";
        }
      })
    } catch (e) {
      console.log("Error trying to save in Async")
    }
  }

  _retrieveDataLocal = async () => {
    let appState = { blank: true };

    try {
      const value = await AsyncStorage.getItem('appState');
      if (value !== null) {
        appState = JSON.parse(value);
        console.log("Got state");
        // We have data!!       
        let { username, userID, userProjects, userEmail } = appState;
        this.setState({
          username: username,
          userID: userID,
          userProjects: userProjects,
          userEmail: userEmail,
          isLoggedIn: true,
        });
      } else {
        console.log("No user saved locally");
      }
    } catch (error) {
      console.log("Error Retrieving Local Data ", error)
    }
  }

  _clearDataLocal = async () => {
    try {
      const value = await AsyncStorage.getAllKeys((err) => { (err) => console.log("Error getting keys", err) });
      console.log("Clearing User data");
      let keys = value;
      await AsyncStorage.multiRemove(keys, (err) => {
        if (err) {
          console.log("Clearing Error", err);
        } else {
          console.log("Cleared keys", keys)
        }

      });
    } catch (e) {
      console.log("Error trying clear Data")
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/backButton.png'),
        require('./assets/images/next.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        'Lato': require('./assets/fonts/Lato-Regular.ttf'),
        'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
      }),
      this._retrieveDataLocal(),
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
