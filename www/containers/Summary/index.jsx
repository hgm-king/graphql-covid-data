import React, { useState, useEffect } from "react";
import { useQuery } from "urql";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

import Loader from "../../components/Loader";
import Error from "../../components/Error";
import Select from "../../components/Select";
import Switch from "../../components/Switch";
import FlexRow from "../../components/FlexRow";

import SummaryLineChart from "./SummaryLineChart";
import DataTable from "../../components/charts/DataTable";

import SummaryQuery from "../../queries/summary";
import { getTrend } from "./calculations";

const calculationType = (flag) => (flag ? "trend" : "value");

export default function Summary(_props) {
  const [selectedField, setSelectedField] = useState("CASECOUNT");
  const [selectedCalculation, setSelectedCalculation] = useState(false);

  const [result, _reexecuteQuery] = useQuery({
    query: SummaryQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <Loader />;
  if (error) return <Error error={error} />;

  const getIndex = (d) => selectedField;
  const getValue = (d) => d[selectedField];

  const selectedDay = data.DataByDay[data.DataByDay.length - 1].date;
  const dateString = new Date(selectedDay).toDateString();

  const title = `${selectedField}`;
  const subtitle = `as of ${dateString}`;
  const switchText = `Click to view ${
    selectedCalculation ? "values" : "daily changes"
  }`;

  const fields = Object.keys(data.DataByDay[0])
    .filter((k) => k.match(/COUNT/))
    .sort();

  const handleFieldOnChange = (option) => {
    setSelectedField(option.value);
  };

  const handleCalculationOnChange = () => {
    setSelectedCalculation(!selectedCalculation);
  };

  const trendData = data.DataByDay;
  const summedTotals = data.DataByDay.reduce((acc, row) => {
    acc.CASECOUNT += row.CASECOUNT;
    acc.DEATHCOUNT += row.DEATHCOUNT;
    acc.HOSPITALIZEDCOUNT += row.HOSPITALIZEDCOUNT;

    return acc;
  }, {
    CASECOUNT: 0,
    DEATHCOUNT: 0,
    HOSPITALIZEDCOUNT: 0,
  })

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
          console.log({ width, height });
          const dropdownWidth = width > 1100 ? "25%" : "100%";
          const chartWidth = width > 1100 ? 800 : width < 20 ? 20 : width;
          const numTicksY = width < 690 ? 4 : undefined;
          return (
            <>
              <div style={{ width: dropdownWidth, marginTop: 24 }}>
                <Select
                  options={fields}
                  selected={selectedField}
                  onChange={handleFieldOnChange}
                  label="field"
                  width="100%"
                />
              </div>
              <SummaryLineChart
                title={title}
                subtitle={subtitle}
                data={trendData}
                field={selectedField}
                calculation={calculationType(selectedCalculation)}
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
