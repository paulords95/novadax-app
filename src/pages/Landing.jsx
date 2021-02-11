import { StatusBar } from "expo-status-bar";
import { AppLoading } from "expo-app-loading";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import NavigationBar from "../components/NavigationBar";

import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/nunito";

const Landing = () => {
  let [fontsLoaded, error] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.body}>
        <Text style={styles.title}>Cotação Atual</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View style={styles.priceWrap}>
            <Text style={styles.priceText}>Compra: </Text>
            <Text style={styles.priceValue}>0,39</Text>
          </View>
          <View style={styles.priceWrap}>
            <Text style={styles.priceText}>Venda: </Text>
            <Text style={styles.priceValue}>0,39</Text>
          </View>
        </View>
      </View>
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
    elevation: 15,
  },
  body: {
    backgroundColor: "#4C66AB",
    marginTop: -35,
    flex: 1,
    flexBasis: "20%",
    alignItems: "center",
  },
  title: {
    marginTop: 45,
    justifyContent: "center",
    color: "white",
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 20,
  },
  priceWrap: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 50,
  },
  priceText: {
    color: "white",
    fontFamily: "Nunito_600SemiBold",
    fontSize: 15,
  },
  priceValue: {
    color: "#C6BDBD",
    fontFamily: "Nunito_600SemiBold",
    fontSize: 15,
  },
});

export default Landing;
