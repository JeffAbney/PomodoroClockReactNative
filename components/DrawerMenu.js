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
    const { navigation, loggedIn, username } = this.props;
    let styles = this.props.styles;

    return (
      <TouchableWithoutFeedback onPress={navigation.openDrawer}>
        <Image
          style={styles.drawerIcon}
          source={require('../assets/images/hamburgerIcon.png')}
        />
      </TouchableWithoutFeedback>
    )
  }
}
