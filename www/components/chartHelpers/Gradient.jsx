import React from 'react'
import { LinearGradient } from '@visx/gradient'
import { Bar } from '@visx/shape'

export default function Gradient( props ) {
  const {
    id,
    width,
    height,
    from,
    to,
    x,
    y,
  } = props

  const backgroundRadius = props.backgroundRadius ?? 0

  return (
    <svg width={width} height={height}>
      <LinearGradient id={id} from={from} to={to} />
      <Bar
        fill={`url(#${id})`}
        x={x}
        y={y}
        width={width}
        height={height}
        ry={backgroundRadius}
      />
    </svg>
  );
}
