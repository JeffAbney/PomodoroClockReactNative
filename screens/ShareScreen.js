import React, { Component } from 'react';
import { Linking, Share, Platform } from 'react-native';
import styles from '../constants/Styles';

import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import DrawerMenu from '../components/DrawerMenu';

export default class ShareScreen extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    drawerLabel: 'Share',
  };

  onPressShare() {
    Share.share({
      ...Platform.select({
        ios: {
          message: 'This app is super useful!',
          url: 'https://jeffabney.com/'
        },
        android: {
          message: 'This app is super useful! \n https://jeffabney.com/'
        }
      }),
      title: 'diddit is dope!'
    }, {
      ...Platform.select({
        ios: {
          // iOS only:
          excludedActivityTypes: [
            'com.apple.UIKit.activity.PostToTwitter'
          ]
        },
        android: {
          // Android only:
          dialogTitle: 'Share diddit with a friend'
        }
      })
    });
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <DrawerMenu navigation={navigation} styles={styles} />
        <View style={[styles.logoContainer, { flex: 0, marginBottom: 30 }]}>
          <Image style={styles.logoBig} source={require('../assets/images/Logo_diddit.png')} />
        </View>
        <View style={[styles.align, {height: 150}]}>
          <Text style={[styles.headingText, styles.shareText]}>
          If you think a friend or team{'\n'}
          member might like diddit,{'\n'}
          help us out by sharing it.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, {width: 100}]} onPress={this.onPressShare}>
            <Text style={styles.buttonText}>Share!</Text>
          </TouchableOpacity>
        </View>
          
      </View>
    )
  }
}