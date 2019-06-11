import React from 'react';
import { ScrollView, TouchableHighlight, Text, View, TextInput, Image, Alert } from 'react-native';
import { withNavigation, StackActions, NavigationActions } from 'react-navigation';
import DrawerMenu from '../components/DrawerMenu';
import PieChart from '../components/PieChart';
import styles from '../constants/Styles'

const colors = [
  "blue",
  "green",
  "yellow",
  "red",
  "orange",
  "purple",
  "brown",
  "black",
  "grey",
  "navy",
  "white",
];

class TasksScreen extends React.Component {

  static navigationOptions = {
    title: 'Activity Log',
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      pieDisplay: true,
      newTaskName: undefined,
      loading: false,
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.logDisplay = this.logDisplay.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.setPie = this.setPie.bind(this);
    this.setList = this.setList.bind(this);
    this.setLoadState = this.setLoadState.bind(this);
  }

  setLoadState(bool) {
    console.log("Toggling Load State to", bool)
    this.setState({
      loading: bool
    })
  }

  handleUserInput(text) {
    this.setState({
      newTaskName: text
    })
  }

  addTask() {
    let projectName = this.props.navigation.getParam('projectName', 'Planning');
    let taskName = this.state.newTaskName;
    const { handleSetState } = this.props.screenProps;
    handleSetState({ sessionTime: 0 });
    const resetAction =
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Projects' })],
      });
    this.props.navigation.dispatch(resetAction);

    this.props.navigation.navigate(
      "Home",
      { projectName: projectName, taskName: taskName });
  }

  removeTaskAlert(projectName, taskDate, taskTime) {
    Alert.alert(
      'Remove Task',
      'Are you sure you want to remove this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.removeTask(projectName, taskDate, taskTime) },
      ],
      { cancelable: false },
    );
  }

  removeTask(projectName, taskDate, taskTime) {
    let userID = this.props.screenProps.userID;
    console.log("TaskTime", taskTime)
    this.setLoadState(true);
    if (userID === undefined) {
      Alert.alert("Please Log In to remove your project!")
    } else {
      fetch('http://localhost:3000/removeTask', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: userID,
          projectName: projectName,
          taskDate: taskDate,
          taskTime: taskTime,
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
            Alert.alert("Task was removed!")
          } else {
            console.log('Error removing project', res)
            Alert.alert("Error",
              "There was a problem removing your task",
              [{ text: "OK" }]);
          }
        })
        .then(res => this.setLoadState(false))
    }
  }
  

  logDisplay() {
    let log = this.props.navigation.getParam('projectLog', []);
    return log.map((task, index) => {
      return (
        <View style={[
          styles.projectCard,
          styles.align,
          { backgroundColor: colors[index] }
        ]}
          key={index}>
          <View style={styles.flex}>
            <Text>{task.projectName}</Text>
            <Text>{task.taskName}</Text>
            <Text>{task.taskTime} minute(s)</Text>
            <Text>{new Date(task.date).toLocaleDateString("en-US")}</Text>
          </View>
          <View styles={styles.flex}>
                <TouchableHighlight
                  style={[styles.trashButton, styles.center, styles.align]}
                  onPress={() => this.removeTaskAlert(task.projectName, task.date, task.taskTime)}>
                  <Image source={require('../assets/images/Group.png')} />
                </TouchableHighlight>
              </View>
        </View>
      )
    })
  }


  getChartData() {
    let log = this.props.navigation.getParam('projectLog', []);
    let projectTime = this.props.navigation.getParam('projectTime', 1);

    let getTasksWithTimes = function () {
      let taskNames = [];
      log.map((task) => {
        if (!taskNames.includes(task.taskName)) {
          taskNames.push(task.taskName);
        };
      })
      let tasksWithTimes = [];
      let getTimes = function () {
        if (taskNames.length !== 0) {
          let taskTime = 0;
          for (i = 0; i < taskNames.length; i++) {
            let taskName = taskNames[i];
            for (j = 0; j < log.length; j++) {
              log[j].taskName === taskName ?
                taskTime += Math.floor(log[j].taskTime / projectTime * 100)
                :
                ""
            }
            tasksWithTimes.push({ taskName: taskName, taskTime: taskTime });
            taskTime = 0;
          }
          return tasksWithTimes;
        }
      }
      return getTimes()
    };
    return getTasksWithTimes();
  }


  setPie() {
    this.setState({
      pieDisplay: true
    })
  }

  setList() {
    this.setState({
      pieDisplay: false
    })
  }


  render() {
    const { navigation } = this.props;
    let projectTime = this.props.navigation.getParam('projectTime', 0);

    return (
      <ScrollView style={[styles.container, styles.paddingTop]}>
        <DrawerMenu navigation={navigation} styles={styles} />
        <View
          style={[styles.rowContainer, styles.marginTop]}>
          <TextInput
            style={styles.userInput}
            placeholder="Start a new task"
            placeholderTextColor='#88c8b1'
            onChangeText={(text) => this.handleUserInput(text)}
          />
          <TouchableHighlight
            style={[styles.button, styles.addButton]}
            onPress={this.addTask}>
            <Text style={styles.buttonText}> Add </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.rowContainer}>
          <TouchableHighlight style={[styles.button, styles.flex]} onPress={this.setPie}>
            <Text>Pie</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.button, styles.flex]} onPress={this.setList}>
            <Text>List</Text>
          </TouchableHighlight>
        </View>

        {this.state.pieDisplay ?
          <PieChart
            projectTime={projectTime}
            data={this.getChartData()}
            pieWidth={150}
            pieHeight={150}
            onItemSelected={this._onPieItemSelected}
            width={500}
            height={200} />
          :
          this.logDisplay()}
          {this.state.loading === true ?
            <View style={styles.loadingOverlay}></View > :
            <View></View>
          }
      </ScrollView>
    );
  }
}

export default withNavigation(TasksScreen);