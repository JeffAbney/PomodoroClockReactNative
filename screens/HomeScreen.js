import React, { Component } from 'react';
import DrawerMenu from '../components/DrawerMenu';
import styles from '../constants/Styles';
import { View } from 'react-native';
import { Clock } from '../components/Clock'

export default class HomeScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    header: null
  };

  constructor(props){
    super(props);

    this.state = {
      loading: false,
    }

    this.setLoadState = this.setLoadState.bind(this);
  }

 setLoadState(bool) {
    console.log("Toggling Load State to", bool)
    this.setState({
      loading: bool
    })
  }

  render() {
    const { navigation } = this.props;
    let projectName = this.props.navigation.getParam('projectName', undefined);
    let taskName = this.props.navigation.getParam('taskName', undefined);

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <DrawerMenu navigation={navigation} styles={styles} />
          </View>
          <View style={[styles.flex, { marginTop: 30 }]}>
            <Clock
              screenProps={this.props.screenProps}
              navigation={navigation}
              projectName={projectName}
              taskName={taskName}
              setLoadState={this.setLoadState}
            />
          </View>
        </View>
        { this.state.loading === true ? <View style={styles.loadingOverlay}></View > : <View></View>}
      </View>
    );
  }
}
