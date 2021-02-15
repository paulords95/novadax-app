import React, { useEffect, useState } from "react";
import { PieChart } from "react-native-svg-charts";
import { Text } from "react-native-svg";
import { apisAreAvailable } from "expo";

import { apiLocal } from "../services/api";

const AssetsGraph = () => {
  const colors = ["#600080", "#E5A4FD", "#D966FF", "#FAFAFA", "#9900CC"];

  const [walletInfo, setWalletInfo] = useState([
    {
      key: 0,
      amount: 2,
      svg: { fill: colors[parseInt(Math.random() * colors.length)] },
    },
    {
      key: 2,
      amount: 10,
      svg: { fill: colors[parseInt(Math.random() * colors.length)] },
    },
    {
      key: 4,
      amount: 20,
      svg: { fill: colors[parseInt(Math.random() * colors.length)] },
    },
  ]);

  console.log();

  useEffect(() => {
    apiLocal
      .get("/walletbalancepercentage")
      .then((res) => {
        //console.log(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });

    setInterval(() => {
      apiLocal
        .get("/walletbalancepercentage")
        .then((res) => {})
        .catch((e) => {
          console.log(e.message);
        });
    }, 5000);
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

  const RenderChart = () => {
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
  };

  return <RenderChart />;
};

export default AssetsGraph;
