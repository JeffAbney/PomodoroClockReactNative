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

    this._onPressStart = this._onPressStart.bind(this);
    this._onPressPause = this._onPressPause.bind(this);
    this._onPressReset = this._onPressReset.bind(this);
    this.onSubmitTask = this.onSubmitTask.bind(this);
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


  onSubmitTask() {
    const { navigation, projectName, taskName, setLoadState } = this.props;
    const { userID, sessionTime, handleSetState, userProjects, _storeDataLocal } = this.props.screenProps;
    let taskTime = sessionTime < 30 ? 1 : Math.round(sessionTime / 60);
    
  
    if (projectName === undefined) {
      this.props.navigation.navigate('SubmitActivity', {
        loggedIn: true,
        taskTime: taskTime,
      })
    } else {
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
        .then(res => setLoadState(false))
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

  render() {
    let fmtMSS = (s) => (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
    let { projectName, taskName } = this.props
    let {
      clockIsRunning,
      clockHasStarted,
      sessionTime,
    } = this.props.screenProps;

    return (
      <View style={[styles.container, styles.center, styles.align]}>
        <Text style={styles.clock}>{projectName ? `${projectName}` : "Work"}</Text>
        <Text>{taskName ? `${taskName}` : ""}</Text>
        <TouchableHighlight style={styles.button} onPress={() => this.onSubmitTask()}>
          <Text style={styles.buttonText}>Did it!</Text>
        </TouchableHighlight>
        <Text style={styles.clock}>{fmtMSS(sessionTime)}</Text>
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

