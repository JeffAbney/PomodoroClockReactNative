import React, { Component } from 'react';
import styles from '../constants/Styles'
import {
  Text,
  Alert,
  View,
  Picker,
  TouchableHighlight
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { StackActions, NavigationActions } from 'react-navigation';
import BackArrow from '../components/BackArrow.js';

export default class SubmitActivityScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    const projNamesArr = () => {
      let projNames = [];
      const { userProjects } = this.props.screenProps
      for (const proj in userProjects) {
        if (userProjects.hasOwnProperty(proj)) {
          projNames.push(proj);
        }
      }
      console.log("ProjectNames", projNames);
      return projNames;
    }

    this.state = {
      projectName: projNamesArr()[0],
      taskName: "",
      loading: false,
    }

    this._onChangeprojectName = this._onChangeprojectName.bind(this);
    this._onChangetaskName = this._onChangetaskName.bind(this);
    this.onSubmitTask = this.onSubmitTask.bind(this);
    this.displayProjectList = this.displayProjectList.bind(this);
    this.setLoadState = this.setLoadState.bind(this);
  }

  setLoadState(bool) {
    console.log("Toggling Load State to", bool)
    this.setState({
      loading: bool
    })
  }

  _onChangeprojectName(itemValue) {
    this.setState({ projectName: itemValue })
  }

  _onChangetaskName(name) {
    this.setState({ taskName: name })
  }

  onSubmitTask() {
    this.setLoadState(true);
    const { navigation } = this.props;
    const { projectName, taskName } = this.state
    const { userID, sessionTime, handleSetState, _storeDataLocal, userProjects, resetClockState } = this.props.screenProps;
    let taskTime = sessionTime < 30 ? 1 : Math.round(sessionTime / 60);

    console.log("YOU PRESSED SUBMIT!", projectName);

    if (projectName === undefined) {
      this.props.navigation.navigate('SubmitActivity', {
        loggedIn: true,
        taskTime: taskTime,
      })
    } else {
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
        .then(res => {
          return res.text()
        })
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
        .then(res => handleSetState({ sessionTime: 0 }))
        .then(res => {
          const resetAction =
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({ routeName: 'Projects' }),
                NavigationActions.navigate({ routeName: 'Tasks' })
              ],
            });
          this.props.navigation.dispatch(resetAction);
        })
        .then(res => this.setLoadState(false))
        .then(res => {
          resetClockState();
          navigation.navigate('Tasks', {
            projectName: projectName,
            userID: userID,
            projectLog: userProjects[projectName].log,
            projectTime: userProjects[projectName].projectTime
          })
        })
    }
  }



  displayProjectList() {
    let { userProjects } = this.props.screenProps;
    projArr = [];
    for (const proj in userProjects) {
      if (userProjects.hasOwnProperty(proj)) {
        projArr.push(<Picker.Item style={styles.pickerItem} key={proj} label={proj} value={proj} />)
      }
    }
    return projArr;

  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <BackArrow navigation={navigation} styles={styles} />
        <View style={styles.userInputContainer}>
          <Text style={[styles.secondaryText, { marginTop: 50 }]}>Project Name</Text>
          <Picker
            selectedValue={this.state.projectName}
            style={[styles.picker, { marginBottom: 50 }]}
            onValueChange={this._onChangeprojectName}
          >
            {this.displayProjectList()}
          </Picker>
          <TextInput
            placeholder='Task Name'
            placeholderTextColor='#88c8b1'
            style={styles.userInput}
            onChangeText={this._onChangetaskName}
          />
        </ View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight style={[styles.button, { width: 180 }]} onPress={this.onSubmitTask}>
            <Text style={styles.buttonText}>Submit Task</Text>
          </TouchableHighlight>
        </View>
        {this.state.loading === true ? <View style={styles.loadingOverlay}></View > : <View></View>}
      </View>
    )

  }
}

