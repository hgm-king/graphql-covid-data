import React, { useState } from "react";

import theme from "../../theme/";

import LineChart from "../../components/charts/LineChart";

export default function AntibodyLineChart(props) {
  const { data } = props;

  const [field, setField] = useState("index");

  const uniqueAges = [...new Set(data.map((d) => d.demoVariable).sort())];
  const fieldOptions = Object.keys(data[0]);

  const toOption = (option) => {
    return <option key={option}>{option}</option>;
  };

  const handleFieldChange = ({ target }) => {
    const newValue = target.value;
    setField(newValue);
  };

  return (
    <div>
      <select selected={field} onChange={handleFieldChange}>
        {fieldOptions.map(toOption)}
      </select>
      <LineChart
        data={data}
        keys={uniqueAges}
        height={600}
        width={1000}
        xExtractor={(d) => new Date(d.date)}
        yExtractor={(d) => d[field]}
        indexExtractor={(d) => d.demoVariable}
        margin={{ top: 64, right: 64, bottom: 64, left: 64 }}
        colors={theme.palettes.DataVizPalette}
        legendFormatter={(d) => d}
        backgroundColor={"transparent"}
        backgroundRadius={14}
      />
    </div>
  );
}
