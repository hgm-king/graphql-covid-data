import React, { useState, useEffect } from "react";
import { useQuery } from "urql";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

import Loader from "../../components/Loader";
import Error from "../../components/Error";

import SummaryQuery from "../../queries/summary";
import Select from "../../components/Select";
import Switch from "../../components/Switch";
import SummaryLineChart from "./SummaryLineChart";
import FlexRow from "../../components/FlexRow";
import DataTable from "../../components/charts/DataTable";

import { getTrend } from "../ByRace/calculations";

const calculationType = (flag) => (flag ? "trend" : "value");

export default function Summary(_props) {
  const [selectedField, setSelectedField] = useState("NYCCASECOUNT");
  const [selectedCalculation, setSelectedCalculation] = useState(false);

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

  const title = `${selectedField}`;
  const subtitle = `as of ${dateString}`;
  const switchText = `Click to view ${
    selectedCalculation ? "values" : "daily changes"
  }`;

  const fields = Object.keys(data.SummaryPrime[0])
    .filter((k) => k.match(/NYC/))
    .filter((k) => !k.match(/TOTAL/))
    .filter((k) => !k.match(/PROBABLE/))
    .sort();

  const handleFieldOnChange = (option) => {
    setSelectedField(option.value);
  };

  const handleCalculationOnChange = () => {
    setSelectedCalculation(!selectedCalculation);
  };

  const trendData = data.SummaryPrime.map(getTrend(getIndex, getValue)).filter(
    (d) => Math.abs(d["rate"]) < 2.0 && d.trend > 0
  );

  return (
    <>
      <h3>Summary</h3>
      <h6>Showing data for {dateString}</h6>
      <DataTable
        data={data.SummaryPrime.slice(-1)}
        keys={fields}
        formatValue={(d) => d.toLocaleString(d)}
      />
      <ParentSize>
        {({ width, height }) => {
          const dropdownWidth = width > 1100 ? "25%" : "100%";
          const chartWidth = width > 1100 ? 800 : width < 20 ? 20 : width;
          return (
            <FlexRow flex="space-between" wrap="wrap">
              <div style={{ width: dropdownWidth, marginTop: 48 }}>
                <Select
                  options={fields}
                  selected={selectedField}
                  onChange={handleFieldOnChange}
                  label="field"
                  width="100%"
                />
                <div style={{ marginLeft: 24 }}>
                  <FlexRow flex="space-betwen" align="center">
                    <Switch
                      onClick={handleCalculationOnChange}
                      state={selectedCalculation}
                    />
                    <span>{switchText}</span>
                  </FlexRow>
                </div>
              </div>
              <SummaryLineChart
                title={title}
                subtitle={subtitle}
                data={trendData}
                field={selectedField}
                calculation={calculationType(selectedCalculation)}
                width={chartWidth}
                height={400}
              />
            </FlexRow>
          );
        }}
      </ParentSize>
    </>
  );
}
