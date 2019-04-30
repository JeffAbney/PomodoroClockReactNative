import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import DrawerMenu from '../components/DrawerMenu';

class activityLogScreen extends React.Component {

  static navigationOptions = {
    title: 'Activity Log'
  };

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

  render() {
    let loggedIn = this.props.screenProps.isLoggedIn;
    let styles = this.props.screenProps.styles;
    const { navigation } = this.props;
    if (loggedIn) {
      if (this.props.screenProps.username != this.state.username) {
        this.getLog();
      }
      return (
        <ScrollView style={[styles.container, styles.paddingTop]}>
        <DrawerMenu navigation={navigation} styles={styles}/>
          <Text style={styles.text}>Logged in as: {this.state.username}</Text>
          {this.logDisplay()}
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.container}>
        <DrawerMenu navigation={navigation} styles={styles}/>
          <Text style={styles.welcomeText}>Please Log In to view Activity Log</Text>
        </View>
      )
    }
  }
}

export default withNavigation(activityLogScreen);