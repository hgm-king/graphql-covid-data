import React, { useState } from "react";
import { extent } from "d3-array";
import * as allCurves from "@visx/curve";
import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";

import LegendBox from "../LegendBox";

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

  const xScale = TimeScale(extent(data, xExtractor), xRange);
  const yScale = LinearScale(extent(data, yExtractor), yRange);

  const colorsMapped = colors.map((c, i) =>
    !selected || keys[i] === selected ? c : `${c}20`
  );

  const selectIndex = (index) => {
    if (index === selected) {
      setSelected(undefined);
    } else {
      setSelected(index);
    }
  };

  const ordinalColorScale = OrdinalScale(keys, colorsMapped);

  return (
    <div>
      <LegendBox
        scale={ordinalColorScale}
        formatter={legendFormatter}
        width={width}
        onClick={selectIndex}
      />
      <svg width={width} height={height}>
        <rect
          width={width}
          height={height}
          fill={backgroundColor}
          ry={backgroundRadius}
        />
        {keys.map((index, i) => {
          const values = data.filter((d) => indexExtractor(d) === index);
          return (
            <Group key={`lines-${i}`}>
              {values.map((d, j) => (
                <circle
                  key={i + j}
                  r={2}
                  cx={xScale(xExtractor(d))}
                  cy={yScale(yExtractor(d))}
                  fill={theme.colors.black}
                />
              ))}
              <LinePath
                curve={allCurves[curve]}
                data={values}
                x={(d) => xScale(xExtractor(d)) ?? 0}
                y={(d) => yScale(yExtractor(d)) ?? 0}
                stroke={colorsMapped[i % colorCount]}
                strokeWidth={2}
                strokeOpacity={1}
                shapeRendering="geometricPrecision"
                markerMid="url(#marker-circle)"
                onClick={() => selectIndex(index)}
              />
            </Group>
          );
        })}
        <AxisBottom
          top={height - margin.bottom}
          scale={xScale}
          tickFormat={(d) => d.toDateString()}
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
          tickFormat={(d) => d}
          stroke={theme.colors.black}
          tickStroke={theme.colors.black}
          tickLabelProps={() => ({
            fill: theme.colors.black,
            fontSize: 11,
            textAnchor: "middle",
          })}
        />
      </svg>
    </div>
  );
}
