import React from 'react';
import { ScrollView, TouchableHighlight, Text, View, TextInput, Image, Alert, findNodeHandle } from 'react-native';
import { withNavigation, StackActions, NavigationActions } from 'react-navigation';
import TextInputState from 'react-native/lib/TextInputState';
import DrawerMenu from '../components/DrawerMenu';
import PieChart from '../components/PieChart';
import styles from '../constants/Styles'

const colors = [
  '#0dffc9',
  '#4089df',
  '#004fad',
  '#9bb87e',
  '#9ee25b',
  '#4d9505',
  '#786880',
  '#783793',
  '#7e00b3'
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
      addingTask: false,
      focusUserInput: false,
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.logDisplay = this.logDisplay.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.setPie = this.setPie.bind(this);
    this.setList = this.setList.bind(this);
    this.setLoadState = this.setLoadState.bind(this);
    this.handlePressAddIcon = this.handlePressAddIcon.bind(this);
  }

  focusTextInput(node) {
    try {
      TextInputState.focusTextInput(findNodeHandle(node))
    } catch (e) {
      console.log("Couldn't focus text input: ", e.message)
    }
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

  handlePressAddIcon() {
    this.setState({
      addingTask: true,
      focusDescriptionInput: true
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
    let projectColor = this.props.navigation.getParam('projectColor', 'green');

    return log.map((task, index) => {
      var hours = Math.floor(task.taskTime / 60);
      var minutes = task.taskTime % 60;
      return (
        <View style={[
          styles.projectCard,
          styles.align,
          { backgroundColor: colors[index % 8] }
        ]}
          key={index}>
          <View style={[styles.flex, styles.rowContainer, { justifyContent: "space-between" }]}>
            <Text style={styles.projectCardText}>{task.taskName}</Text>
            <Text style={styles.projectCardText}>{hours}:{minutes < 10 ? `0${minutes}` : minutes}</Text>
          </View>
          <View styles={styles.flex}>
            <TouchableHighlight
              style={styles.center}
              onPress={() => this.removeTaskAlert(task.projectName, task.date, task.taskTime)}>
              <Image style={styles.trashButton} source={require('../assets/images/deleteIcon.png')} />
            </TouchableHighlight>
          </View>
        </View >
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
    let projectName = this.props.navigation.getParam('projectName', 'Planning');

    return (
      <View style={styles.container}>
        <DrawerMenu navigation={navigation} styles={styles} />
        <View style={[styles.container, styles.paddingTop]} >
          <View style={styles.align}>
            <Text style={styles.headingText}>{projectName}</Text>
          </View>
          <View
            style={[styles.rowContainer, styles.center, styles.align, { marginTop: 15, marginBottom: 50, height: 24 }]}>
            <TouchableHighlight
              onPress={this.state.newTaskName ? this.addTask : () => this.focusTextInput(this.refs.userInput)}>
              <Image style={styles.addIcon} source={require('../assets/images/add.png')} />
            </TouchableHighlight>
            <TextInput
              style={[styles.userInput, styles.headingText, styles.center, { marginBottom: 0, height: 24, paddingBottom: 2, }]}
              placeholder="Add Task"
              placeholderTextColor='#88c8b1'
              onChangeText={(text) => this.handleUserInput(text)}
              ref='userInput'
            />
          </View>
          <View>
            <View style={[styles.rowContainer, styles.taskViewBar]}>
              <View style={[styles.taskViewIconContainer, this.state.pieDisplay ? styles.taskViewActive : ""]}>
                <TouchableHighlight onPress={this.setPie}>
                  <Image style={styles.pieIcon} source={require('../assets/images/pieIcon.png')} />
                </TouchableHighlight>
              </View>
              <View style={[styles.taskViewIconContainer, this.state.pieDisplay ? "" : styles.taskViewActive]}>
                <TouchableHighlight style={styles.align} onPress={this.setList}>
                  <Image style={styles.listIcon} source={require('../assets/images/listIcon.png')} />
                </TouchableHighlight>
              </View>
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
              <ScrollView contentContainerStyle={[styles.align, { paddingBottom: 200 }]}>
                {this.logDisplay()}
              </ScrollView>}
            {this.state.loading === true ?
              <View style={styles.loadingOverlay}></View > :
              <View></View>
            }
          </View>
        </View>
      </View>
    );
  }
}

export default withNavigation(TasksScreen);