import React from "react";
import { css } from "@emotion/css";

import PieChart from "../../components/charts/PieChart";
import FlexRow from "../../components/FlexRow";

import theme from "../../theme/";

const containerStyle = css`
  margin-top: 48px;
  margin-left: 64px;
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

  const makeSummary = (total) => (d, i) => {
    const percent = (100 * (d.value / total)).toFixed(1);
    const percentDelta = (100 * (d.value / total - d.population)).toFixed(1);
    const deltaColor =
      percentDelta < 0 ? theme.colors.success : theme.colors.danger;
    const trendArrow = percentDelta < 0 ? "▼" : "▲";
    return (
      <React.Fragment key={i}>
        <p>
          {d.index}: {d.value} ({percent}%){" "}
          <span style={{ color: deltaColor }}>
            {trendArrow}
            {percentDelta}
          </span>
        </p>
      </React.Fragment>
    );
  };

  const makePie = (key, i) => {
    return (
      <div key={i}>
        <h6>{key}</h6>
        <PieChart
          data={pieData[key].data}
          valueEliminator={(d) => d.value}
          labelEliminator={(d) => d.index}
          width={300}
          height={300}
          outerRadius={150}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors={theme.palettes.DataVizPalette}
          backgroundColor={"transparent"}
          backgroundRadius={14}
        />
        <div>{pieData[key].data.map(makeSummary(pieData[key].total))}</div>
      </div>
    );
  };

  return (
    <div className={containerStyle}>
      <FlexRow flex="space-between">{keys.map(makePie)}</FlexRow>
    </div>
  );
}
