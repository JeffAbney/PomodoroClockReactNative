import React, { Component } from 'react';
import styles from '../constants/Styles';

import {
  Text,
  View,
  TouchableHighlight,
  Alert
} from 'react-native';

import DrawerMenu from '../components/DrawerMenu';

export default class ShareScreen extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    drawerLabel: 'Share',
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <DrawerMenu navigation={navigation} styles={styles}/>
        <Text>Share our App with your friends!</Text>
        <TouchableHighlight onPress={()=>Alert.alert("Coming Soon!")}>
            <Text> Touch Here!</Text>
        </TouchableHighlight>
      </View>
    )
  }
}