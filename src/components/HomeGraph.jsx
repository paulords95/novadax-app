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
  const [lastHours, setLastHours] = useState([0]);

  function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }

  useEffect(() => {
    apiLocal
      .get("/recentprices")
      .then((res) => {
        const result = [];
        const time = [];
        for (let i of res.data) {
          result.push(parseFloat(i.recent_prices));
          time.push(i.timestamp);
          const date = new Date(i.timestamp);
          var d = new Date();
          var n = d.getTimezoneOffset();

          console.log(msToTime(date.getMilliseconds() - n));
        }
        setLastPrice(result);
        setLastHours(time);
      })
      .catch((e) => {
        throw e;
      });
    setInterval(() => {
      apiLocal
        .get("/recentprices")
        .then((res) => {
          const result = [];
          for (let i of res.data) {
            result.push(parseFloat(i.recent_prices));
          }
          setLastPrice(result);
        })
        .catch((e) => {
          throw e;
        });
    }, 50000);
  }, []);

  const data = {
    labels: lastHours,
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

  const Graph = () => {
    return (
      <LineChart
        data={data}
        width={Dimensions.get("window").width - 50}
        height={250}
        chartConfig={chartConfig}
      />
    );
  };

  if (!fontsLoaded) {
    return <Text>Carregando</Text>;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Graph />
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
