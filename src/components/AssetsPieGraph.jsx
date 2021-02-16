import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";

import { PieChart } from "react-native-chart-kit";

import { apiLocal } from "../services/api";

const AssetsPieGraph = () => {
  const data = [
    {
      name: "Seoul",
      population: 215,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },

    {
      name: "New York",
      population: 85,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Moscow",
      population: 119,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View style={{}}>
      <PieChart
        data={data}
        width={Dimensions.get("window").width}
        height={270}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
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
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"0"}
        center={[20, 20]}
        absolute
      />
    </View>
  );
};

export default AssetsPieGraph;
