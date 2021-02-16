import React, { useEffect, useState } from "react";
import { PieChart } from "react-native-svg-charts";
import { Text } from "react-native-svg";

import { apiLocal } from "../services/api";
import { View } from "react-native";

const AssetsGraph = () => {
  const colors = ["#600080", "#E5A4FD", "#D966FF", "#FAFAFA", "#9900CC"];
  const [load, setLoad] = useState(false);

  const walletInfo = [];

  useEffect(() => {
    apiLocal
      .get("/walletbalancepercentage")
      .then((res) => {
        res.data.map((data) => {
          if (data.percentage != undefined) {
            walletInfo.push({
              key: parseFloat(data.balanceInFiat),
              amount: parseFloat(data.percentage),
              svg: { fill: "#600080" },
            });
            setLoad(true);
          }
        });
      })
      .catch((e) => {
        console.log(e.message);
      });

    setInterval(() => {
      apiLocal
        .get("/walletbalancepercentage")
        .then((res) => {
          res.data.map((data) => {
            if (data.percentage != undefined) {
              walletInfo.push({
                key: parseFloat(data.balanceInFiat),
                amount: parseFloat(data.percentage),
                svg: { fill: "#600080" },
              });
              setLoad(true);
            }
          });
        })
        .catch((e) => {
          console.log(e.message);
        });
    }, 10000);
  }, []);

  const Labels = ({ slices, height, width }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <Text
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={"white"}
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={24}
          stroke={"black"}
          strokeWidth={0.2}
        >
          {data.amount + "1"}
        </Text>
      );
    });
  };

  const renderChart = () => {
    if (load) {
      return (
        <PieChart
          style={{ height: 300, marginTop: 50 }}
          valueAccessor={({ item }) => item.amount}
          data={walletInfo}
          spacing={0}
          outerRadius={"95%"}
        >
          <Labels />
        </PieChart>
      );
    } else {
      return <Text>Teste</Text>;
    }
  };

  return (
    <View>
      {useEffect(() => {
        renderChart();
      }, [walletInfo])}
    </View>
  );
};

export default AssetsGraph;
