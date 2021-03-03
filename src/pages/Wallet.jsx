import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/nunito";

import AssetsPieGraph from "../components/AssetsPieGraph";

const Wallet = () => {
  let [fontsLoaded, error] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <Text>Carregando</Text>;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Carteira</Text>
        <View style={styles.body}>
          <AssetsPieGraph />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#4C66AB",
  },
  body: {
    backgroundColor: "#743095",
    height: "83%",
    width: "92%",
    borderRadius: 10,
    zIndex: 1,
    elevation: 5,
    top: 60,
  },
  title: {
    justifyContent: "center",
    color: "white",
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 25,
    top: 50,
  },
});

export default Wallet;
