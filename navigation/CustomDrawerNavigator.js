import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from '../constants/Styles';
import { NavigationActions, StackActions } from 'react-navigation';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';

class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  signOut() {
    const resetAction = StackActions.reset({
      index: 1,
      actions: [NavigationActions.navigate({ routeName: 'Home' }),
      NavigationActions.navigate({ routeName: 'LogIn' }),],
    });
    this.props.screenProps.onLogOut();
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    let { isLoggedIn } = this.props.screenProps;
    let { navigation } = this.props;

    return (
      <View style={styles.customDrawerNavigator}>
        <TouchableOpacity style={styles.closeButtonContainer} onPress={() => this.props.navigation.closeDrawer()}>
          <Image style={{ height: 100, width: 100 }} source={require('../assets/images/close.png')} />
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.navSectionStyle}>
            <View style={styles.drawerItemIconContainer}>
              <Image style={{ height: 29, width: 29 }} source={require('../assets/images/home.png')} />
            </View>
            <Text style={styles.navItemText} onPress={this.navigateToScreen('Home')}>
              Home
              </Text>
          </View>
          <View style={styles.navSectionStyle}>
            <View style={styles.drawerItemIconContainer}>
              <Image style={{ height: 30, width: 23 }} source={require('../assets/images/projects.png')} />
            </View>
            <Text style={styles.navItemText} onPress={this.navigateToScreen('Projects')}>
              Projects
              </Text>
          </View>
          <View style={styles.navSectionStyle}>
            <View style={styles.drawerItemIconContainer}>
              <Image style={{ height: 28, width: 29 }} source={require('../assets/images/about.png')} />
            </View>
            <Text style={styles.navItemText} onPress={this.navigateToScreen('About')}>
              About
              </Text>
          </View>
          <View style={styles.navSectionStyle}>
            <View style={styles.drawerItemIconContainer}>
              <Image style={{ height: 30, width: 27 }} source={require('../assets/images/share.png')} />
            </View>
            <Text style={styles.navItemText} onPress={this.navigateToScreen('Share')}>
              Share
              </Text>
          </View>
          <View style={styles.navSectionStyle}>
            <View style={styles.drawerItemIconContainer}>
              <Image
                style={
                  isLoggedIn ? 
                  { height: 32, width: 42 } :
                  { height: 30, width: 30 }
                }
                source={
                  isLoggedIn ?
                    require('../assets/images/log_out.png') :
                    require('../assets/images/google.png')}
              />
            </View>
            <Text style={styles.navItemText} onPress={() => isLoggedIn ? this.signOut() : navigation.navigate('Intro')}>
              {isLoggedIn ? 'Log Out' : 'Log In'}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;