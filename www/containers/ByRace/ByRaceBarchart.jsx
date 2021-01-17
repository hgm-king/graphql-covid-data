import React from 'react'

import BarChart from '../../components/charts/BarChart'

import theme from '../../theme/'

export default function ByRaceBarChart( props)  {
  const { data } = props

  const keys = Object.keys(data[0]).filter(key => key.match(/(COUNT)/))
  const barData = data.filter(d => d.date === '2021-01-05T17:57:20Z')

  return <BarChart
    data={barData}
    keys={keys}
    indexExtractor={d => d.RACEGROUP}
    width={1000}
    height={600}
    margin={{ top: 0, right: 64, bottom: 64, left: 128 }}
    legendFormatter={d=>d}
    colors={theme.palettes.DataVizPalette}
    backgroundColor={'transparent'}
    backgroundRadius={14} />
}
