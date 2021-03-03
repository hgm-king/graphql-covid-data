import React, { useState } from "react";
import { useQuery } from "urql";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

import Loader from "../../components/Loader";
import Error from "../../components/Error";
import FlexRow from "../../components/FlexRow";
import Switch from "../../components/Switch";

import ByRaceBarChart from "./ByRaceBarChart";
import ByRaceRatioComparison from "./ByRaceRatioComparison";

import ByRaceQuery from "../../queries/by-race";
import { getPopulationFromRate } from "./calculations";

import { byRaceBarChartStyle, byRaceRatioComparisonStyle } from "./styles";

export default function ByRace(_props) {
  const [selectedKey, setSelectedKey] = useState("CASECOUNT");

  const [result, _reexecuteQuery] = useQuery({
    query: ByRaceQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <Loader />;
  if (error) return <Error error={error} />;

  const selectedDay = data.ByRace[data.ByRace.length - 1].date;
  const dateString = new Date(selectedDay).toDateString();

  const indexKey = "RACEGROUP";
  const totalKey = "TOTALPOPCASE";

  const getIndex = (d) => d[indexKey];
  const getTotal = (d) => d[totalKey];

  const dataForDay = data.ByRace.filter((d) => d.date === selectedDay).map(
    getPopulationFromRate
  );

  if (!dataForDay) {
    return <p>No Data for {selectedDay}</p>;
  }

  const totalPopulation = dataForDay.reduce((acc, d) => acc + getTotal(d), 0);

  const pieKeys = Object.keys(dataForDay[0]).filter((key) =>
    key.match(/COUNT/)
  );

  const makeSwitches = (key, i) => (
    <FlexRow key={i} flex="flex-start" align="center">
      <Switch state={key == selectedKey} onClick={() => setSelectedKey(key)} />
      {key}
    </FlexRow>
  );

  const raceIndexes = [...new Set(data.ByRace.map(getIndex).sort())].filter(
    (d) => d
  );

  return (
    <>
      <h3>By Race</h3>
      <h6>Showing data for {dateString}</h6>
      <ParentSize>
        {({ width, height }) => {
          const barChartWidth = width < 700 ? width : width * 0.8;
          const donutRadius = width < 700 ? width - 50 : 400;
          return (
            <>
              <p>
                How does the case, hospitalization, and death percentages
                deviate from the total population?
              </p>
              <div style={{ marginLeft: 24, marginBottom: 24, width: "50%" }}>
                <FlexRow flex="space-between" wrap="wrap">
                  {pieKeys.map(makeSwitches)}
                </FlexRow>
              </div>
              <div className={byRaceRatioComparisonStyle}>
                <ByRaceRatioComparison
                  data={dataForDay}
                  keys={[selectedKey, totalKey]}
                  indexEliminator={getIndex}
                  populationEliminator={getTotal}
                  totalPopulation={totalPopulation}
                  radius={donutRadius}
                />
              </div>
              <p>What percent of cases result in death or hospitalization?</p>
              <div className={byRaceBarChartStyle}>
                <ByRaceBarChart data={dataForDay} width={barChartWidth} />
              </div>
              <h6>Statement from NYC Dept. of Health</h6>
              <p>
                Differences in health outcomes among racial and ethnic groups
                are due to long-term institutional and personal biases against
                people of color. There is no evidence that these health
                inequities are due to personal traits. Lasting racism and an
                inequitable distribution of resources needed for wellness cause
                these health inequities. These resources include quality jobs,
                housing, health care and food, among others. The greater impact
                of the COVID-19 pandemic on people of color shows how these
                inequities influence health outcomes.
              </p>
            </>
          );
        }}
      </ParentSize>
    </>
  );
}
