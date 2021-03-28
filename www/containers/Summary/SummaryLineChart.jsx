import React from "react";

import LineChart from "../../components/charts/LineChart";

import theme from "../../theme/";

export default function SummaryLineChart(props) {
  const { data, field, width, height, calculation } = props;

  return (
    <LineChart
      data={data}
      keys={[field]}
      height={height}
      width={width}
      min={0}
      xExtractor={(d) => new Date(d.dateOfInterest)}
      yExtractor={(d) => d[field]}
      indexExtractor={(d) => field}
      margin={{ top: 24, right: 64, bottom: 64, left: 64 }}
      colors={[theme.colors.black]}
      legendFormatter={(d) => d}
      backgroundColor={"transparent"}
      backgroundRadius={14}
      disableLegend={true}
      disableCircles={true}
      numTicksX={props.numTicksX}
      numTicksY={props.numTicksY}
    />
  );
}
