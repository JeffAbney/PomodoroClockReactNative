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
      const { userID, sessionTime, handleSetState, _storeDataLocal, userProjects } = this.props.screenProps;
      let taskTime = sessionTime < 30 ? 0 : Math.round(sessionTime / 60);
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
          .then(res => {
            console.log("redirecting to taskScreen with -", projectName, userProjects[projectName].projectTime)
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
          projArr.push(<Picker.Item key={proj} label={proj} value={proj} />)
        }
      }
      return projArr;

    }

    render() {
      return (
        <View style={[styles.container, styles.center]}>
          <Text style={{ marginTop: 50 }}>Project Name</Text>
          <Picker
            selectedValue={this.state.projectName}
            style={{ height: 50, width: 300 }}
            onValueChange={this._onChangeprojectName}
          >
            {this.displayProjectList()}
          </Picker>
          <Text>Task Name</Text>
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

