import React, { Component } from 'react';
import styles from '../constants/Styles';
import {
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

export default class DrawerMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation, loggedIn, username } = this.props;

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
