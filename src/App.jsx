import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import ChartContainer from "./components/TVChartContainer";
import { changeDataForChart } from "./utils";
const atomIbc =
  "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9";

const getHistoricalData = async () => {
  const data = {
    json: {
      tokens: [atomIbc, "untrn"],
      chainId: "neutron-1",
      dateRange: "D7",
    },
  };
  const encodedData = encodeURIComponent(JSON.stringify(data));
  console.log(encodedData);
  const url = `https://app.astroport.fi/api/trpc/charts.prices?input=${encodedData}`;
  try {
    const resultJson = await fetch(url);
    const {
      result: {
        data: { json },
      },
    } = await resultJson.json();
    return json;
  } catch (err) {
    console.log("thegraphError: ", err);
    return [];
  }
};
const App = () => {
  const [atomData, setAtomData] = useState([]);
  const [untrnData, setUntrnData] = useState([]);
  const [pairData, setPairData] = useState([]);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    getHistoricalData().then((data) => {
      setAtomData(data[atomIbc].series);
      setUntrnData(data.untrn.series);
      setPairData(
        data[atomIbc].series.map((_value, index) => {
          return {
            time: _value.time,
            value: _value.value / data.untrn.series[index].value,
          };
        })
      );
      setIsReady(true);
    });
  }, []);
  return (
    <div className={"App"}>
      <header className={"App-header"}>
        <h1 className={"App-title"}>Trading Chart</h1>
      </header>
      <div className="App-chart-container">
        {isReady && (
          <ChartContainer
            data={changeDataForChart(atomData)}
            color="red"
            label="atom price chart"
          />
        )}
        {isReady && (
          <ChartContainer
            data={changeDataForChart(untrnData)}
            label="neutron price chart"
          />
        )}
        {isReady && (
          <ChartContainer
            data={changeDataForChart(pairData)}
            label="atom/netron chart"
          />
        )}
      </div>
    </div>
  );
};

export default App;
