import React from 'react';
import { ScrollView, TouchableHighlight, Text, View, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import DrawerMenu from '../components/DrawerMenu';


class ProjectsScreen extends React.Component {

  static navigationOptions = {
    title: 'My Projects',
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      username: "Guest",
      log: [],
      projects: [],
      loadingFinished: false,
      newProjectName: "",
      userID: undefined
    }

    this.getProjects = this.getProjects.bind(this);
    this.projectDisplay = this.projectDisplay.bind(this);
    this.navigateToTaskName = this.navigateToTaskName.bind(this);

  }

  getProjects() {
    console.log("Getting Log");
    let userID = this.props.screenProps.userID
    fetch('http://localhost:3000/showLog', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: userID,
      })
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          projects: res.projects,
          loadingFinished: true,
          userID: res.userID
        })
        console.log("Setting projects to:", res.projects)
      })
  }

  navigateToTaskName(proj) {
    const { projects } = this.state;
    this.props.navigation.navigate(
      'TaskNames',
      { project: proj, projectLog: projects[proj].log, projectTime: projects[proj].projectTime }
    );
  }

  projectDisplay() {
    let styles = this.props.screenProps.styles;
    let projects = this.state.projects;
    let index = 0;
    let projArr = []
    for (var proj in projects) {
      if (projects.hasOwnProperty(proj)) {
      projArr.push (
        <TouchableHighlight
          key={`project ${index}`}
          onPress={() => this.navigateToTaskName(proj)}
        >
          <View style={styles.activityCard}>
            <Text>{proj}</Text>
            <Text>Total Time: {proj.projectTime ? `${proj.projectTime} minutes` : 'Not started' }</Text>
            <Text>Started on {new Date(proj.creationDate).toLocaleDateString("en-US")}</Text>
          </View>
        </TouchableHighlight >
      )
      index++;
    }
  } return projArr;
}

  render() {
    let { isLoggedIn, styles, username, userID } = this.props.screenProps;
    const { navigation } = this.props;
    if (isLoggedIn) {
      if (userID != this.state.userID) {
        this.getProjects();
      }
      return (
        <ScrollView style={styles.scrollView}>
          <DrawerMenu navigation={navigation} styles={styles} />
          <TouchableHighlight
            onPress={() => {
              console.log("PS USERID", userID);
              navigation.navigate("AddProject", { userID: userID })
            }}>
            <Text>Add a new project</Text>
          </TouchableHighlight>
          {this.state.loadingFinished ?
            this.projectDisplay()
            :
            <Text>Loading projects </Text>}
        </ScrollView>
      )
    } else {
      return (
        <View style={styles.container}>
          <DrawerMenu navigation={navigation} styles={styles} />
          <Text style={styles.welcomeText}>Please Log In to view Activity Log</Text>
        </View>
      )
    }
  }
}

export default withNavigation(ProjectsScreen);