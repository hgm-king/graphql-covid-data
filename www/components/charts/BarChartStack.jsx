import React from "react";
import { BarStackHorizontal } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";

import LegendBox from "../LegendBox";
import Gradient from "../chartHelpers/Gradient";

import {
  LinearScale,
  OrdinalScale,
  BandScale,
  calculateXRange,
  calculateYRange,
} from "../../utils/scale-tools";

export default function BarChartStack(props) {
  const {
    data,
    keys,
    width,
    height,
    indexExtractor,
    colors,
    margin,
    legendFormatter,
    backgroundRadius,
  } = props;

  // bounds
  const yMax = height;

  const allTotals = data.reduce((allTotals, row) => {
    const total = keys.reduce((total, key) => {
      total += row[key];
      return total;
    }, 0);
    allTotals.push(total);
    return allTotals;
  }, []);

  const xRange = calculateXRange(width, margin);
  const yRange = calculateYRange(height, margin);

  const xScale = LinearScale([0, Math.max(...allTotals)], xRange);
  const yScale = BandScale(data.map(indexExtractor), yRange, 0.4);

  const colorScale = OrdinalScale(keys, colors.slice().reverse());

  return (
    <div>
      <LegendBox scale={colorScale} formatter={legendFormatter} width={width} />
      <svg width={width} height={height}>
        <Gradient
          width={width}
          height={height}
          id={"demo"}
          from={"#8fab88"}
          to={"#a3c093"}
          backgroundRadius={backgroundRadius}
        />
        <Group>
          <BarStackHorizontal
            data={data}
            keys={keys}
            height={yMax}
            y={indexExtractor}
            xScale={xScale}
            yScale={yScale}
            color={colorScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => (
                  <rect
                    key={`barstack-horizontal-${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    fill={`${bar.color}c0`}
                    onClick={() => {}}
                  />
                ))
              )
            }
          </BarStackHorizontal>
          <AxisLeft
            left={margin.left}
            hideAxisLine
            hideTicks
            scale={yScale}
            tickFormat={(d) => d}
            stroke={"#fff"}
            tickStroke={"#fff"}
            tickLabelProps={() => ({
              fill: "#fff",
              fontSize: 11,
              textAnchor: "end",
              dy: "0.33em",
            })}
          />
          <AxisBottom
            top={height - margin.bottom}
            scale={xScale}
            stroke={"#fff"}
            tickStroke={"#fff"}
            tickLabelProps={() => ({
              fill: "#fff",
              fontSize: 11,
              textAnchor: "middle",
            })}
          />
        </Group>
      </svg>
    </div>
  );
}
