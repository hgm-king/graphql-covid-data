import React from 'react'
import Pie from '@visx/shape/lib/shapes/Pie';
import { Group } from '@visx/group';

import { OrdinalScale } from '../utils/scale-tools'

import theme from '../theme/'

export default function PieChart( props )  {
  const { data, keys, eliminator, width, height, margin, colors, index } = props
  console.log({data, keys});

  const getColor = OrdinalScale(keys, theme.palettes.DataVizPalette)
  const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 }
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const donutThickness = 50;

  const getIndex = (d) => d[index]

  return (
    <svg width={width} height={height}>
      <rect rx={14} width={width} height={height} fill="url('#visx-pie-gradient')" />
      <Group top={centerY + margin.top} left={centerX + margin.left}>
        <Pie
          data={data}
          pieValue={eliminator}
          pieSortValues={() => -1}
          outerRadius={200}
          innerRadius={10}
        >
          {pies => {
            console.log(pies);
            return pies.arcs.map(
            (arc,i) => {
              const [centroidX, centroidY] = pies.path.centroid(arc);
              return (<g key={i}>
                <path
                  d={pies.path(arc)}
                  fill={colors[i % colors.length]}
                  />
                <text
                fill="white"
                  x={centroidX}
                  y={centroidY}
                  dy=".33em"
                  fontSize={9}
                  textAnchor="middle">
                  {getIndex(arc.data) || '1234'}
                </text>
              </g>)
            }

          )
        }}
        </Pie>
      </Group>
    </svg>
  );
}
