import { StatusBar } from "expo-status-bar";
import { AppLoading } from "expo-app-loading";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";

import { apiDax } from "../services/api";

import PriceGraph from "../components/PriceGraph";

import arrow from "../../assets/arrow.png";

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
    ask: 0,
    bid: 0,
    high24h: 0,
    low24h: 0,
  });

  useEffect(() => {
    apiDax
      .get("/v1/market/ticker?symbol=DOGE_BRL")
      .then((data) => {
        setDogePrice(data.data.data);
      })
      .then(() => {
        setInterval(() => {
          apiDax.get("/v1/market/ticker?symbol=DOGE_BRL").then((data) => {
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
            <View
              style={{
                height: 30,
                left: 10,
              }}
            >
              <Image
                source={arrow}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 7,
                  borderWidth: 1,
                  paddingLeft: 10,
                  borderRadius: 50,
                  marginTop: 5,
                }}
              />
            </View>
          </View>
          <PriceGraph />
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
              <Text style={styles.priceText}>Compra</Text>
              <Text style={styles.priceValue}>
                {parseFloat(dogePrice.ask).toFixed(4)}
              </Text>
            </View>
            <View style={styles.priceWrap}>
              <Text style={styles.priceText}>Venda</Text>
              <Text style={styles.priceValue}>
                {parseFloat(dogePrice.bid).toFixed(4)}
              </Text>
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
              <Text style={styles.priceText}>Alta</Text>
              <Text style={styles.priceValue}>
                {parseFloat(dogePrice.high24h).toFixed(4)}
              </Text>
            </View>
            <View style={styles.priceWrap}>
              <Text style={styles.priceText}>Baixa</Text>
              <Text style={styles.priceValue}>
                {parseFloat(dogePrice.low24h).toFixed(4)}
              </Text>
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
    backgroundColor: "#4C66AB",
  },
  header: {
    backgroundColor: "#743095",
    height: "65%",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    zIndex: 1,
    elevation: 7,
    width: "97%",
    alignSelf: "center",
  },
  body: {
    backgroundColor: "#4C66AB",
    marginTop: -30,
    flex: 1,
    alignItems: "center",
  },
  titleWrap: {
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    height: 30,
    width: "20%",
    backgroundColor: "#80379A",
    marginTop: 80,
    borderWidth: 0.3,
    elevation: 2,
    borderColor: "#4C66AB",
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
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
    paddingHorizontal: 20,
    height: 25,
  },
  priceText: {
    color: "white",
    fontFamily: "Nunito_600SemiBold",
    fontSize: 15,
    textAlign: "center",
  },
  priceValue: {
    color: "#C6BDBD",
    fontFamily: "Nunito_600SemiBold",
    fontSize: 15,
    textAlign: "center",
  },
  subTitle: {
    justifyContent: "center",
    color: "white",
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 20,
  },
});

export default Landing;
