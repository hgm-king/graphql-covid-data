import React from "react";

import LineChart from "../../components/charts/LineChart";

import theme from "../../theme/";

export default function SummaryLineChart(props) {
  const { data, field, calculation } = props;

  return (
    <LineChart
      data={data}
      keys={[field]}
      height={400}
      width={900}
      min={0}
      xExtractor={(d) => new Date(d.date)}
      yExtractor={(d) => d[calculation]}
      indexExtractor={(d) => d.index}
      margin={{ top: 64, right: 64, bottom: 64, left: 64 }}
      colors={theme.palettes.DataVizPalette}
      legendFormatter={(d) => d}
      backgroundColor={"transparent"}
      backgroundRadius={14}
      disableLegend={true}
      disableCircles={true}
    />
  );
}
