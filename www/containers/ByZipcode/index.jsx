import React, { useState, useEffect } from "react";
import { useQuery } from "urql";
import * as d3 from "d3";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

import Loader from "../../components/Loader";
import Error from "../../components/Error";
import ZctaMap from "./ZctaMap";
import ZipcodeTable from "./ZipcodeTable";

import DataByModzctaQuery from "../../queries/data-by-modzcta";

export default function ByZipcodeContainer(props) {
  const [geoJson, setGeoJson] = useState(null);

  const mapUrl = "./nyc.json";

  useEffect(() => {
    d3.json(mapUrl).then(setGeoJson);
  }, []);

  const [result, _reexecuteQuery] = useQuery({
    query: DataByModzctaQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <Loader />;
  if (error) return <Error error={error} />;
  if (!geoJson) return <p>Fetching map ...</p>;

  const margin = {
    left: 24,
    right: 24,
    top: 24,
    bottom: 24,
  };

  const percentTested = (row) => {
    const rate = (100 * row["TOTALCOVIDTESTS"]) / row["POPDENOMINATOR"];
    return rate >= 100 ? undefined : rate;
  };

  const mappedData = data.DataByModzcta.map((row) => ({
    ...row,
    PERCENTTESTED: Math.round(percentTested(row)),
  }));

  return (
    <>
      <h3>Zipcode</h3>
      <ParentSize>
        {({ width, height }) => {
          return (
            <div className="zipcodeMapStyle">
              <ZctaMap data={mappedData} geoJson={geoJson} />
            </div>
          );
        }}
      </ParentSize>
      <p>COVID Data by zipcode.</p>
      <ZipcodeTable
        data={mappedData
          .slice()
          .sort((a, b) => a.PERCENTTESTED - b.PERCENTTESTED)}
      />
    </>
  );
}
