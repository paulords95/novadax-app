import React, { useState, useEffect } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/nunito";

import { apiLocal } from "../services/api";

const HomeGraph = () => {
  let [fontsLoaded, error] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  const [lastPrice, setLastPrice] = useState([0]);

  useEffect(() => {
    apiLocal
      .get("/recentprices")
      .then((res) => {
        const result = [];
        for (let i of res.data) {
          result.push(i.recent_prices);
        }

        setLastPrice(result);
      })
      .catch((e) => {
        throw e;
      });
  }, []);

  const data = {
    labels: ["16:00", "16:30", "17:00", "17:00", "17:30", "18:00"],
    datasets: [
      {
        data: lastPrice,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#8F4DAF",
    backgroundGradientTo: "#8F4DAF",
    color: (opacity = 1) => `rgba(246, 246, 246, ${opacity})`,
  };

  if (!fontsLoaded) {
    return <Text>Carregando</Text>;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <LineChart
            data={data}
            width={Dimensions.get("window").width - 50}
            height={250}
            chartConfig={chartConfig}
          />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    top: 30,
  },
});

export default HomeGraph;
