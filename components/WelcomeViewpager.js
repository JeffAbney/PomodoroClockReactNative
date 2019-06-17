import React, { Component } from 'react';
import styles from '../constants/Styles.js';
import {
  Text,
  View,
  ViewPagerAndroid,
} from 'react-native';


export default class WelcomeViewpager extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dot0: [styles.paginationDot, styles.paginationDotActive],
      dot1: styles.paginationDot,
      dot2: styles.paginationDot
    }
    this.handlePageSelected = this.handlePageSelected.bind(this);
  }

  handlePageSelected(index) {
    console.log(index);
    if (index === 0) {
      this.setState({
        dot0: [styles.paginationDot, styles.paginationDotActive],
        dot1: styles.paginationDot,
        dot2: styles.paginationDot
      })
    } else if (index === 1) {
      this.setState({
        dot0: styles.paginationDot,
        dot1: [styles.paginationDot, styles.paginationDotActive],
        dot2: styles.paginationDot
      })
    } else if (index === 2) {
      this.setState({
        dot0: styles.paginationDot,
        dot1: styles.paginationDot,
        dot2: [styles.paginationDot, styles.paginationDotActive],
      })
    }
  }

  render() {

    return (
      <View style={[styles.container, styles.center, styles.align]}>
        <ViewPagerAndroid
          style={[styles.viewPager]}
          initialPage={0}
          onPageSelected={(i) => this.handlePageSelected(i.nativeEvent.position)}>
          <View style={styles.viewPageStyle} key="1">
            <Text style={styles.welcomeText}>diddit is a productivity and time tracking app.</Text>
          </View>
          <View style={styles.viewPageStyle} key="2">
            <Text style={styles.welcomeText}>Choose your work session and break lengths.</Text>
            <Text style={styles.welcomeText}>Hit start and get to work!</Text>
          </View>
          <View style={styles.viewPageStyle} key="3">
            <Text style={styles.welcomeText}>When you finish your first session, you will be prompted
         to save your session in order to track how much time you spend on different tasks.</Text>
          </View>
        </ViewPagerAndroid>
        <View style={styles.paginationContainer}>
          <View style={this.state.dot0} />
          <View style={this.state.dot1} />
          <View style={this.state.dot2} />
        </View>
      </View>

    )
  }
}