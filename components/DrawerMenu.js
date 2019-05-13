import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
  StyleSheet,
  Platform
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

export default class DrawerMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation, loggedIn, username, styles } = this.props;

    return (
      <TouchableWithoutFeedback onPress={navigation.openDrawer}>
        <Image
          style={styles.drawerIcon}
          source={require('../assets/images/Group.png')}
        />
      </TouchableWithoutFeedback>
    )
  }
}
