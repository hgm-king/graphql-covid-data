import React, { useState } from "react";
import { css } from "@emotion/css";

import DonutChart from "../../components/charts/DonutChart";
import FlexRow from "../../components/FlexRow";

import theme from "../../theme/";
import { percent } from "../../utils/maths-tools";

const pieWrapperStyle = css`
  margin-bottom: 64px;
  margin-right: 48px;
  background-color: #f5f2e3;
  background-radius: 14px;
  padding: 24px;
`;

export default function ByRaceRatioComparison(props) {
  const {
    data,
    keys,
    indexEliminator,
    populationEliminator,
    totalPopulation,
    radius
  } = props;

  const [selectedRace, setSelectedRace] = useState(null);

  /*
  deathCount : [
    {index: white,
    data: 100},
    {index: asian,
    data: 101}
  ]
  */

  // this preps our data with the proper shape
  const initializedDataObj = keys.reduce((acc, key) => {
    acc[key] = { data: [], total: 0, keys: [] };
    return acc;
  }, {});

  // each row is one race
  const pieData = data.reduce((acc, d) => {
    const index = indexEliminator(d);
    // we want an object of arrays where each key corresponds to a pie chart
    keys.forEach((key) => {
      acc[key].data.push({
        index,
        value: d[key],
        population: populationEliminator(d) / totalPopulation,
      });
      acc[key].total += d[key];
      acc[key].keys.push(index);
    });
    return acc;
  }, initializedDataObj);

  const handleClick = (e, pie, key) => {
    if (selectedRace == key) {
      setSelectedRace(null);
    } else {
      setSelectedRace(key);
    }
  };

  const makeRatioDonut = (radius) => (key, i) => (
    <RatioDonut
      key={i}
      title={key}
      radius={radius}
      data={pieData[key]}
      selectedRace={selectedRace}
      handleClick={handleClick}
    />
  );

  return (
    <FlexRow flex="flex-start"  wrap="wrap">
      {keys.map(makeRatioDonut(radius))}
    </FlexRow>
  );
}

function RatioDonut(props) {
  const { title, radius, data, selectedRace, handleClick, totalPopulation } = props;

  const makeSummary = (total) => (d, i) => (
    <Summary key={i} d={d} total={total} />
  );

  return (
    <div className={pieWrapperStyle}>
      <h6>{title}</h6>
      <DonutChart
        data={data.data}
        keys={data.keys}
        valueEliminator={(d) => d.value}
        labelEliminator={(d) => d.index}
        radius={radius}
        outerRadius={radius / 2}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors={theme.palettes.DataVizPalette}
        backgroundColor={"transparent"}
        backgroundRadius={0}
        selected={selectedRace}
        onClick={handleClick}
      />
      <div>
        {data.data.map(makeSummary(data.total))}
      </div>
    </div>
  );
}

function Summary(props) {
  const { d, total } = props;

  const percentValue = percent(d.value / total, 1);
  const percentDelta = percent(d.value / total - d.population, 1);

  const deltaColor =
    percentDelta <= 0 ? theme.colors.success : theme.colors.danger;

  const trendArrow = percentDelta < 0 ? "▼"
    : percentDelta > 0 ? "▲"
    : "";

  return (
    <p>
      {d.index}: {Math.ceil(d.value).toLocaleString()} ({percentValue.toFixed(1)}%){" "}
      <span style={{ color: deltaColor }}>
        {trendArrow}
        {percentDelta.toFixed(1)}
      </span>
    </p>
  );
}
