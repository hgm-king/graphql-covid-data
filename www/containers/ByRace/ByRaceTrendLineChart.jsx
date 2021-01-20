import React, { useState } from "react";

import LineChart from "../../components/charts/LineChart";

import theme from "../../theme/";
import { getTrend } from "./calculations";

export default function ByRaceLineTrendLineChart(props) {
  const { data, keys } = props;

  const fields = Object.keys(data[0]).filter((key) => key.match(/(COUNT|ADJ)/));
  const calculations = ["trend", "value", "rate"];

  const [selectedField, setSelectedField] = useState(fields[0]);
  const [selectedCalculation, setSelectedCalculation] = useState(
    calculations[0]
  );

  const getField = (d) => d[selectedField];
  const getIndex = (d) => d.RACEGROUP;

  const trendData = data
    .map(getTrend(getIndex, getField))
    .filter((d) => d[selectedCalculation] >= 0);

  console.log({ data, trendData });
  const toOption = (v) => <option key={v}>{v}</option>;

  const setSelectedFieldHandler = ({ target }) => {
    setSelectedField(target.value);
  };
  const setSelectedCalculationHandler = ({ target }) => {
    setSelectedCalculation(target.value);
  };

  return (
    <div>
      <h6>{selectedField}</h6>
      <select selected={selectedField} onChange={setSelectedFieldHandler}>
        {fields.map(toOption)}
      </select>
      <select
        selected={selectedCalculation}
        onChange={setSelectedCalculationHandler}
      >
        {calculations.map(toOption)}
      </select>
      <LineChart
        data={trendData}
        keys={keys}
        height={400}
        width={1200}
        xExtractor={(d) => new Date(d.date)}
        yExtractor={(d) => d[selectedCalculation]}
        indexExtractor={(d) => d.index}
        margin={{ top: 64, right: 64, bottom: 64, left: 64 }}
        colors={theme.palettes.DataVizPalette}
        legendFormatter={(d) => d}
        backgroundColor={"#f5f2e3"}
        backgroundRadius={14}
      />
    </div>
  );
}
