import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const NavigationBar = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 5,
    backgroundColor: "#e1e1e1",
    zIndex: 1,
  },
});

export default NavigationBar;
