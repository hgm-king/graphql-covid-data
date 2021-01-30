import React from "react";
import ParentSize from '@visx/responsive/lib/components/ParentSize';

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
    <ParentSize>
      {({ width, height }) => (<BarChartGroup
        data={data}
        keys={keys}
        indexExtractor={(d) => d.RACEGROUP}
        width={600}
        height={600}
        margin={{ top: 0, right: 256, bottom: 64, left: 128 }}
        legendFormatter={(d) => d}
        colors={theme.palettes.DataVizPalette.slice().reverse()}
        backgroundColor={theme.charts.background}
        backgroundRadius={theme.charts.radius}
        valueLabel={valueLabel}
      />)}
    </ParentSize>
  );
}
