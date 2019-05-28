import React, { Component } from 'react';
import styles from '../constants/Styles'
import {
  Text,
  Alert,
  Button,
  View,
  Picker,
  TouchableHighlight
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

let projArr = [];

export default class SubmitActivityScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      projectName: projArr[0],
      taskName: ""
    }

    this._onChangeprojectName = this._onChangeprojectName.bind(this);
    this._onChangetaskName = this._onChangetaskName.bind(this);
    this.onSubmitTask = this.onSubmitTask.bind(this);
    this.displayProjectList = this.displayProjectList.bind(this);
  }


  _onChangeprojectName(itemValue) {
    this.setState({ projectName: itemValue })
  }

  _onChangetaskName(name) {
    this.setState({ taskName: name })
  }

  onSubmitTask() {
    const { navigation } = this.props;
    const { projectName, taskName } = this.state
    const { userID, sessionTime, getProjects, userProjects } = this.props.screenProps;
    let taskTime = Math.round(sessionTime / 60);

    if (projectName === undefined) {
      this.props.navigation.navigate('SubmitActivity', {
        loggedIn: true,
        taskTime: taskTime,
      })
    } else {
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
          getProjects();
          return res;
        })
        .then(res => {
          console.log("clock res", res);
          if (res === "OK") {
            navigation.navigate('Tasks', {
              projectName: projectName,
              userID: userID,
              projectLog: userProjects[projectName].log
            })
          } else {
            console.log("Reached clock error")
            Alert.alert("Error",
              "There was a problem saving your activity",
              [{ text: "OK" }]);
            navigation.navigate('Home')
          }
        })
    }
  }



  displayProjectList() {
    let { userProjects } = this.props.screenProps;
    projArr = [];
    for (const proj in userProjects) {
      if (userProjects.hasOwnProperty(proj)) {
        projArr.push(proj)
      }
    }
    console.log('SAS - projArr', projArr)
    return (
      projArr.map((proj) => <Picker.Item key={proj} label={proj} value={proj} />)
    )

  }

  render() {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ marginTop: 50 }}>Activity Category</Text>
        <Picker
          selectedValue={this.state.projectName}
          style={{ height: 50, width: 300 }}
          onValueChange={this._onChangeprojectName}
        >
          {this.displayProjectList()}
        </Picker>
        <Text>Activity Name</Text>
        <TextInput
          style={styles.userInput}
          onChangeText={this._onChangetaskName}
        />
        <TouchableHighlight style={styles.button} onPress={this.onSubmitTask}>
          <Text style={styles.buttonText}>Submit Task</Text>
        </TouchableHighlight>
      </View>
    )

  }
}

