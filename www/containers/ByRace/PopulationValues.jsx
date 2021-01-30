import React from "react";
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import PieChart from "../../components/charts/PieChart";
import FlexRow from "../../components/FlexRow";

import theme from "../../theme";

export default function PopulationValues(props) {
  const { data, field, index, keys, total } = props;

  // adding another slice here
  const dataWithTotal = data.concat({
    [index]: "Total",
    [field]: total,
  });

  const makePopulationSection = (d, i) => (
    <div key={i} style={{ marginLeft: 16 }}>
      <h6>{d[index]}</h6>
      <p>
        ~{Math.floor(d[field]).toLocaleString("en")} people (
        {((100 * d[field]) / total).toFixed(1)}%)
      </p>
    </div>
  );

  const minWidth = 400;
  const maxWidth = 700;

  const boundWidth = (width) => width > maxWidth
    ? maxWidth
    : width < minWidth
    ? minWidth
    : width

  return (
    <>
      <FlexRow flex="flex-start" wrap="wrap">
        <div style={{width: '50%', minWidth}}>
          <ParentSize>
            {({ width, height }) => (
              <PieChart
                data={data}
                keys={keys}
                valueEliminator={(d) => d[field]}
                labelEliminator={(d) => d[index]}
                width={boundWidth(width)}
                height={boundWidth(width)}
                outerRadius={boundWidth(width) / 2}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                colors={theme.palettes.DataVizPalette}
                backgroundColor={theme.charts.background}
                backgroundRadius={theme.charts.radius}
              />
            )}
          </ParentSize>
        </div>
        <div style={{width: '50%'}}>
          <ParentSize>
            {({ width, height }) => {
              console.log(width);
              return (
              <FlexRow direction={width > 400 ? "column" : "row"} flex="space-between">
                {dataWithTotal.map(makePopulationSection)}
              </FlexRow>
            )}}
          </ParentSize>
        </div>
      </FlexRow>
    </>
  );
}
