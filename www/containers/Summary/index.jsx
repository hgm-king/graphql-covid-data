import React, { useState, useEffect } from "react";
import { useQuery } from "urql";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

import Loader from "../../components/Loader";
import Error from "../../components/Error";
import Switch from "../../components/Switch";
import FlexRow from "../../components/FlexRow";

import SummaryLineChart from "./SummaryLineChart";
import DataTable from "../../components/charts/DataTable";

import SummaryQuery from "../../queries/summary";
import { summedObject } from "../../utils/data-tools";

export default function Summary(_props) {
  const [selectedField, setSelectedField] = useState("CASECOUNT");

  const [result, _reexecuteQuery] = useQuery({
    query: SummaryQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <Loader />;
  if (error) return <Error error={error} />;

  const getIndex = (d) => selectedField;
  const getValue = (d) => d[selectedField];

  const selectedDay = data.DataByDay[data.DataByDay.length - 1].dateOfInterest;
  const dateString = new Date(selectedDay).toDateString();

  const title = `${selectedField}`;
  const subtitle = `as of ${dateString}`;

  const fields = Object.keys(data.DataByDay[0])
    .filter((k) => k.match(/COUNT/))
    .sort();

  const handleFieldOnChange = (option) => {
    setSelectedField(option.value);
  };

  const summedTotals = summedObject(data.DataByDay, [
    "CASECOUNT",
    "DEATHCOUNT",
    "HOSPITALIZEDCOUNT",
  ]);

  const makeSwitches = (key, i) => (
    <FlexRow key={i} flex="flex-start" align="center" wrap="wrap">
      <Switch
        state={key == selectedField}
        onClick={() => setSelectedField(key)}
      />
      <span>{key}&nbsp;</span>
      <span>- Total: {summedTotals[key].toLocaleString()}</span>
    </FlexRow>
  );

  return (
    <>
      <h3>Summary</h3>
      <h6 style={{borderBottom: '1px solid black', marginBottom: 24, paddingBottom: 8}}>
        Showing data for {dateString} - {data.DataByDay.length} days since outbreak
      </h6>
      <ParentSize>
        {({ width, height }) => {
          const isLarge = width > 1100;
          const isSmall = width < 690;

          const dropdownWidth = isLarge ? "25%" : "100%";
          const chartWidth = isLarge ? 800 : width < 20 ? 20 : width;

          // lower granularity
          const numTicksY = isSmall ? 4 : undefined;
          const trendData = data.DataByDay.filter((row, i) => isSmall ? i % 7 == 3 : true);

          return (
            <>
              <div style={{ marginLeft: 24, marginBottom: 24, width: "100%" }}>
                <FlexRow flex="space-between" direction="column" wrap="wrap">
                  {fields.map(makeSwitches)}
                </FlexRow>
              </div>
              <SummaryLineChart
                title={title}
                subtitle={subtitle}
                data={trendData}
                field={selectedField}
                width={width}
                height={400}
                numTicksX={numTicksY}
                numTicksY={5}
              />
            </>
          );
        }}
      </ParentSize>
    </>
  );
}
