import { StatusBar } from "expo-status-bar";
import { AppLoading } from "expo-app-loading";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import api from "../services/api";

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

  const [dogePrice, setDogePrice] = useState({
    ask: "",
    bid: "",
    high24h: "",
    low24h: "",
  });

  useEffect(() => {
    api
      .get("/v1/market/ticker?symbol=DOGE_BRL")
      .then((data) => {
        setDogePrice(data.data.data);
      })
      .then(() => {
        setInterval(() => {
          api.get("/v1/market/ticker?symbol=DOGE_BRL").then((data) => {
            setDogePrice(data.data.data);
          });
        }, 5000);
      });
  }, []);

  if (!fontsLoaded) {
    return <Text>Carregando</Text>;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleWrap}>
            <Text style={styles.currencyName}>DOGE</Text>
          </View>
        </View>
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
              <Text style={styles.priceValue}>{dogePrice.ask}</Text>
            </View>
            <View style={styles.priceWrap}>
              <Text style={styles.priceText}>Venda: </Text>
              <Text style={styles.priceValue}>{dogePrice.bid}</Text>
            </View>
          </View>
          <Text style={styles.subTitle}>Últimas 24 horas</Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <View style={styles.priceWrap}>
              <Text style={styles.priceText}>Alta: </Text>
              <Text style={styles.priceValue}>{dogePrice.high24h}</Text>
            </View>
            <View style={styles.priceWrap}>
              <Text style={styles.priceText}>Baixa: </Text>
              <Text style={styles.priceValue}>{dogePrice.low24h}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
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
  titleWrap: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    height: 30,
    width: "20%",
    backgroundColor: "#80379A",
    marginTop: 50,
    elevation: 5,
    borderBottomWidth: 0.3,
    borderLeftWidth: 0.3,
  },
  currencyName: {
    color: "white",
    fontFamily: "Nunito_800ExtraBold",
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
    height: 25,
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
  subTitle: {
    justifyContent: "center",
    color: "white",
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 20,
  },
});

export default Landing;
