import React, { Component } from 'react';
import { Linking } from 'react-native';
import styles from '../constants/Styles';
import {
  Text,
  View,
  Image,
  TouchableHighlight
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

    return (
      <View style={styles.container}>
        <DrawerMenu navigation={navigation} styles={styles} />
        <View style={[styles.logoContainer, { flex: 0, marginBottom: 30 }]}>
          <Image style={styles.logoBig} source={require('../assets/images/logoBig.png')} />
        </View>
        <View style={[styles.container, styles.align, { justifyContent: 'flex-start' }]}>
          <Text style={styles.aboutSectionText}>
            diddit is the first full stack app{"\n"}
            from husband and wife duo{"\n"}
            Jeff Abney
            <Text onPress={() => Linking.openURL('https://jeffabney.com/')}
            > (www.jeffabney.com) </Text>
            and{"\n"}
            Daniela Trujillo
            <Text onPress={() => Linking.openURL('https://daniela-trujillo.com/')}
            > (www.daniela-trujillo.com) </Text>
          </Text>
          <Text style={styles.aboutSectionText}>
            Designed to help you track your{"\n"}
            productivity, diddit displays the time{"\n"}
            you spend working in a simple and{"\n"}
            communicative way.{"\n"}
          </Text>

        </View>
        <View style={[styles.container, styles.align]}>
          <Text style={[styles.headingText, { marginBottom: 15, marginTop: 20, textAlign: 'center' }]}>
            If you’d like to contact us,{'\n'}
            drop us a line at:
          </Text>
          <TouchableHighlight onPress={() => Linking.openURL('mailto:hello@jeffabney.com')}>
            <Text style={styles.headingText}>
              hello@jeffabney.com
          </Text>
          </TouchableHighlight>
          <Text style={styles.headingText}>
            or
          </Text>
          <TouchableHighlight onPress={() => Linking.openURL('mailto:hi@daniela-trujillo.com')}>
            <Text style={styles.headingText}>
              hi@daniela-trujillo.com
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}