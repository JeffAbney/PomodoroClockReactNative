import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  Alert,
} from 'react-native';
import styles from '../constants/Styles';

export class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      taskComplete: false
    });

    this._onPressStart = this._onPressStart.bind(this);
    this._onPressPause = this._onPressPause.bind(this);
    this._onPressReset = this._onPressReset.bind(this);
    this.onSubmitTask = this.onSubmitTask.bind(this);
    this.signInGoogle = this.signInGoogle.bind(this);
    this.goToLogIn = this.goToLogIn.bind(this);
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

  signInGoogle = async () => {
    const { setLoadState } = this.props;
    let { taskTime } = this.props.screenProps
    setLoadState(true);
    let androidClientId =
      '524273864505-drdo8v3rdegsfi9jtqo469llhssg2euv.apps.googleusercontent.com'

    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: androidClientId,
        scopes: ["profile", "email"]
      })
      if (result.type === "success") {
        console.log("Google reply", result);
        let { givenName, photoUrl, id, email } = result.user;
        let userData = {
          isLoggedIn: true,
          username: givenName,
          photoUrl: photoUrl,
          userID: id,
          email: email,
        }
        setLoadState(false);
        this.props.screenProps.handleSetState(userData);
        this.props.screenProps.signInDiddit(userData);
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }

  onSubmitTask() {
    const { navigation, projectName, taskName, setLoadState } = this.props;
    const {
      userID,
      sessionTime,
      handleSetState,
      userProjects,
      _storeDataLocal,
      isLoggedIn,
      resetClockState,
    } = this.props.screenProps;
    let taskTime = sessionTime < 30 ? 1 : Math.round(sessionTime / 60);

    this._onPressPause();
    if (!isLoggedIn) {
      Alert.alert('Not logged in',
        'Please sign in to save your progress.',
        [
          {
            text: 'No thanks.',
            style: 'cancel',
          },
          { text: 'OK', onPress: () => this.signInGoogle() },
        ],
        { cancelable: false },
      );
    } else {
      if (projectName === undefined) {
        navigation.navigate('SubmitActivity', {
          loggedIn: true,
          taskTime: taskTime,
        })
      } else {
        this.setState({
          taskComplete: true
        });
        setLoadState(true);
        let date = new Date();
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
            date: date
          })
        })
          .then(res =>
            res.text()
          )
          .then((res) => {
            if (res === "OK") {
              userProjects[projectName].log.push(
                {
                  projectName: projectName,
                  taskName: taskName,
                  taskTime: taskTime,
                  date: date
                }
              );
              userProjects[projectName].projectTime += taskTime;
              console.log('Clock - updated userprojects', userProjects);
              handleSetState({
                userProjects: userProjects
              });
              return "OK";
            } else {
              console.log("there was a problem saving your activity in DB")
            }
          })
          .then(async res => {
            await _storeDataLocal();
          })
          .then(res => {
            this.setState({
              taskComplete: false
            });
            resetClockState();
            setLoadState(false)
          })
          .then(res => {
            navigation.navigate('Tasks', {
              projectName: projectName,
              userID: userID,
              projectLog: userProjects[projectName].log,
              projectTime: userProjects[projectName].projectTime
            })
          })
      }
    }
  }

  loggedInHeading() {
    let { clockHasStarted } = this.props.screenProps;
    let { projectName } = this.props;
    let { taskComplete } = this.state;
    if (clockHasStarted) {
      return (
        <View style={[styles.rowContainer, styles.align]}>
          <TouchableHighlight onPress={() => this.onSubmitTask()}>
            <Image
              style={styles.checkBox}
              source={taskComplete ? require('../assets/images/checkbox_done.png') : require('../assets/images/checkbox.png')} />
          </TouchableHighlight>
          <Text
            style={[styles.headingText, { justifyContent: 'space-evenly' }]}
          >
            {projectName ? `${projectName}` : "Work"}
          </Text>
        </View>
      )
    } else {
      return (
        <View style={[styles.rowContainer, styles.align]}>
          <Text
            style={[styles.headingText, { justifyContent: 'space-evenly' }]}
          >
            {projectName ? `${projectName}` : "Work"}
          </Text>
        </View>
      )
    }
  }

  promptToLogIn() {
    return (
      <View style={styles.align}>
        <TouchableHighlight style={styles.align} onPress={() => this.goToLogIn()}>
          <View style={styles.align}>
            <Text
              style={[styles.logInPromptText]}
            >
              Sign Up
          </Text>
            <Text style={styles.longInPromptTextSecondary}>to save your project</Text>
          </View>
        </TouchableHighlight>

      </View>
    )
  }

  goToLogIn() {
    let { navigation } = this.props;
    navigation.navigate('Intro');
  }

  render() {
    let fmtMSS = (s) => (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
    let { projectName, taskName } = this.props
    let {
      clockIsRunning,
      clockHasStarted,
      sessionTime,
      isLoggedIn
    } = this.props.screenProps;

    return (
      <View style={[styles.container, styles.align]}>
        {isLoggedIn ? this.loggedInHeading() : this.promptToLogIn()}

        <Text style={styles.secondaryText}>{taskName ? `${taskName}` : ""}</Text>
        <Text style={styles.clock}>{fmtMSS(sessionTime)}</Text>
        <View style={[styles.rowContainer, styles.buttonContainer]}>
          <TouchableHighlight
            title={clockIsRunning ? "Pause" : "Start"}
            onPress={clockIsRunning ? this._onPressPause : this._onPressStart}
            style={[styles.button, styles.flex]}>
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
              style={[styles.button, styles.flex]}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableHighlight>}
        </View>
      </View>
    )
  }
}

