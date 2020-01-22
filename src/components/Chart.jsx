import React, { useState } from "react";
import moment from "moment";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const Chart = ({ sparklineData }) => {
  const [clickedDarkMode, setClickedDarkMode] = useState('');
  let changeStroke = (data) =>  {
    setClickedDarkMode({ clickedDarkMode: data })
  }
  let strokeColor = clickedDarkMode ? '#95d600'  : '#8884d8' ? '#8884d8' : '#95d600';
  const formattedData = sparklineData
    .map((price, idx) => {
      if (idx % 6 === 0) {
        const timeToSubtract = 168 - idx;
        const date = moment()
          .subtract(timeToSubtract, "hours")
          .format("ddd h:mma");
        return { value: price, date };
      } else if (idx === sparklineData.length - 1) {
        const date = moment().format("ddd h:mma");
        return { value: price, date };
      }
      return null;
    })
    .filter(data => data);

  return (
    <LineChart width={1100} height={300} data={formattedData}>
      <Line type="monotone" dataKey="value" stroke={strokeColor} strokeWidth='3.5' onMouseEnter={changeStroke} onMouseLeave={`{stroke={strokeColor}}`} />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" interval={3} />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default Chart;
