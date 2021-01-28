import React from "react";
import { useQuery } from "urql";

import Loader from "../../components/Loader";
import Error from "../../components/Error";
import FlexRow from "../../components/FlexRow";
import ByRaceBarChart from "./ByRaceBarChart";
import ByRacePieChart from "./ByRacePieChart";
import ByRaceRatioComparison from "./ByRaceRatioComparison";
import ByRaceTrendLineChart from "./ByRaceTrendLineChart";
import Population from "../../components/Population";
import PopulationValues from "./PopulationValues";

import ByRaceQuery from "../../queries/by-race";
import { getPopulationFromRate } from "./calculations";

export default function ByRace(_props) {
  const [result, _reexecuteQuery] = useQuery({
    query: ByRaceQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <Loader />;
  if (error) return <Error error={error} />;

  // const field = "DEATHRATEADJ";
  // const getField = (d) => d[field];
  const getIndex = (d) => d.RACEGROUP;
  const selectedDay = "2021-01-22T18:04:29Z";

  const dataForDay = data.ByRace.filter((d) => d.date === selectedDay).map(
    getPopulationFromRate
  );

  const totalPopulation = dataForDay.reduce(
    (acc, d) => acc + d["TOTALPOPCASE"],
    0
  );

  const pieKeys = Object.keys(dataForDay[0]).filter((key) =>
    key.match(/COUNT/)
  );

  const raceIndexes = [...new Set(data.ByRace.map(getIndex).sort())].filter(
    (d) => d
  );

  return (
    <>
      <h3>By Race</h3>
      <p>{new Date(selectedDay).toDateString()}</p>
      <p>What is the racial make-up of New York City?</p>
      <PopulationValues
        data={dataForDay}
        index={"RACEGROUP"}
        field={"TOTALPOPCASE"}
        keys={raceIndexes}
        total={totalPopulation}
      />
      <p>
        How does the case, hospitalization, and death percentages deviate from
        the total population?
      </p>
      <ByRaceRatioComparison
        data={dataForDay}
        keys={pieKeys}
        indexEliminator={getIndex}
        populationEliminator={(d) => d["TOTALPOPCASE"]}
        totalPopulation={totalPopulation}
      />
      {/*<Population data={dataForDay} height={500} width={1200} />*/}
      <FlexRow flex="flex-start">
        <ByRaceBarChart data={dataForDay} />
      </FlexRow>
      <ByRaceTrendLineChart data={data.ByRace} keys={raceIndexes} />
      <ByRacePieChart data={data.ByRace} keys={pieKeys} />
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

// Here is the ticket ID MYM-408-83276 for the reference.
