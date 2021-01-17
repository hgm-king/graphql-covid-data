import React from 'react'
import { useQuery } from 'urql'

import ByRaceQuery from '../../queries/by-race'

import Loader from '../../components/Loader'
import Error from '../../components/Error'
// import ByRaceLineChart from './ByRaceLineChart'
import BarChart from '../../components/BarChart'
import PieChart from '../../components/PieChart'

import theme from '../../theme/'

export default function ByRace( props )  {

  const [result, reexecuteQuery] = useQuery({
    query: ByRaceQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <Loader />;
  if (error) return <Error error={error} />;

  const keys = Object.keys(data.ByRace[0]).filter(key => key.match(/ADJ/))
  const raceIndexes = [...new Set(data.ByRace.map(d => d.RACEGROUP).sort())]

  return (
    <>
      <h3>By Race</h3>
      <BarChart
        data={data.ByRace.filter(d => d.date === '2021-01-05T17:57:20Z')}
        keys={keys}
        width={1000}
        height={600}
        margin={{ top: 0, right: 64, bottom: 64, left: 128 }}
        colors={theme.palettes.DataVizPalette} />
      <PieChart
        data={data.ByRace.filter(d => d.date === '2021-01-05T17:57:20Z')}
        keys={raceIndexes}
        eliminator={d=>d.CASERATEADJ}
        index={'RACEGROUP'}
        width={1000}
        height={600}
        margin={{ top: 0, right: 64, bottom: 64, left: 128 }}
        colors={theme.palettes.DataVizPalette}
      />
      <p>Differences in health outcomes among racial and ethnic groups are due to long-term institutional and personal biases against people of color. There is no evidence that these health inequities are due to personal traits. Lasting racism and an inequitable distribution of resources needed for wellness cause these health inequities. These resources include quality jobs, housing, health care and food, among others. The greater impact of the COVID-19 pandemic on people of color shows how these inequities influence health outcomes.</p>
    </>
  )
}
