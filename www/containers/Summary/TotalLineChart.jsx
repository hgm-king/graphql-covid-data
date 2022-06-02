import React from "react";

import LineChart from "../../components/charts/LineChart";

import theme from "../../theme/";

export default function TotalLineChart(props) {
  const { data, fields, width, index, value } = props;

  const trendData = data
    .reduce((acc, row) => {
      fields.reduce((acc, field) => {
        acc.push({
          index: field,
          value: row[field],
          date: row.dateOfInterest,
        })
        return acc;
      }, acc)
      return acc
    }, []);

  return (
    <>
      <LineChart
        data={trendData}
        keys={fields}
        height={400}
        width={width}
        xExtractor={(d) => new Date(d.date)}
        yExtractor={(d) => d.value}
        indexExtractor={(d) => d.index}
        margin={{ top: 24, right: 64, bottom: 64, left: 64 }}
        colors={theme.palettes.DataVizPalette}
        legendFormatter={(d) => d}
        backgroundColor={theme.charts.background}
        backgroundRadius={theme.charts.radius}
        disableCircles={true}
      />
    </>
  );
}
