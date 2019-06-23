import React, { Component } from 'react';
import styles from '../constants/Styles';
import {
  Text,
  View,
  TouchableHighlight,
  Alert,
  TextInput
} from 'react-native';

import BackArrow from '../components/BackArrow.js';

export default class AddProjectScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: '',
      taskName: '',
      projectColor: 'red',
      loading: false,
    }


    this.generateColorDots = this.generateColorDots.bind(this);
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.handleChooseColor = this.handleChooseColor.bind(this);
    this.addProject = this.addProject.bind(this);
    this.setLoadState = this.setLoadState.bind(this);
  }
  static navigationOptions = {
    header: null
  };

  setLoadState(bool) {
    console.log("Toggling Load State to", bool)
    this.setState({
      loading: bool
    })
  }

  handleProjectChange(text) {
    console.log("Changing Project", text)
    this.setState({
      projectName: text
    })
  }

  handleTaskChange(text) {
    console.log("Changing Task", text)
    this.setState({
      taskName: text
    })
  }

  handleChooseColor(color) {
    console.log("Choosing", color)
    this.setState({
      projectColor: color
    })
  }

  addProject() {

    let userID = this.props.navigation.getParam('userID', undefined);
    const { navigation } = this.props;
    const { projectName, projectColor, taskName } = this.state;
    this.setLoadState(true);
    if (userID === undefined) {
      Alert.alert("Please Log In to create your project!")
    } else {
      fetch('https://diddit-server.herokuapp.com/newProject', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: userID,
          projectName: projectName,
          projectColor: projectColor,
          date: new Date()
        })
      })
        .then(res => res.text())
        // Refresh state to reflect new project and store locally
        .then((res) => {
          console.log("Refreshing userProjects State");
          this.props.screenProps.getProjects();
          return res;
        })
        .then(res => {
          if (res === "OK") {
            navigation.navigate("Home",
              {
                projectName: projectName,
                taskName: taskName,
                projectColor: projectColor
              })
          } else {
            console.log('Add project error', res)
            Alert.alert("Error",
              "There was a problem adding your project",
              [{ text: "OK" }]);
            navigation.navigate("Home",
              {
                projectName: projectName,
                taskName: taskName,
                projectColor: projectColor
              })
          }
        })
        .then(res => this.setLoadState(false))
    }
  }

  generateColorDots() {
    let colors = [['#0dffc9', '#4089df', '#004fad'], ['#9bb87e', '#9ee25b', '#4d9505'], ['#786880', '#783793', '#7e00b3']];

    return colors.map((group, index) => {
      return (
        <View style={styles.rowContainer} key={`group-${index}`}>
          <TouchableHighlight key={`color-${group[0]}`} onPress={() => this.handleChooseColor(group[0])}>
            <View style={[styles.colorDot, { backgroundColor: group[0] }]}></View>
          </TouchableHighlight>
          <TouchableHighlight key={`color-${group[1]}`} onPress={() => this.handleChooseColor(group[1])}>
            <View style={[styles.colorDot, { backgroundColor: group[1] }]}></View>
          </TouchableHighlight>
          <TouchableHighlight key={`color-${group[2]}`} onPress={() => this.handleChooseColor(group[2])}>
            <View style={[styles.colorDot, { backgroundColor: group[2] }]}></View>
          </TouchableHighlight>
        </View>
      )
    })
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <BackArrow navigation={navigation} styles={styles} />
        <View style={styles.userInputContainer}>
          <TextInput style={styles.userInput} placeholder="New Project Name" placeholderTextColor='#88c8b1' onChangeText={this.handleProjectChange} />
          <TextInput style={styles.userInput} placeholder="First Task" placeholderTextColor='#88c8b1' onChangeText={this.handleTaskChange} />
        </View>
        <View style={styles.colorGridContainer}>
          <Text style={styles.headingText}>Project Color</Text>
          {this.generateColorDots()}

          <TouchableHighlight
            style={[styles.button, { width: 180 }, {marginBottom: 40}]}
            onPress={() => {
              console.log("Creating new project");
              this.addProject()
            }

            }>
            <Text style={styles.buttonText}>GO!</Text>
          </TouchableHighlight>
        </View>
        {this.state.loading === true ? <View style={styles.loadingOverlay}></View > : <View></View>}
      </View>
    )
  }
}