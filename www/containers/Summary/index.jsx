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
import theme from "../../theme";
// import withQuery from "../../hoc/withQuery";

export default function Summary(props) {
  const [selectedField, setSelectedField] = useState("CASECOUNT");

  const [result, _reexecuteQuery] = useQuery({
    query: SummaryQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <Loader />;
  if (error) return <Error error={error} />;

  data.DataByDay.sort(
    (a, b) => new Date(a.dateOfInterest) > new Date(b.dateOfInterest)
  );

  const getIndex = (d) => selectedField;
  const getValue = (d) => d[selectedField];
  const length = data.DataByDay.length;

  const selectedDay = data.DataByDay[length - 1].dateOfInterest;
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

  const getDailyDelta = (key) =>
    data.DataByDay[length - 1][key] - data.DataByDay[length - 2][key];
  const getDailyValue = (key) => data.DataByDay[length - 1][key];

  const makeSwitches = (key, i) => {
    const total = summedTotals[key].toLocaleString();
    const dailyChange = getDailyValue(key).toLocaleString();

    const delta = getDailyDelta(key);
    const deltaColor = delta <= 0 ? theme.colors.success : theme.colors.danger;

    const trendArrow = delta < 0 ? "▼" : delta > 0 ? "▲" : "";

    return (
      <FlexRow key={i} flex="flex-start" align="center" wrap="wrap">
        <Switch
          state={key == selectedField}
          onClick={() => setSelectedField(key)}
        />
        <span>{key}&nbsp;</span>
        <span>
          - Daily Change: {dailyChange} (
          <span style={{ color: deltaColor }}>
            {trendArrow}
            {Math.abs(delta)}
          </span>
          ); Total: {total}
        </span>
      </FlexRow>
    );
  };

  return (
    <>
      <h3>Summary</h3>
      <h6
        style={{
          borderBottom: "1px solid black",
          marginBottom: 24,
          paddingBottom: 8,
        }}
      >
        Showing data for {dateString} - day {data.DataByDay.length}
      </h6>
      <ParentSize>
        {({ width, height }) => {
          const isLarge = width > 1100;
          const isSmall = width < 690;

          const dropdownWidth = isLarge ? "25%" : "100%";
          const chartWidth = isLarge ? 800 : width < 20 ? 20 : width;

          // lower granularity
          const numTicksY = isSmall ? 4 : undefined;
          const trendDataPruned = data.DataByDay.filter((row, i) =>
            isSmall ? i % 7 == 3 : true
          );

          return (
            <>
              <div style={{ marginLeft: 24, marginBottom: 24, width: "100%" }}>
                <span>Select a metric to view trends:</span>
                <FlexRow flex="space-between" direction="column" wrap="wrap">
                  {fields.map(makeSwitches)}
                </FlexRow>
              </div>
              <p>
                Daily changes in COVID {selectedField} for NYC;{" "}
                {data.DataByDay.length} days since outbreak.
              </p>
              <SummaryLineChart
                title={title}
                subtitle={subtitle}
                data={trendDataPruned}
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
