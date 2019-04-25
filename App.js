import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import lightStyles from './constants/LightStyles';
import darkStyles from './constants/DarkStyles';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isLoggedIn: false,
      username: "Guest",
      styles: lightStyles,
    };

    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
  }

  logIn(username) {
    console.log("Loggin in");
    this.setState({
      isLoggedIn: true,
      username: username
    });
  }

  logOut() {
    this.setState({
      isLoggedIn: false,
      username: "Guest"
    });
  }

  changeTheme() {
    this.setState({
      styles: this.state.styles === lightStyles ? darkStyles : lightStyles
    })
  }

  render() {
    let styles = this.state.styles;
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator 
            screenProps={{ 
              isLoggedIn: this.state.isLoggedIn,
              changeTheme: this.changeTheme, 
              onLogOut: this.logOut, 
              onLogIn: this.logIn,
              username: this.state.username,
              styles: this.state.styles }} />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/back.png'),
        require('./assets/images/border.png'),
        require('./assets/images/button.png'),
        require('./assets/images/next.png'),
        require('./assets/images/pause.png'),
        require('./assets/images/play.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
