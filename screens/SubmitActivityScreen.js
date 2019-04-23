import React, { Component } from 'react';
import styles from '../constants/LightStyles'
import {
  StyleSheet,
  Text,
  Alert,
  Button,
  View,
  Picker
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class SubmitActivityScreen extends Component {
  static navigationOptions = {
    header: null,
  };



  constructor(props) {
    super(props);
    this.state = {
      activityCategoryList: ["Planning", "Coding", "Running"],
      activityCategory: "Planning",
      activityName: ""
    }

    this._onChangeActivityCategory = this._onChangeActivityCategory.bind(this);
    this._onChangeActivityName = this._onChangeActivityName.bind(this);
    this._onSubmitActivity = this._onSubmitActivity.bind(this);
    this.activityCategoryList = this.activityCategoryList.bind(this);
    this.fetchCategoryList = this.fetchCategoryList.bind(this);
  }

  componentDidMount(){
    this.fetchCategoryList()
  };

  fetchCategoryList() {
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
        if (res.activityCategoryList != null) {
          this.setState({
            activityCategoryList: res.activityCategoryList
          })
        }
        
      })
  } 



  _onChangeActivityCategory(itemValue) {
    this.setState({ activityCategory: itemValue })
  }

  _onChangeActivityName(name) {
    this.setState({ activityName: name })
  }

  _onSubmitActivity() {
    const { navigation } = this.props;
    const loggedIn = navigation.getParam('loggedIn', false);
    const username = navigation.getParam('username', "guest");
    const activityTime = navigation.getParam('activityTime', 15);

    let { activityCategory, activityName } = this.state;
    fetch('http://localhost:3000/log', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        activityCategory: activityCategory,
        activityName: activityName,
        activityTime: activityTime,
        date: new Date()
      })
    })
      .then(res => {
        return res.text()
      })
      .then(res => {
        console.log(res);
        if (res == "OK") {
          this.props.navigation.navigate('Home', {
            loggedIn: true,
            username: username
          })
        } else {
          Alert.alert("Error",
            "There was a problem saving your activity",
            [{ text: "OK" }]);
          this.props.navigation.navigate('Home', {
            loggedIn: true,
            username: username
          })
        }
      })
  }

  activityCategoryList() {
    return this.state.activityCategoryList.map((cat) => {
      return (
        <Picker.Item key={cat} label={cat} value={cat} />
      )
    }

    )}

  render() {
    return (
      <View style={[styles.container, styles.center]}>
        <Text>Activity Category</Text>
        <Picker
          selectedValue={this.state.activityCategory}
          style={{ height: 50, width: 300 }}
          onValueChange={this._onChangeActivityCategory}
        >
          {this.activityCategoryList()}
        </Picker>
        <Text>Activity Name</Text>
        <TextInput
          style={styles.userinput}
          onChangeText={this._onChangeActivityName}
        />
        <Button title="Submit" onPress={this._onSubmitActivity} />
      </View>
    )

  }
}

