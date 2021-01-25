import React, { useState, useEffect } from "react";
import * as d3 from "d3";

import Map from "../../components/Map";

export default function ByZipcodeContainer(props) {
  const [geoJson, setGeoJson] = useState(null);

  const mapUrl =
    "https://raw.githubusercontent.com/nychealth/coronavirus-data/master/Geography-resources/MODZCTA_2010_WGS1984.geo.json";

  useEffect(() => {
    d3.json(mapUrl).then(setGeoJson);
  }, []);

  return geoJson ? <Map data={geoJson} /> : <h4>Loading Map..</h4>;
}
