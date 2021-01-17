import React from 'react'
import { useQuery } from 'urql'

import ByRaceQuery from '../../queries/by-race'

import Loader from '../../components/Loader'
import Error from '../../components/Error'

import ByRaceBarChart from './ByRaceBarChart'
import ByRacePieChart from './ByRacePieChart'

import theme from '../../theme/'

export default function ByRace( props )  {

  const [result, reexecuteQuery] = useQuery({
    query: ByRaceQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <Loader />;
  if (error) return <Error error={error} />;

  return (
    <>
      <h3>By Race</h3>
      <ByRaceBarChart
        data={data.ByRace} />
      <ByRacePieChart
        data={data.ByRace} />
      <p>Differences in health outcomes among racial and ethnic groups are due to long-term institutional and personal biases against people of color. There is no evidence that these health inequities are due to personal traits. Lasting racism and an inequitable distribution of resources needed for wellness cause these health inequities. These resources include quality jobs, housing, health care and food, among others. The greater impact of the COVID-19 pandemic on people of color shows how these inequities influence health outcomes.</p>
    </>
  )
}
