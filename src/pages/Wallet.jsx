import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/nunito";

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
        <View style={styles.body}></View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    top: 25,
    backgroundColor: "#4C66AB",
  },
  body: {
    backgroundColor: "#743095",
    height: "93%",
    width: "98%",
    borderRadius: 30,
    zIndex: 1,
    elevation: 15,
    top: 10,
  },
});

export default Wallet;
