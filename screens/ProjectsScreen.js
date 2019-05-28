import React from 'react';
import { ScrollView, TouchableHighlight, Text, View, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import DrawerMenu from '../components/DrawerMenu';
import styles from '../constants/Styles';

class ProjectsScreen extends React.Component {

  static navigationOptions = {
    title: 'My Projects',
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      username: "Guest",
      newProjectName: "",
    }

    this.projectDisplay = this.projectDisplay.bind(this);
    this.navigateToTaskName = this.navigateToTaskName.bind(this);
  }

  projectDisplay() {
    let { userProjects, username } = this.props.screenProps;
    let index = 0;
    let projArr = [];
    for (const proj in userProjects) {
      if (userProjects.hasOwnProperty(proj)) {
        projArr.push(
          <TouchableHighlight
            key={`project ${index}`}
            onPress={() => this.navigateToTaskName(proj)}
          >
            <View style={[styles.activityCard, { backgroundColor: `${userProjects[proj].color}` }]}>
              <Text>{proj}</Text>
              <Text>Total Time: {userProjects[proj].projectTime ? `${userProjects[proj].projectTime} minutes` : 'Not started'}</Text>
              <Text>Started on {new Date(userProjects[proj].creationDate).toLocaleDateString("en-US")}</Text>
            </View>
          </TouchableHighlight >
        )
        index++;
      }
    } return projArr;
  }

  navigateToTaskName(proj) {
    const { navigation } = this.props;
    const { userProjects } = this.props.screenProps;
    console.log("Trying to navigate to task:", proj)
    navigation.navigate(
      'Tasks',
      {
        projectName: proj,
        projectLog: userProjects[proj].log,
        projectTime: userProjects[proj].projectTime
      }
    );
  }

  render() {
    let { isLoggedIn, userID } = this.props.screenProps;
    const { navigation } = this.props;
    if (isLoggedIn) {
      return (
        <ScrollView style={styles.scrollView}>
          <DrawerMenu navigation={navigation} styles={styles} />
          <TouchableHighlight
            onPress={() => {
              navigation.navigate("AddProject", { userID: userID })
            }}>
            <Text>Add a new project</Text>
          </TouchableHighlight>
          {this.projectDisplay()}
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