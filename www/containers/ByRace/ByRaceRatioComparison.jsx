import React from "react";
import { css } from "@emotion/css";

import PieChart from "../../components/charts/PieChart";
import FlexRow from "../../components/FlexRow";

import theme from "../../theme/";
import { percent } from "../../utils/maths-tools";

const pieWrapperStyle = css`
  margin-bottom: 64px;
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
  } = props;

  /*
  deathCount : [
    {index: white,
    data: 100},
    {index: asian,
    data: 101}
  ]
  */

  const initializedDataObj = keys.reduce((acc, key) => {
    acc[key] = { data: [], total: 0 };
    return acc;
  }, {});

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
    });
    return acc;
  }, initializedDataObj);

  const makeRatioPie = (height, width) => (key, i) => <RatioPie
    key={i}
    title={key}
    height={height}
    width={width}
    data={pieData[key]} />

  return (
      <FlexRow flex="space-between" wrap="wrap">
        {keys.map(makeRatioPie(300, 300))}
      </FlexRow>
  );
}

function RatioPie(props)  {
  const {title, width, height, data} = props;

  const makeSummary = (total) => (d, i) => <Summary
      key={i}
      d={d}
      total={total} />

  return (
    <div className={pieWrapperStyle}>
      <h6>{title}</h6>
      <PieChart
        data={data.data}
        valueEliminator={(d) => d.value}
        labelEliminator={(d) => d.index}
        width={width}
        height={height}
        outerRadius={width / 2}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors={theme.palettes.DataVizPalette}
        backgroundColor={"transparent"}
        backgroundRadius={0}
      />
      <div>{data.data.map(makeSummary(data.total))}</div>
    </div>
  );
};

function Summary(props)  {
  const { d, total } = props;

  const percentValue = percent(d.value / total, 1);
  const percentDelta = percent(d.value / total - d.population, 1);

  const deltaColor = percentDelta < 0
    ? theme.colors.success
    : theme.colors.danger;

  const trendArrow = percentDelta < 0
    ? "▼"
    : "▲";

  return (
    <p>
      {d.index}: {d.value} ({percentValue}%){" "}
      <span style={{ color: deltaColor }}>
        {trendArrow}
        {percentDelta}
      </span>
    </p>
  );
}
