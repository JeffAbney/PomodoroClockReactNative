import React, { Component } from 'react';
import styles from '../constants/Styles';
import {
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

export default class BackArrow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButtonIcon}
          source={require('../assets/images/backButton.png')}
        />
      </TouchableWithoutFeedback>
    )
  }
}