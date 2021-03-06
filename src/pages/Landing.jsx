import { StatusBar } from "expo-status-bar";
import { AppLoading } from "expo-app-loading";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";

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
  const [pickerItem, setPickerItem] = useState("BTC");
  const [updatePrice, setUpdatePrice] = useState(0);

  useEffect(() => {
    apiDax.get(`/v1/market/ticker?symbol=${pickerItem}_BRL`).then((data) => {
      setDogePrice(data.data.data);
    });
  }, [pickerItem]);

  if (!fontsLoaded) {
    return <Text>Carregando</Text>;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleWrap}>
            <Picker
              selectedValue={pickerItem}
              mode="dropdown"
              style={styles.userPicker}
              onValueChange={(itemValue, itemIndex) => {
                setPickerItem(itemValue);
              }}
            >
              <Picker.Item label={"BTC"} key={"BTC"} value={"BTC"} />
              <Picker.Item label={"ADA"} key={"ADA"} value={"ADA"} />
              <Picker.Item label={"DOGE"} key={"DOGE"} value={"DOGE"} />
              <Picker.Item label={"ETH"} key={"ETH"} value={"ETH"} />
            </Picker>
          </View>
          <PriceGraph currency={pickerItem} />
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
                {"R$" +
                  parseFloat(dogePrice.ask).toString().toLocaleString("pt-BR")}
              </Text>
            </View>
            <View style={styles.priceWrap}>
              <Text style={styles.priceText}>Venda</Text>
              <Text style={styles.priceValue}>
                {"R$" +
                  parseFloat(dogePrice.bid.toLocaleString("pt-BR")).toFixed(2)}
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
                {"R$" +
                  parseFloat(dogePrice.high24h.toLocaleString("pt-BR")).toFixed(
                    2
                  )}
              </Text>
            </View>
            <View style={styles.priceWrap}>
              <Text style={styles.priceText}>Baixa</Text>
              <Text style={styles.priceValue}>
                {"R$" +
                  parseFloat(dogePrice.low24h.toLocaleString("pt-BR")).toFixed(
                    2
                  )}
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
    height: "55%",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    zIndex: 1,
    elevation: 4,
    width: "92%",
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
    backgroundColor: "#80379A",
    marginTop: 60,
    borderWidth: 0.5,
    elevation: 2,
    borderColor: "#4C66AB",
    borderRadius: 5,
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
  userPicker: {
    height: 35,
    width: "30%",
    borderRadius: 5,
    color: "white",
  },
});

export default Landing;
