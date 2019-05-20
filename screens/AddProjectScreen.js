import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableHighlight,
  Alert,
  TextInput
} from 'react-native';

import DrawerMenu from '../components/DrawerMenu';

export default class AddProjectScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: '',
      taskName: '',
      projectColor: 'red'
    }


    this.generateColorDots = this.generateColorDots.bind(this);
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.handleChooseColor = this.handleChooseColor.bind(this);
    this.addProject = this.addProject.bind(this);
  }
  static navigationOptions = {
    header: null
  };

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
    const { projectName, projectColor } = this.state;

    fetch('http://localhost:3000/newProject', {
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
      .then(res => {
        return res.text()
      })
      .then(res => {
        console.log("clock res", res);
        if (res === "OK") {
          navigation.navigate("Home",
            {
              projectName: projectName,
              taskName: this.state.taskName,
              projectColor: projectColor
            })
        } else {
          Alert.alert("Error",
            "There was a problem adding your project",
            [{ text: "OK" }]);
          navigation.navigate('Home', {
            loggedIn: true,
            username: username
          })
        }
      })
  }

  generateColorDots() {
    let { styles } = this.props.screenProps;
    let colors = [['red', 'blue', 'green'], ['yellow', 'purple', 'brown'], ['black', 'orange', 'pink']];

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
    let { styles } = this.props.screenProps;

    return (
      <View style={styles.container}>
        <DrawerMenu navigation={navigation} styles={styles} />
        <TextInput placeholder="New Project Name" onChangeText={this.handleProjectChange} />
        <TextInput placeholder="First Task" onChangeText={this.handleTaskChange} />
        <View style={styles.colorGridContainer}>
          <Text>Choose a color for you project!</Text>
          {this.generateColorDots()}
        </View>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            console.log("Creating new project");
            this.addProject()
          }

          }>
          <Text style={styles.buttonText}>GO!</Text>
        </TouchableHighlight>
      </View>
    )
  }
}