import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import TabNavigation from "./src/components/TabNavigation";

export default function App() {
  return (
    <View style={{flex: 1, backgroundColor: '#4C66AB'}}>
     <TabNavigation />
  </View>
  )
}
