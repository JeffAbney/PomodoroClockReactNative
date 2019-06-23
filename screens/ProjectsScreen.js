import React from 'react';
import { ScrollView, TouchableHighlight, Text, View, Image, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import DrawerMenu from '../components/DrawerMenu';
import styles from '../constants/Styles';

class ProjectsScreen extends React.Component {

  static navigationOptions = {
    title: 'Projects',
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      username: "Guest",
      newProjectName: "",
      loading: false,
    }

    this.projectDisplay = this.projectDisplay.bind(this);
    this.navigateToTaskName = this.navigateToTaskName.bind(this);
    this.removeProject = this.removeProject.bind(this);
    this.setLoadState = this.setLoadState.bind(this);
  }

  setLoadState(bool) {
    console.log("Toggling Load State to", bool)
    this.setState({
      loading: bool
    })
  }

  projectDisplay() {
    let { userProjects, username } = this.props.screenProps;
    let index = 0;
    let projArr = [];
    for (const proj in userProjects) {
      if (userProjects.hasOwnProperty(proj)) {
        projArr.push(
          <TouchableHighlight
          style={styles.align}
            key={`project ${index}`}
            onPress={() => this.navigateToTaskName(proj)}
          >
            <View
              style={[
                styles.projectCard,
                styles.align,
                styles.center,
                { backgroundColor: `${userProjects[proj].color}` }
              ]}>
              <View style={styles.flex}>
                <Text style={styles.projectCardText}>{proj}</Text>
              </View>
              <View styles={styles.flex}>
                <TouchableHighlight
                  style={[, styles.center, styles.align]}
                  onPress={() => this.removeProjectAlert(proj)}>
                  <Image style={styles.trashButton} source={require('../assets/images/deleteIcon.png')} />
                </TouchableHighlight>
              </View>
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
        projectTime: userProjects[proj].projectTime,
        projectColor: userProjects[proj].projectColor
      }
    );
  }

  removeProjectAlert(proj) {
    Alert.alert(
      'Remove Project',
      'Are you sure you want to remove this project?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.removeProject(proj) },
      ],
      { cancelable: false },
    );
  }

  removeProject(projectName) {
    let userID = this.props.screenProps.userID;
    this.setLoadState(true);
    if (userID === undefined) {
      Alert.alert("Please Log In to remove your project!")
    } else {
      fetch('https://diddit-server.herokuapp.com/removeProject', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: userID,
          projectName: projectName,
        })
      })
        .then(res => res.text())
        // Refresh state to reflect new project log and store locally
        .then((res) => {
          console.log("Refreshing userProjects State");
          this.props.screenProps.getProjects();
          return res;
        })
        .then(res => {
          if (res === "OK") {
            Alert.alert("Project was removed!")
          } else {
            console.log('Error removing project', res)
            Alert.alert("Error",
              "There was a problem removing your project",
              [{ text: "OK" }]);
          }
        })
        .then(res => this.setLoadState(false))
    }
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
            <View style={[styles.rowContainer, styles.center, styles.margin50]}>
              <Image style={styles.addIcon} source={require('../assets/images/add.png')} />
              <Text style={styles.headingText}>Add Project</Text>
            </View>
          </TouchableHighlight>
          {this.projectDisplay()}
          {this.state.loading === true ?
            <View style={styles.loadingOverlay}></View > :
            <View></View>
          }
        </ScrollView>
      )
    } else {
      return (
        <View style={styles.container}>
          <DrawerMenu navigation={navigation} styles={styles} />
          <Text style={styles.welcomeText}>
            Please Log In to view Activity Log
          </Text>
        </View>
      )
    }
  }

}

export default withNavigation(ProjectsScreen);