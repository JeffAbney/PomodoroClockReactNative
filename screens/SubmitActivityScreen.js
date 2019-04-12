import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  Alert,
  Button,
  View
} from 'react-native';

export default class SubmitActivityScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {}

  }

  render() {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})