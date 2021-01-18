import React from 'react'
import { useQuery } from 'urql'

import ByRaceQuery from '../../queries/by-race'

import Loader from '../../components/Loader'
import Error from '../../components/Error'
import FlexRow from '../../components/FlexRow'

import ByRaceBarChart from './ByRaceBarChart'
import ByRacePieChart from './ByRacePieChart'
import Population from '../../components/Population'
import PieChart from '../../components/charts/PieChart'
import LineChart from '../../components/charts/LineChart'

import theme from '../../theme/'

export default function ByRace( props )  {

  const [result, reexecuteQuery] = useQuery({
    query: ByRaceQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <Loader />;
  if (error) return <Error error={error} />;

  const dataForDay = data.ByRace.filter(d => d.date === '2021-01-05T17:57:20Z')


  const makePie = (row, i) => {
    const title = row.RACEGROUP
    const keys = Object.keys(row).filter(key => key.match(/COUNT/)).filter(key => !key.match(/CASE/))

    const totals = {}
    const data = keys.reduce((acc, key) => {
        if ( !totals[title] )  { totals[title] = 0 }
        totals[title] += row[key]
        acc.push({data: row[key], index: key, title, })
        return acc
      }, [])

      console.log(data);

    return (
      <div key={i}>
        <p>{title}</p>
        <br />
        <PieChart
          data={data}
          keys={keys}
          valueEliminator={d => d.data}
          indexEliminator={(d, arc) => (100 * d.data / totals[d.title]).toFixed(1)}
          width={200}
          height={200}
          outerRadius={100}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors={theme.palettes.DataVizPalette}
          backgroundColor={'transparent'}
          backgroundRadius={14} />
      </div>
    )

  }

  const raceIndexes = [...new Set(data.ByRace.map(d => d.RACEGROUP).sort())].filter(d => d)

  const getTrend = (data) => data.map((row, i) => {
    const value = (data[i-1]? row.CASECOUNT - data[i-1].CASECOUNT : 0)
    const rate = (value / (data[i-1]? data[i-1].CASECOUNT : 1)) * 100
    return {
      RACEGROUP: row.RACEGROUP,
      value,
      rate,
      date: row.date,
    }}).filter(d => d.RACEGROUP && 5000 > Math.abs(d.value) && d.value >= 0)

  const trendData = getTrend(data.ByRace);
  console.log(trendData);

  return (
    <>
      <h3>By Race</h3>
      <Population
        data={dataForDay}
        height={500}
        width={1200} />
      <ByRaceBarChart
        data={data.ByRace} />
      <LineChart
        data={trendData}
        keys={raceIndexes}
        height={600}
        width={1200}
        xExtractor={d => new Date(d.date)}
        yExtractor={d => d.rate}
        indexExtractor={d => d.RACEGROUP}
        margin={{ top: 64, right: 64, bottom: 64, left: 64 }}
        colors={theme.palettes.DataVizPalette}
        legendFormatter={d => d}
        backgroundColor={'transparent'}
        backgroundRadius={14} />
      <ByRacePieChart
        data={data.ByRace} />
      <FlexRow flex='space-between'>
        {dataForDay.map(makePie)}
      </FlexRow>
      <p>Differences in health outcomes among racial and ethnic groups are due to long-term institutional and personal biases against people of color. There is no evidence that these health inequities are due to personal traits. Lasting racism and an inequitable distribution of resources needed for wellness cause these health inequities. These resources include quality jobs, housing, health care and food, among others. The greater impact of the COVID-19 pandemic on people of color shows how these inequities influence health outcomes.</p>
    </>
  )
}
