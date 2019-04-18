import React from 'react';
import { ScrollView, StyleSheet,Text } from 'react-native';
import { withNavigation } from 'react-navigation';

class activityLogScreen extends React.Component {
  static navigationOptions = {
    title: 'Activity Log',
  };


  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Logged in : {this.props.screenProps.isLoggedIn ? "True" : "False"}</Text>
      </ScrollView>
    );
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
});
