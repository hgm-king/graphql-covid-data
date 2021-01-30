import React, { useState, useEffect } from "react";
import { useQuery } from "urql";
import * as d3 from "d3";

import Loader from "../../components/Loader";
import Error from "../../components/Error";
import FlexRow from "../../components/FlexRow";
import Map from "../../components/Map";

import DataByModzctaQuery from "../../queries/data-by-modzcta";

export default function ByZipcodeContainer(props) {
  const [geoJson, setGeoJson] = useState(null);

  // https://raw.githubusercontent.com/nychealth/coronavirus-data/ac2abb7dfee986000c092d21083de683c5ad3adc/Geography-resources/MODZCTA_2010_WGS1984.geo.json
  // https://gist.githubusercontent.com/pstuffa/928a2a31f352e59edef5ef56fa767e20/raw/7ba0230c627237c12cc1b3809f85d99486621756/nyc.json
  const mapUrl = "https://raw.githubusercontent.com/fedhere/PUI2015_EC/master/mam1612_EC/nyc-zip-code-tabulation-areas-polygons.geojson";

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
  console.log(data);

  const colors = {
    "Queens": 'red',
    "Brooklyn": 'blue',
    "Bronx": 'orange',
    "Manhattan": 'gold',
    "Staten Island": 'silver',
    "N/A": 'green'
  }

  const valueHandler = (properties) => {
    const row = data.DataByModzcta.find(d => d.ZCTA == properties.postalCode)
    return colors[row ? row.BOROUGHGROUP : "N/A"];
  }


  return (
    <FlexRow flex={'space-between'}>
      <Map data={geoJson} width={600} height={600} valueHandler={valueHandler} />
    </FlexRow>
  )
}
