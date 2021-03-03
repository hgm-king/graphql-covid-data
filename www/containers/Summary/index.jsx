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

  const makeSwitches = (key, i) => (
    <FlexRow key={i} flex="flex-start" align="center">
      <Switch
        state={key == selectedField}
        onClick={() => setSelectedField(key)}
      />
      {key}
    </FlexRow>
  );

  const title = `${selectedField}`;
  const subtitle = `as of ${dateString}`;

  const fields = Object.keys(data.DataByDay[0])
    .filter((k) => k.match(/COUNT/))
    .sort();

  const handleFieldOnChange = (option) => {
    setSelectedField(option.value);
  };

  const trendData = data.DataByDay;
  const summedTotals = summedObject(data.DataByDay, [
    "CASECOUNT",
    "DEATHCOUNT",
    "HOSPITALIZEDCOUNT",
  ]);

  return (
    <>
      <h3>Summary</h3>
      <h6>Showing data for {dateString}</h6>
      <DataTable
        data={[summedTotals]}
        keys={fields}
        formatValue={(d) => d.toLocaleString(d)}
      />
      <ParentSize>
        {({ width, height }) => {
          const dropdownWidth = width > 1100 ? "25%" : "100%";
          const chartWidth = width > 1100 ? 800 : width < 20 ? 20 : width;
          const numTicksY = width < 690 ? 4 : undefined;
          return (
            <>
              <div style={{ marginLeft: 24, marginBottom: 24, width: "50%" }}>
                <FlexRow flex="space-between" wrap="wrap">
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
