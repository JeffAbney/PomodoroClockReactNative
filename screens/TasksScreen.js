import React from 'react';
import { ScrollView, TouchableHighlight, Text, View, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import DrawerMenu from '../components/DrawerMenu';
import PieChart from '../components/PieChart';

class TasksScreen extends React.Component {

  static navigationOptions = {
    title: 'Activity Log',
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      username: "Guest",
      log: [],
      pieDisplay: true,
      loadingFinished: false,
      newTaskName: undefined,
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.addTask = this.addTask.bind(this);
    this.logDisplay = this.logDisplay.bind(this);
    this.getLog = this.getLog.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.setPie = this.setPie.bind(this);
    this.setList = this.setList.bind(this);
  }

  componentDidMount() {
    this.getLog();
  }

  handleUserInput(text) {
    this.setState({
      newTaskName: text
    })
  }

  addTask() {
    let projectName = this.props.navigation.getParam('project', 'Planning');
    let taskName = this.state.newTaskName;
    this.props.navigation.navigate("Home", {projectName: projectName, taskName: taskName});
  }

  getLog() {
    let log = this.props.navigation.getParam('projectLog', []);
    console.log("TasksScreen Log", log)
    this.setState({
      log: log,
      loadingFinished: true
    })
  }

// UPDATE FOR NEW API
  logDisplay() {
    let styles = this.props.screenProps.styles;
    let project = this.props.navigation.getParam('project', 'Planning');
    let log = this.state.log;

    return log.map((task, index) => {
      return (
        <View style={styles.activityCard} key={index}>
          <Text>{task.projectName}</Text>
          <Text>{task.taskName}</Text>
          <Text>{task.taskTime} minute(s)</Text>
          <Text>{new Date(task.date).toLocaleDateString("en-US")}</Text>
        </View>
      )
    })
  }


  getChartData() {
    let log = this.state.log;
    let projectTime = this.props.navigation.getParam('projectTime', 2);
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
              console.log("Got here", log[j]);
              console.log("project Time", projectTime);
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
    let { isLoggedIn, styles, username } = this.props.screenProps;
    const { navigation } = this.props;
    let projectTime = this.props.navigation.getParam('projectTime', 0);

    if (this.state.log === this.props.navigation.getParam('projectLog', [])) {
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
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={[styles.container, styles.paddingTop]}>
          <DrawerMenu navigation={navigation} styles={styles} />
          <Text style={styles.text}>Logged in as: {this.state.username}</Text>
          <Text>...Loading</Text>
        </ScrollView>
      );
    }
  }
}

export default withNavigation(TasksScreen);