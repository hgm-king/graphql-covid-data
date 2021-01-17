import React from 'react'
import { BarStackHorizontal } from '@visx/shape'
import { Group } from '@visx/group'
import { AxisBottom, AxisLeft } from '@visx/axis'

import { LinearScale, TimeScale, OrdinalScale, BandScale, calculateXRange, calculateYRange } from '../utils/scale-tools'

import LegendBox from './LegendBox'

export default function BarChart( props ) {
  const { data, keys, width, height, colors, margin } = props

  // bounds
  const xMax = width;
  const yMax = height;

  const getIndex = d => d.RACEGROUP

  const allTotals = data.reduce((allTotals, row) => {
    const total = keys.reduce((total, key) => {
      total += row[key]
      return total
    }, 0)
    allTotals.push(total)
    return allTotals
  }, [])

  const xRange = calculateXRange(width, margin)
  const yRange = calculateYRange(height, margin)

  const xScale = LinearScale([0, Math.max(...allTotals)], xRange)
  const yScale = BandScale(data.map(getIndex), yRange, 0.4)

  const colorScale = OrdinalScale(keys, colors)

  return (
    <div>
      <LegendBox
        scale={colorScale}
        formatter={d=>d}
        width={width} />
      <svg width={width} height={height}>
        <rect width={width} height={height} fill="url(#teal)" rx={14} />
        <Group>
          <BarStackHorizontal
              data={data}
              keys={keys}
              height={yMax}
              y={getIndex}
              xScale={xScale}
              yScale={yScale}
              color={colorScale}
            >
              { barStacks =>
                barStacks.map(barStack =>
                  barStack.bars.map(bar => (
                    <rect
                      key={`barstack-horizontal-${barStack.index}-${bar.index}`}
                      x={bar.x}
                      y={bar.y}
                      width={bar.width}
                      height={bar.height}
                      fill={bar.color}
                      onClick={() => {}}
                    />
                  )),
                )
              }
            </BarStackHorizontal>
            <AxisLeft
                left={margin.left}
                hideAxisLine
                hideTicks
                scale={yScale}
                tickFormat={d=>d}
                stroke={'#000'}
                tickStroke={'#000'}
                tickLabelProps={() => ({
                  fill: '#000',
                  fontSize: 11,
                  textAnchor: 'end',
                  dy: '0.33em',
                })}
              />
              <AxisBottom
                top={height - margin.bottom}
                scale={xScale}
                stroke={'#000'}
                tickStroke={'#000'}
                tickLabelProps={() => ({
                  fill: '#000',
                  fontSize: 11,
                  textAnchor: 'middle',
                })}
              />
        </Group>
      </svg>
    </div>
  );
}
