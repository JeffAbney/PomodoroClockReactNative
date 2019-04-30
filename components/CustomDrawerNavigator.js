import React from "react";
import { View } from "react-native";
import { DrawerItems } from "react-navigation";

import styles from "../constants/LightStyles";

const CustomDrawerNavigator = props => (
  <View style={[styles.container]}>
    <DrawerItems
      activeBackgroundColor={"black"}
      activeTintColor={"white"}
      iconContainerStyle={styles.icons}
      {...props}
    />
  </View>
);

export default CustomDrawerNavigator;