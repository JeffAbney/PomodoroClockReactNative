import React, { Component } from 'react';

import {
  Text,
  View,
} from 'react-native';


export default class IntroScreen extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    drawerLabel: 'Intro',
  };

  render() {
    const { navigation } = this.props;
    let { styles } = this.props.screenProps;

    return (
      <View style={styles.container}>
        <DrawerMenu navigation={navigation} styles={styles}/>
        <Text>This is how diddit works:</Text>
        <Text>Blah blah blah</Text>
      </View>
    )
  }
}