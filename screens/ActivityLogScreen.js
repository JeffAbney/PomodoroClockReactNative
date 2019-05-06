import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import DrawerMenu from '../components/DrawerMenu';
import PieChart from '../components/PieChart';


class activityLogScreen extends React.Component {

  static navigationOptions = {
    title: 'Activity Log'
  };

  constructor(props) {
    super(props);

    this.state = {
      username: "Guest",
      log: [],
      loadingFinished: false
    };

    this.logDisplay = this.logDisplay.bind(this);
    this.getLog = this.getLog.bind(this);
    this.getChartData = this.getChartData.bind(this);
  }

  getLog() {
    let username = this.props.screenProps.username
    fetch('http://localhost:3000/showLog', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      })
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          username: res.username,
          log: res.log,
          loadingFinished: true
        })
      })
  }

  logDisplay() {
    let styles = this.props.screenProps.styles;
    return this.state.log.map((act, index) => {
      return (
        <View style={styles.activityCard} key={index}>
          <Text>{act.activityCategory}</Text>
          <Text>{act.activityName}</Text>
          <Text>{act.activityTime}</Text>
          <Text>{act.date}</Text>
        </View>
      )
    })
  }

  getChartData(cat) {
    let arr = this.state.log;
    let category = arr.filter((act) => act.activityCategory === cat
    )
    let catTime = 0;
    let getCatTime = function () {
      category.forEach((act) => catTime += act.activityTime);
      return catTime;
    }
    let getTasksWithTimes = function () {
      let taskNames = [];
      category.forEach((act) => {
        if (!taskNames.includes(act.activityName)) {
          taskNames.push(act.activityName);
        };
      })
      let tasksWithTimes = [];
      let getTimes = function () {
        if (taskNames.length !== 0) {
          let taskTime = 0;
          getCatTime();
          for (i = 0; i < taskNames.length; i++) {
            let taskName = taskNames[i];
            for (j = 0; j < category.length; j++) {
              category[j].activityName === taskName ? taskTime += Math.floor(category[j].activityTime / catTime * 100) : ""
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

  render() {
    let { isLoggedIn, styles, username } = this.props.screenProps;
    const { navigation } = this.props;
    if (isLoggedIn) {
      if (username != this.state.username) {
        this.getLog();
      }
      if (this.state.loadingFinished) {
        return (
          <ScrollView style={[styles.container, styles.paddingTop]}>
            <DrawerMenu navigation={navigation} styles={styles} />
            <Text style={styles.text}>Logged in as: {this.state.username}</Text>
            <PieChart
              data={this.getChartData("Planning")}
              pieWidth={150}
              pieHeight={150}
              onItemSelected={this._onPieItemSelected}
              width={500}
              height={200} />
          </ScrollView>
        );
      } else {
        return (
          <ScrollView style={[styles.container, styles.paddingTop]}>
            <DrawerMenu navigation={navigation} styles={styles} />
            <Text style={styles.text}>Logged in as: {this.state.username}</Text>
            <Text>...Loading</Text>
            {this.logDisplay()}
          </ScrollView>
        );
      }

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

export default withNavigation(activityLogScreen);