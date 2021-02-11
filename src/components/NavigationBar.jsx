import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

import homeBtn from "../../assets/home-btn.png";
import walletBtn from "../../assets/wallet-btn.png";
import keyBtn from "../../assets/key-btn.png";

const NavigationBar = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.homeBtn}>
          <Image source={homeBtn} style={{ width: 50, height: 50 }} />
        </View>
        <View style={styles.walletBtn}>
          <Image source={walletBtn} style={{ width: 50, height: 50 }} />
        </View>
        <View style={styles.keyBtn}>
          <Image source={keyBtn} style={{ width: 50, height: 50 }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 5,
    backgroundColor: "#e1e1e1",
    zIndex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: -10,
  },
  homeBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#494949",
    width: 70,
    padding: 30,
  },
  walletBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    padding: 30,
  },
  keyBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    padding: 30,
  },
});

export default NavigationBar;
