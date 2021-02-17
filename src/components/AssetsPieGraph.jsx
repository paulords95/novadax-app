import React, { useEffect, useState } from "react";
import { Dimensions, View, Text, StyleSheet, Button } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import { PieChart } from "react-native-chart-kit";

import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/nunito";

import { apiLocal } from "../services/api";

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

  const graphColor = (name) => {
    let color = "";
    if (name == "BTC") {
      color = "#A658CC";
    }
    if (name == "DOGE") {
      color = "#6B029D";
    }
    if (name == "ETH") {
      color = "#BC7FDA";
    }
    return color;
  };

  useEffect(() => {
    (async () => {
      const dataApi = await apiLocal.get("/walletbalancepercentage");
      const graphData = [];
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
      setLoad(true);
      setData(graphData);
      setAssetsInfo(dataApi.data);
      setInterval(async () => {
        const dataApi = await apiLocal.get("/walletbalancepercentage");
        const graphData = [];
        for (let i of dataApi.data) {
          setTotalNetWorth(i.totalAssets);
          if (i.balance != undefined) {
            graphData.push({
              name: i.currency,
              balance: parseFloat(i.percentage),
              color: graphColor(i.currency),
              legendFontColor: "white",
              legendFontSize: 15,
            });
          }
        }
        setLoad(true);

        setData(graphData);
      }, 5000);
    })();
  }, []);

  useEffect(() => {
    setInterval(async () => {
      const dataApi = await apiLocal.get("/walletbalancepercentage");
      setAssetsInfo(dataApi.data);
    }, 5000);
  }, []);

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
            fontFamily: "Nunito_600SemiBold",
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
          }}
        >
          {assetsInfo.map((item) => {
            if (item.balance != undefined) {
              return (
                <View
                  key={Math.random() * 100}
                  style={{
                    top: -5,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{ color: "white", fontFamily: "Nunito_600SemiBold" }}
                  >
                    {item.currency}:{" "}
                    <Text
                      style={{
                        color: "#C6BDBD",
                        fontFamily: "Nunito_600SemiBold",
                      }}
                    >
                      R${item.balanceInFiat}
                    </Text>
                  </Text>
                </View>
              );
            }
          })}
        </View>
      </View>
    );
  };
  if (!fontsLoaded) {
    return <Text>Carregando</Text>;
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
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold",
  },
});

export default AssetsPieGraph;
