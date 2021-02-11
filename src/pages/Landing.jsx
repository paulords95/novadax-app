import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import NavigationBar from "../components/NavigationBar";

const Landing = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.body}></View>
      <NavigationBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#743095",
    height: "65%",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    zIndex: 1,
    elevation: 5,
  },
  body: {
    backgroundColor: "#494949",
    height: "30%",
    marginTop: -30,
  },
});

export default Landing;
