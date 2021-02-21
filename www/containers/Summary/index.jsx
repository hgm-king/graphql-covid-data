import React, { useState, useEffect } from "react";
import { useQuery } from "urql";

import Loader from "../../components/Loader";
import Error from "../../components/Error";

import SummaryQuery from "../../queries/summary";
import Select from "../../components/Select";
import SummaryLineChart from "./SummaryLineChart";
import FlexRow from "../../components/FlexRow";
import DataTable from "../../components/charts/DataTable";

import { getTrend } from "../ByRace/calculations";

const calculationTypes = ["value", "rate", "trend"];

export default function Summary(_props) {
  const [selectedField, setSelectedField] = useState("NYCCASECOUNT");
  const [selectedCalculation, setSelectedCalculation] = useState("value");

  const [result, _reexecuteQuery] = useQuery({
    query: SummaryQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <Loader />;
  if (error) return <Error error={error} />;

  const getIndex = (d) => selectedField;
  const getValue = (d) => d[selectedField];

  const selectedDay = data.SummaryPrime[data.SummaryPrime.length - 1].date;
  const dateString = new Date(selectedDay).toDateString();

  const fields = Object.keys(data.SummaryPrime[0])
    .filter((k) => k.match(/NYC/))
    .filter((k) => !k.match(/TOTAL/))
    .filter((k) => !k.match(/PROBABLE/))
    .sort();

  const handleFieldOnChange = (option) => {
    setSelectedField(option.value);
  };

  const handleCalculationOnChange = (option) => {
    setSelectedCalculation(option.value);
  };

  const trendData = data.SummaryPrime.map(getTrend(getIndex, getValue)).filter(
    (d) => Math.abs(d["rate"]) < 2.0 && d.trend > 0
  );

  console.log(data.SummaryPrime[data.SummaryPrime.length - 1]);

  return (
    <>
      <h3>Summary</h3>
      <h6>Showing data for {dateString}</h6>
      <DataTable
        data={data.SummaryPrime.slice(-1)}
        keys={fields}
        formatValue={(d) => d.toLocaleString(d)}
      />
      <FlexRow flex="space-between">
        <div style={{ width: "25%", marginTop: 48 }}>
          <Select
            options={fields}
            selected={selectedField}
            onChange={handleFieldOnChange}
            label="field"
            width="100%"
          />
          <Select
            options={calculationTypes}
            selected={selectedCalculation}
            onChange={handleCalculationOnChange}
            label="calculation"
            width="100%"
          />
        </div>
        <SummaryLineChart
          data={trendData}
          field={selectedField}
          calculation={selectedCalculation}
        />
      </FlexRow>
    </>
  );
}
