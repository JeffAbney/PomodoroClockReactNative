import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';

class activityLogScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "Guest",
      log: []
    };

    this.logDisplay = this.logDisplay.bind(this);
    this.getLog = this.getLog.bind(this);
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
          log: res.log
        })
      })
  }

  logDisplay() {
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

  static navigationOptions = {
    title: 'Activity Log'
  };

  render() {
    let loggedIn = this.props.screenProps.isLoggedIn;
    if (loggedIn) {
      if (this.props.screenProps.username != this.state.username) {
        this.getLog();
      }
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.text}>Logged in as: {this.state.username}</Text>
          {this.logDisplay()}
        </ScrollView>
      );
    } else {
      return (
        <Text>Please Log In to view Activity Log</Text>
      )
    }

  }
}

export default withNavigation(activityLogScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  text: {
    backgroundColor: 'red'
  },
  activityCard: {
    flex: 1,
    marginTop: 1,
    paddingTop: 5,
    backgroundColor: 'grey',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'black',
    elevation: 2
  },
});