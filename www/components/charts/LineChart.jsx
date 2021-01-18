import React from 'react';
import { extent, max, min } from 'd3-array';
import * as allCurves from '@visx/curve';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { Grid } from '@visx/grid';
import { AxisBottom, AxisLeft } from '@visx/axis';

import theme from '../../theme/'
import { LinearScale, TimeScale, OrdinalScale, calculateXRange, calculateYRange } from "../../utils/scale-tools"

import LegendBox from "../LegendBox"

export default function LineChart( props )  {

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
  } = props

  const colors = props.colors ?? ['#000']
  const colorCount = colors.length

  const xRange = calculateXRange(width, margin)
  const yRange = calculateYRange(height, margin)

  const xScale = TimeScale(extent(data, xExtractor), xRange)
  const yScale = LinearScale(extent(data, yExtractor), yRange)

  const ordinalColorScale = OrdinalScale(keys, colors)

  return (
    <div>
      <LegendBox
        scale={ordinalColorScale}
        formatter={legendFormatter}
        width={width} />
      <svg width={width} height={height}>
        <rect width={width} height={height} fill={backgroundColor} rx={backgroundRadius} ry={backgroundRadius} />
        {keys.map((index, i) => {
          const values = data.filter(d => indexExtractor(d) === index)
          return (
            <Group
              key={`lines-${i}`}
              top={margin.top}
              left={margin.left}
              bottom={margin.bottom}
              right={margin.right}
              >
              {values.map((d, j) => (
                <circle
                  key={i + j}
                  r={3}
                  cx={xScale(xExtractor(d)) - margin.left}
                  cy={yScale(yExtractor(d)) - margin.top}
                  stroke="rgba(33,33,33,0.5)"
                  fill="transparent"
                  />
              ))}
              <LinePath
                curve={allCurves['curveCatmullRom']}
                data={values}
                x={d => xScale(xExtractor(d)) - margin.left ?? 0}
                y={d => yScale(yExtractor(d)) - margin.top ?? 0}
                stroke={colors[i % colorCount]}
                strokeWidth={2}
                strokeOpacity={1}
                shapeRendering="geometricPrecision"
                markerMid="url(#marker-circle)"
              />
            </Group>
          );
        })}
        <AxisBottom
          top={height - margin.bottom}
          scale={xScale}
          tickFormat={d=>d.toDateString()}
          stroke={theme.colors.black}
          tickStroke={theme.colors.black}
          tickLabelProps={() => ({
            fill: theme.colors.black,
            fontSize: 11,
            textAnchor: 'middle',
          })}
        />
        <AxisLeft
          left={margin.left}
          scale={yScale}
          tickFormat={d=>d}
          stroke={theme.colors.black}
          tickStroke={theme.colors.black}
          tickLabelProps={() => ({
            fill: theme.colors.black,
            fontSize: 11,
            textAnchor: 'middle',
          })}
        />
      </svg>
    </div>
  )
}
