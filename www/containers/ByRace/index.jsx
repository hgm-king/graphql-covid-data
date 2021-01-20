import React from "react";
import { useQuery } from "urql";

import Loader from "../../components/Loader";
import Error from "../../components/Error";
import ByRaceBarChart from "./ByRaceBarChart";
import ByRacePieChart from "./ByRacePieChart";
import ByRaceRatioComparison from "./ByRaceRatioComparison";
import ByRaceTrendLineChart from "./ByRaceTrendLineChart";
import Population from "../../components/Population";


import ByRaceQuery from "../../queries/by-race";
import theme from "../../theme/";

export default function ByRace(props) {
  const [result, reexecuteQuery] = useQuery({
    query: ByRaceQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <Loader />;
  if (error) return <Error error={error} />;

  const field = "DEATHRATEADJ";

  const getIndex = (d) => d.RACEGROUP;
  const getField = (d) => d[field];

  const dataForDay = data.ByRace.filter(d => d.date === "2021-01-17T19:53:43Z");

  const pieKeys = Object.keys(dataForDay[0])
    .filter((key) => key.match(/COUNT/))
    .filter((key) => !key.match(/CASE/));

  const raceIndexes = [...new Set(data.ByRace.map(getIndex).sort())].filter(
    (d) => d
  );

  return (
    <>
      <h3>By Race</h3>
      <Population data={dataForDay} height={500} width={1200} />
      <ByRaceBarChart data={dataForDay} />
      <ByRaceTrendLineChart data={data.ByRace} keys={raceIndexes} />
      <ByRacePieChart data={data.ByRace} keys={pieKeys} />
      <ByRaceRatioComparison data={dataForDay} keys={pieKeys} />
      <p>
        Differences in health outcomes among racial and ethnic groups are due to
        long-term institutional and personal biases against people of color.
        There is no evidence that these health inequities are due to personal
        traits. Lasting racism and an inequitable distribution of resources
        needed for wellness cause these health inequities. These resources
        include quality jobs, housing, health care and food, among others. The
        greater impact of the COVID-19 pandemic on people of color shows how
        these inequities influence health outcomes.
      </p>
    </>
  );
}
