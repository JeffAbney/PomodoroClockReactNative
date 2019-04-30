import React, { Component } from 'react';

import {
  Text,
  View,
} from 'react-native';

import DrawerMenu from '../components/DrawerMenu';

export default class AboutScreen extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    drawerLabel: 'About',
  };

  render() {
    const { navigation } = this.props;
    let { styles } = this.props.screenProps;

    return (
      <View style={styles.container}>
        <DrawerMenu navigation={navigation} styles={styles}/>
        <Text>Diddit: Productivity and Time tracking app.</Text>
        <Text>Version: 0.0.1</Text>
      </View>
    )
  }
}