import React, { useState, useEffect } from "react";
import { LineChart, YAxis, Grid } from "react-native-svg-charts";
import { View } from "react-native";

import { apiLocal } from "../services/api";

const PriceGraph = (props) => {
  const contentInset = { top: 5, bottom: 5 };
  const [lastPrice, setLastPrice] = useState([0]);
  const [updateGraph, setUpdateGraph] = useState(0);

  useEffect(() => {
    apiLocal
      .get(`/recentprices/${props.currency}`)
      .then((res) => {
        const result = [];
        for (let i of res.data) {
          if (i.recent_prices < 1000) {
            result.push(parseFloat(i.recent_prices));
          } else {
            const number = Math.round(i.recent_prices);
            result.push(number);
          }
        }
        setLastPrice(result.reverse());
      })
      .catch((e) => {
        throw e.message;
      });
  }, [props.currency]);

  const data = lastPrice;

  return (
    <View
      style={{
        height: 200,
        flexDirection: "row",
        width: "85%",
        alignSelf: "center",
        top: 50,
      }}
    >
      <YAxis
        data={data}
        contentInset={contentInset}
        svg={{
          fill: "white",
          fontSize: 10,
        }}
        numberOfTicks={10}
        formatLabel={(value) => `${value}`}
      />
      <LineChart
        style={{ flex: 1, marginLeft: 16 }}
        data={data}
        svg={{ stroke: "grey" }}
        contentInset={contentInset}
      >
        <Grid />
      </LineChart>
    </View>
  );
};

export default PriceGraph;
