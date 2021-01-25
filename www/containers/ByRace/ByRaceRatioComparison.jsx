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
      <React.Fragment key={i}>
        <p>{title}</p>
        <PieChart
          data={data}
          keys={keys}
          valueEliminator={(d) => d.data}
          labelEliminator={(d) => ((100 * d.data) / totals[d.title]).toFixed(1)}
          width={100}
          height={100}
          outerRadius={50}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors={theme.palettes.DataVizPalette}
          backgroundColor={"transparent"}
          backgroundRadius={14}
        />
      </React.Fragment>
    );
  };

  return (
    <div className={containerStyle}>
      <FlexRow flex="space-between" direction="column">
        {data.slice().reverse().map(makePie)}
      </FlexRow>
    </div>
  );
}
