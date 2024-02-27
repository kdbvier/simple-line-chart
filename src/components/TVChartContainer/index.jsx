import "./index.css";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { getMinMaxAvg } from "../../utils";
class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, stroke, value, max, min } = this.props;

    if (value == max) {
      return (
        <text
          x={x}
          y={y}
          dy={-4}
          fill={stroke}
          fontSize={10}
          textAnchor="middle"
        >
          {value}(max)
        </text>
      );
    }
    if (value == min) {
      return (
        <text
          x={x}
          y={y}
          dy={-4}
          fill={stroke}
          fontSize={10}
          textAnchor="middle"
        >
          {value}(min)
        </text>
      );
    }
  }
}

const ChartContainer = ({ data, color = "#8884d8", label }) => {
  const { max, min, avg } = getMinMaxAvg(data.map((_data) => _data.value));
  console.log("max, min, avg: ", max, min, avg);
  return (
    <div style={{ width: "100%", height: "300px" }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            label={<CustomizedLabel max={max} min={min} />}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <ReferenceLine
            y={avg}
            label={`Average: ${avg.toFixed(2)}`}
            stroke="black"
            strokeDasharray="5 5"
          />
          <XAxis dataKey="time" />
          <Tooltip />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
      <div>{label}</div>
    </div>
  );
};

export default ChartContainer;
