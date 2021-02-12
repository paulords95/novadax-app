import React, { useState, useEffect } from "react";
import { LineChart, YAxis, Grid } from "react-native-svg-charts";
import { View } from "react-native";

import { apiLocal } from "../services/api";

const PriceGraph = () => {
  const contentInset = { top: 5, bottom: 5 };
  const [lastPrice, setLastPrice] = useState([0]);

  useEffect(() => {
    apiLocal
      .get("/recentprices")
      .then((res) => {
        const result = [];
        for (let i of res.data) {
          const number = parseFloat(i.recent_prices).toFixed(3);
          result.push(parseFloat(number));
        }
        setLastPrice(result.reverse());
      })
      .catch((e) => {
        throw e.message;
      });
    setInterval(() => {
      apiLocal
        .get("/recentprices")
        .then((res) => {
          const result = [];
          for (let i of res.data) {
            const number = parseFloat(i.recent_prices).toFixed(3);
            result.push(parseFloat(number));
          }
          setLastPrice(result.reverse());
        })
        .catch((e) => {
          throw e;
        });
    }, 5000);
  }, []);

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
        formatLabel={(value) => `${parseFloat(value).toFixed(4)}`}
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
