import React from "react";

import PieChart from "../../components/charts/PieChart";

import theme from "../../theme/";

export default function ByRacePieChart(props) {
  const { data } = props;

  const indexEliminator = (d) => d.RACEGROUP;
  const raceIndexes = [...new Set(data.map(indexEliminator).sort())];

  return (
    <PieChart
      data={data.filter((d) => d.date === "2021-01-05T17:57:20Z")}
      valueEliminator={(d) => d.CASERATEADJ}
      labelEliminator={indexEliminator}
      width={1000}
      height={600}
      margin={{ top: 0, right: 64, bottom: 64, left: 128 }}
      colors={theme.palettes.DataVizPalette}
      backgroundColor={"transparent"}
      backgroundRadius={14}
    />
  );
}
