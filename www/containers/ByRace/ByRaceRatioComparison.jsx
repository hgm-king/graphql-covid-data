import React from "react";

import theme from "../../theme/";

import PieChart from "../../components/charts/PieChart";
import FlexRow from "../../components/FlexRow";

export default function ByRaceRatioComparison(props) {
  const { data, keys } = props;

  const makePie = (row, i) => {
    const title = row.RACEGROUP;

    const totals = {};
    const data = keys.reduce((acc, key) => {
      if (!totals[title]) {
        totals[title] = 0;
      }
      totals[title] += row[key];
      acc.push({ data: row[key], index: key, title });
      return acc;
    }, []);

    return (
      <div key={i}>
        <p>{title}</p>
        <PieChart
          data={data}
          keys={keys}
          valueEliminator={(d) => d.data}
          indexEliminator={(d, arc) =>
            ((100 * d.data) / totals[d.title]).toFixed(1)
          }
          width={200}
          height={200}
          outerRadius={100}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors={theme.palettes.DataVizPalette}
          backgroundColor={"transparent"}
          backgroundRadius={14}
        />
      </div>
    );
  };

  return <FlexRow flex="space-between">{data.map(makePie)}</FlexRow>;
}
