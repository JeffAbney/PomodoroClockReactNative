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

  onPressSocial() {
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
          <Image style={styles.logoBig} source={require('../assets/images/logoBig.png')} />
        </View>
        <View style={[styles.align, {height: 150}]}>
          <Text style={[styles.headingText, styles.shareText]}>
          If you think a friend or team{'\n'}
          member might like diddit,{'\n'}
          help us out by sharing it.
          </Text>
        </View>
        <View style={[styles.container, styles.align]}>
          <View style={[styles.rowContainer, styles.align, {marginBottom: 10, justifyContent: 'flex-start'}]}>
            <TouchableOpacity onPress={() => this.onPressSocial()}>
              <Image style={styles.socialIcon} source={require('../assets/images/fb.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPressSocial()}>
              <Image style={styles.socialIcon} source={require('../assets/images/twitter.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPressSocial()}>
              <Image style={styles.socialIcon} source={require('../assets/images/instagram.png')}/>
            </TouchableOpacity>
          </View>
          <View style={[styles.rowContainer, styles.align]}>
            <TouchableOpacity onPress={() => this.onPressSocial()}>
              <Image style={styles.socialIcon} source={require('../assets/images/linkedin.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPressSocial()}>
              <Image style={styles.socialIcon} source={require('../assets/images/pinterest.png')}/>
            </TouchableOpacity>
          </View>
          <Text style={[styles.headingText, styles.shareText, {marginTop: 60}]}>Thanks!</Text>
        </View>
      </View>
    )
  }
}