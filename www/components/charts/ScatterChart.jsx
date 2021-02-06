import React, { useMemo } from "react";
import { Group } from "@visx/group";
import { Circle } from "@visx/shape";
import { scaleLinear } from "@visx/scale";
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

export default function ScatterChart(props) {
  const {
    height,
    width,
    data,
    xEliminator,
    yEliminator,
    margin,
    colorEliminator,
  } = props;

  const maxY = Math.max(...data.map(yEliminator));
  const maxX = Math.max(...data.map(xEliminator));
  const minX = Math.min(...data.map(xEliminator));

  const xRange = calculateXRange(width, margin);
  const yRange = calculateYRange(height, margin);

  const xScale = LinearScale([minX, maxX], xRange);
  const yScale = LinearScale([0, maxY], yRange);
  const ordinalColorScale = OrdinalScale(
    ["Bronx", "Brooklyn", "Manhattan", "Queens", "Staten Island"],
    theme.palettes.DataVizPalette
  );

  return (
    <div>
      <LegendBox scale={ordinalColorScale} formatter={(d) => d} width={width} />
      <svg width={width} height={height}>
        <Group>
          {data.map((point, i) => (
            <Circle
              key={`point-${i}`}
              className="dot"
              cx={xScale(xEliminator(point))}
              cy={yScale(yEliminator(point))}
              fill={ordinalColorScale(colorEliminator(point))}
              r={i % 3 === 0 ? 2 : 3}
            />
          ))}
        </Group>
        <AxisBottom
          top={height - margin.bottom}
          scale={xScale}
          tickFormat={(d) => d}
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
