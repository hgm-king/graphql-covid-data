import React, { useState } from "react";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

import LineChart from "../../components/charts/LineChart";
import FlexRow from "../../components/FlexRow";
import Select from "../../components/Select";

import theme from "../../theme/";
import { getTrend } from "./calculations";

export default function ByRaceLineTrendLineChart(props) {
  const { data, keys } = props;

  const fields = Object.keys(data[0]).filter((key) => key.match(/(COUNT|ADJ)/));
  const calculations = ["trend", "value", "rate"];

  const [selectedField, setSelectedField] = useState(fields[0]);
  const [selectedCalculation, setSelectedCalculation] = useState(
    calculations[0]
  );

  const getField = (d) => d[selectedField];
  const getIndex = (d) => d.RACEGROUP;

  const trendData = data
    .map(getTrend(getIndex, getField))
    .filter((d) => d[selectedCalculation] >= 0);

  const setSelectedFieldHandler = (target) => {
    setSelectedField(target.value);
  };
  const setSelectedCalculationHandler = (target) => {
    setSelectedCalculation(target.value);
  };

  const widthBreakpoint = (width) => (width < 600 ? "100%" : "40%");

  return (
    <>
      <h6>{selectedField}</h6>
      <ParentSize>
        {({ width, height }) => (
          <>
            <FlexRow flex="flex-start" wrap="wrap">
              <Select
                label="Field"
                options={fields}
                selected={selectedField}
                onChange={setSelectedFieldHandler}
                width={widthBreakpoint(width)}
              />
              <Select
                label="Calculation"
                options={calculations}
                selected={selectedCalculation}
                onChange={setSelectedCalculationHandler}
                width={widthBreakpoint(width)}
              />
            </FlexRow>
            <LineChart
              data={trendData}
              keys={keys}
              height={400}
              width={width}
              xExtractor={(d) => new Date(d.date)}
              yExtractor={(d) => d[selectedCalculation]}
              indexExtractor={(d) => d.index}
              margin={{ top: 64, right: 64, bottom: 64, left: 64 }}
              colors={theme.palettes.DataVizPalette}
              legendFormatter={(d) => d}
              backgroundColor={theme.charts.background}
              backgroundRadius={theme.charts.radius}
            />
          </>
        )}
      </ParentSize>
    </>
  );
}
