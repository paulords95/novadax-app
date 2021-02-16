import React, { useEffect, useState } from "react";
import { Dimensions, View, Text } from "react-native";

import { PieChart } from "react-native-chart-kit";

import { apiLocal } from "../services/api";

const AssetsPieGraph = () => {
  const [totalNetWorth, setTotalNetWorth] = useState(0);
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
          });
        }
      }
      setLoad(true);
      setData(graphData);
    })();
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
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
              borderWidth: 1,
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
            marginTop: 70,
          }}
        />
      );
    } else {
      return <Text>Carregadno</Text>;
    }
  };

  return (
    <View style={{}}>
      <RenderPieChart populate={data} />
      <Text>{totalNetWorth}</Text>
    </View>
  );
};

export default AssetsPieGraph;
