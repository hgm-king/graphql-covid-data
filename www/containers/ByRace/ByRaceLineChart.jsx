import React, { useState } from "react";

import LineChart from "../../components/charts/LineChart";
import FlexRow from "../../components/FlexRow";
import Select from "../../components/Select";

import theme from "../../theme/";

export default function ByRaceLineTrendLineChart(props) {
  const { data, keys, width, index, value } = props;

  const trendData = data
    .map((row, i, d) => {
      const yesterdayIndex = i ? i - 1 : 0;
      const yesterday = data[yesterdayIndex];

      return {
        index: row[index],
        value: row[value] - yesterday[value],
        date: row.date,
      };
    })
    .filter((d) => d.value > 0);

  return (
    <>
      <h6>{index}</h6>
      <LineChart
        data={trendData}
        keys={keys}
        height={400}
        width={width}
        xExtractor={(d) => new Date(d.date)}
        yExtractor={(d) => d.value}
        indexExtractor={(d) => d.index}
        margin={{ top: 64, right: 64, bottom: 64, left: 64 }}
        colors={theme.palettes.DataVizPalette}
        legendFormatter={(d) => d}
        backgroundColor={theme.charts.background}
        backgroundRadius={theme.charts.radius}
        disableCircles={true}
      />
    </>
  );
}
