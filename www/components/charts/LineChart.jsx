import React, { useState } from "react";
import { extent } from "d3-array";
import * as allCurves from "@visx/curve";
import { Group } from "@visx/group";
import { LinePath, AreaClosed } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridRows, GridColumns } from "@visx/grid";

import LegendBox from "../LegendBox";
import Pattern from "../chartHelpers/Pattern";

import theme from "../../theme/";
import {
  LinearScale,
  TimeScale,
  OrdinalScale,
  calculateXRange,
  calculateYRange,
} from "../../utils/scale-tools";

export default function LineChart(props) {
  const {
    data,
    keys,
    height,
    width,
    xExtractor,
    yExtractor,
    indexExtractor,
    margin,
    legendFormatter,
    backgroundRadius,
    backgroundColor,
  } = props;

  const [selected, setSelected] = useState(props.selected);

  const colors = props.colors ?? ["#000"];
  const colorCount = colors.length;

  const curve = props.curve ?? "curveStep";

  const xRange = calculateXRange(width, margin);
  const yRange = calculateYRange(height, margin);

  // calculate or override the y scale bounds
  const yExtent = extent(data, yExtractor);
  const min = props.min ?? yExtent[0];
  const max = props.max ?? yExtent[1];

  const xScale = TimeScale(extent(data, xExtractor), xRange);
  const yScale = LinearScale([min, max], yRange);

  const colorsMapped = colors.map((c, i) =>
    !selected || keys[i] === selected
      ? c
      : `${c}${theme.charts.selectedOpacity}`
  );

  const selectIndex = (index) => {
    if (index === selected) {
      setSelected(undefined);
    } else {
      setSelected(index);
    }
  };

  const ordinalColorScale = OrdinalScale(keys, colorsMapped);

  const formatDate = (d) =>
    d.toDateString().replace(/\d{4}/, "").replace(/Sun /, "");

  return (
    <div>
      {!props.disableLegend && (
        <LegendBox
          scale={ordinalColorScale}
          formatter={legendFormatter}
          width={width}
          onClick={selectIndex}
        />
      )}
      <svg width={width} height={height}>
        <rect
          width={width}
          height={height}
          fill={backgroundColor}
          ry={backgroundRadius}
        />
        <GridColumns
          top={margin.top}
          scale={xScale}
          width={xRange[1]}
          height={yRange[0] - margin.top}
          stroke="#e0e0e0"
        />
        {keys.map((index, i) => {
          const values = data.filter((d) => indexExtractor(d) === index);
          return (
            <Group key={`lines-${i}`}>
              {!props.disableCircles &&
                values.map((d, j) => (
                  <circle
                    key={i + j}
                    r={2}
                    cx={xScale(xExtractor(d))}
                    cy={yScale(yExtractor(d))}
                    fill={theme.colors.black}
                  />
                ))}
              <LinePath
                data={values}
                x={(d) => xScale(xExtractor(d)) ?? 0}
                y={(d) => yScale(yExtractor(d)) ?? 0}
                stroke={colorsMapped[i % colorCount]}
                strokeWidth={2}
                strokeOpacity={1}
                onClick={() => selectIndex(index)}
              />
            </Group>
          );
        })}
        <AxisBottom
          top={height - margin.bottom}
          scale={xScale}
          tickFormat={formatDate}
          stroke={theme.colors.black}
          tickStroke={theme.colors.black}
          tickLabelProps={() => ({
            fill: theme.colors.black,
            fontSize: 11,
            textAnchor: "middle",
          })}
        />
        <AxisLeft
          left={margin.left}
          scale={yScale}
          tickFormat={(d) => d.toLocaleString()}
          stroke={theme.colors.black}
          tickStroke={theme.colors.black}
          tickLabelProps={() => ({
            fill: theme.colors.black,
            fontSize: 11,
            textAnchor: "end",
          })}
          numTicks={5}
        />
      </svg>
    </div>
  );
}
