import React from "react";

import BarChartGroup from "../../components/charts/BarChartGroup";

import theme from "../../theme/";

export default function ByRaceBarChart(props) {
  const { data } = props;
  const keys = Object.keys(data[0]).filter((key) => key.match(/(COUNT)/));

  const valueLabel = (d, group) => {
    return `${d.value.toLocaleString("en")} (${(
      (d.value / data[group.index].CASECOUNT) *
      100
    ).toFixed(2)}%)`;
  };

  return (
    <BarChartGroup
      data={data}
      keys={keys}
      indexExtractor={(d) => d.RACEGROUP}
      width={1000}
      height={600}
      margin={{ top: 0, right: 256, bottom: 0, left: 128 }}
      legendFormatter={(d) => d}
      colors={theme.palettes.DataVizPalette.slice().reverse()}
      backgroundColor={"#f5f2e3"}
      backgroundRadius={14}
      valueLabel={valueLabel}
    />
  );
}
