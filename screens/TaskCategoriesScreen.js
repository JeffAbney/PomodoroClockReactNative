import React from 'react';
import { ScrollView, TouchableHighlight, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import DrawerMenu from '../components/DrawerMenu';
import PieChart from '../components/PieChart';

class TaskCategoriesScreen extends React.Component {

  static navigationOptions = {
    title: 'My Projects'
  };

  constructor(props) {
    super(props);

    this.state = {
      username: "Guest",
      log: [],
      categories: [],
      loadingFinished: false,
    }

    this.getLog = this.getLog.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.categoryDisplay = this.categoryDisplay.bind(this);
    this.navigateToTaskName = this.navigateToTaskName.bind(this);
  }

  getCategories(log) {
    console.log("Getting Categories")
    if (log === []) {
      console.log("Log is empty")
    } else {
      let categoryData = {};
      log.forEach((act) => {
        let category = act.activityCategory;
        if (!categoryData.hasOwnProperty(category)) {
          categoryData[category] = {
            activityCategory: category,
            categoryTime: act.activityTime,
            startDate: act.date
          };
        } else {
          categoryData[category].categoryTime += act.activityTime;
          if (categoryData[category].startDate > act.date) {
            categoryData[category].startDate = act.date;
          }
        }
      })
      this.setState({
        categories: Object.entries(categoryData),
        loadingFinished: true,
      })
    }
  }

  getLog() {
    console.log("Getting Log");
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
        })
        console.log("Setting log to:", res.log)
        this.getCategories(res.log);
      })
  }

  navigateToTaskName(cat) {
    this.props.navigation.navigate('TaskNames', { category: cat} );
  }

  categoryDisplay() {
    let styles = this.props.screenProps.styles;
    var dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    console.log("Displaying cats", this.state.categories);
    return this.state.categories.map((cat, index) => {
      return (
        <TouchableHighlight
          key={`category ${index}`}
          onPress={() => this.navigateToTaskName(cat[1].activityCategory)}
        >
          <View style={styles.activityCard} >
            <Text>{cat[1].activityCategory}</Text>
            <Text>Total Time: {cat[1].categoryTime}</Text>
            <Text>Started on {new Date(cat[1].startDate).toLocaleDateString("en-US")}</Text>
          </View>
        </TouchableHighlight >
      )
    })
  }

  render() {
    let { isLoggedIn, styles, username } = this.props.screenProps;
    const { navigation } = this.props;
    if (isLoggedIn) {
      if (username != this.state.username) {
        this.getLog();
      }
      return (
        <ScrollView>
          <DrawerMenu navigation={navigation} styles={styles} />
          <Text style={styles.text}>Logged in as: {username}</Text>
          {this.state.loadingFinished ?
            this.categoryDisplay()
            :
            <Text>Loading categories </Text>}
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

export default withNavigation(TaskCategoriesScreen);