import React from 'react';
import { ScrollView, TouchableHighlight, Text, View, TextInput } from 'react-native';
import { withNavigation, StackActions, NavigationActions } from 'react-navigation';
import DrawerMenu from '../components/DrawerMenu';
import PieChart from '../components/PieChart';
import styles from '../constants/Styles'

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
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.addTask = this.addTask.bind(this);
    this.logDisplay = this.logDisplay.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.setPie = this.setPie.bind(this);
    this.setList = this.setList.bind(this);
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
    handleSetState({sessionTime: 0});
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

  logDisplay() {
    let log = this.props.navigation.getParam('projectLog', []);
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
      </ScrollView>
    );
  }
}

export default withNavigation(TasksScreen);