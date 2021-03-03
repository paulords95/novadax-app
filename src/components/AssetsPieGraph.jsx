import React, { useEffect, useState } from "react";
import { Dimensions, View, Text, StyleSheet, Button } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { PieChart } from "react-native-chart-kit";

import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/nunito";

import { apiLocal } from "../services/api";
import AppLoading from "expo-app-loading";

const AssetsPieGraph = () => {
  let [fontsLoaded, error] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });
  const [totalNetWorth, setTotalNetWorth] = useState(0);
  const [assetsInfo, setAssetsInfo] = useState([]);
  const [data, setData] = useState([
    {
      name: "Carregando",
      balance: 0,
      color: "#C6BDBD",
      legendFontColor: "#C6BDBD",
      legendFontSize: 15,
    },
  ]);
  const [load, setLoad] = useState(false);
  let [, setState] = useState();
  const [keysStored, setKeys] = useState([]);

  const graphColor = (name) => {
    let color = "";
    if (name == "BTC") {
      color = "#F7931A";
    }
    if (name == "DOGE") {
      color = "#BA9F33";
    }
    if (name == "ETH") {
      color = "#8D8D8D";
    }
    return color;
  };

  const getKeys = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("keys");
      const result = JSON.parse(jsonValue);

      if (result != null) {
        return result;
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      const keys = await getKeys();
      const dataApi = await apiLocal.get(
        `/walletbalancepercentage/${keys.accessKey}/${keys.secretKey}`
      );
      const graphData = [];
      if (dataApi.data) {
        for (let i of dataApi.data) {
          setTotalNetWorth(i.totalAssets);
          if (i.balance != undefined) {
            graphData.push({
              name: i.currency,
              balance: parseFloat(i.percentage),
              color: graphColor(i.currency),
              legendFontColor: "white",
              legendFontSize: 15,
              balanceInFiat: i.balanceInFiat,
            });
          }
        }
      }
      setLoad(true);
      setData(graphData);
      setAssetsInfo(dataApi.data);
      setInterval(async () => {
        const dataApi = await apiLocal.get(
          `/walletbalancepercentage/${keys.accessKey}/${keys.secretKey}`
        );
        const graphData = [];
        if (dataApi.data) {
          for (let i of dataApi.data) {
            setTotalNetWorth(i.totalAssets);
            if (i.balance != undefined) {
              graphData.push({
                name: i.currency,
                balance: parseFloat(i.percentage),
                color: graphColor(i.currency),
                legendFontColor: "white",
                legendFontSize: 15,
                balanceInFiat: i.balanceInFiat,
              });
            }
          }
        }
        setLoad(true);
        setData(graphData);
      }, 5000);
    })();
  }, []);

  //useEffect(() => {
  //  setInterval(async () => {
  //    const dataApi = await apiLocal.get("/walletbalancepercentage");
  //    setAssetsInfo(dataApi.data);
  //    const keys = await getKeys();
  //    setKeys(keys);
  //  }, 5000);
  //  setInterval(() => {
  //    //console.log(keysStored);
  //  }, 5000);
  //  (async () => {
  //    const keys = await getKeys();
  //    setKeys(keys);
  //  })();
  //}, []);

  const RenderPieChart = (props) => {
    if (load) {
      return (
        <PieChart
          data={props.populate}
          width={Dimensions.get("window").width - 30}
          height={230}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 4, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          accessor={"balance"}
          backgroundColor={"transparent"}
          paddingLeft={"20"}
          center={[10, 0]}
          style={{
            marginTop: 30,
          }}
        />
      );
    } else {
      return (
        <View>
          <Spinner
            style={{ top: -100 }}
            visible={true}
            textContent={"Carregando"}
            textStyle={{
              color: "#FFF",
            }}
          />
        </View>
      );
    }
  };

  const RenderWalletInfo = () => {
    return (
      <View style={styles.walletInfo}>
        <Text
          style={{
            color: "white",
            alignSelf: "center",
            fontSize: 18,
            fontFamily: "Nunito_700Bold",
          }}
        >
          Patrimônio Total
        </Text>
        <Text
          style={{
            color: "#C6BDBD",
            alignSelf: "center",
            fontSize: 18,
            fontFamily: "Nunito_600SemiBold",
          }}
        >
          R${totalNetWorth}
        </Text>
        <Text style={styles.subTitle}>Valor por ativos</Text>
        <View
          style={{
            flexWrap: "wrap",
            flex: 1,
            alignContent: "center",
            alignSelf: "center",
            flexDirection: "row",
            marginTop: 10,
            width: "80%",
          }}
        >
          {assetsInfo ? (
            assetsInfo.map((item) => {
              if (item.balance != undefined) {
                return (
                  <View
                    key={Math.random() * 100}
                    style={{
                      top: -5,
                      flex: 1,
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      flexDirection: "row",
                      alignContent: "center",
                      left: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "Nunito_600SemiBold",
                      }}
                    >
                      {item.currency}:{" "}
                      <Text
                        style={{
                          color: "#C6BDBD",
                          fontFamily: "Nunito_600SemiBold",
                          alignSelf: "center",
                        }}
                      >
                        R${item.balanceInFiat}
                      </Text>
                    </Text>
                  </View>
                );
              }
            })
          ) : (
            <AppLoading />
          )}
        </View>
      </View>
    );
  };
  if (!fontsLoaded) {
    return (
      <Text
        style={{
          color: "white",
          fontFamily: "Nunito_700Bold",
          alignSelf: "center",
          top: "40%",
        }}
      >
        Carregando
      </Text>
    );
  } else if (!keysStored) {
    console.log(keysStored);
    return (
      <Text
        style={{
          color: "white",
          fontFamily: "Nunito_700Bold",
          alignSelf: "center",
          top: "40%",
        }}
      >
        Chave de API não definida
      </Text>
    );
  } else if (!assetsInfo) {
    return (
      <Text
        style={{
          color: "white",
          fontFamily: "Nunito_700Bold",
          alignSelf: "center",
          top: "40%",
        }}
      >
        Chave de API incorreta
      </Text>
    );
  } else {
    return (
      <View style={{}}>
        <RenderPieChart populate={data} />
        {load ? <RenderWalletInfo /> : <View />}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  walletInfo: {
    height: 200,
    marginTop: 50,
  },
  subTitle: {
    color: "white",
    alignSelf: "center",
    marginTop: 40,
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
  },
});

export default AssetsPieGraph;
