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

const HomeGraph = () => {
  let [fontsLoaded, error] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50, 50, 60, 80, 10],
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
    top: 70,
  },
});

export default HomeGraph;
