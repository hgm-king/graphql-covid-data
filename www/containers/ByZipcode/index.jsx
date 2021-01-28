import React, { useState, useEffect } from "react";
import * as d3 from "d3";

import Map from "../../components/Map";

export default function ByZipcodeContainer(props) {
  const [geoJson, setGeoJson] = useState(null);
// https://raw.githubusercontent.com/nychealth/coronavirus-data/ac2abb7dfee986000c092d21083de683c5ad3adc/Geography-resources/MODZCTA_2010_WGS1984.geo.json
// https://gist.githubusercontent.com/pstuffa/928a2a31f352e59edef5ef56fa767e20/raw/7ba0230c627237c12cc1b3809f85d99486621756/nyc.json
  const mapUrl =
    "/nyc.json";

  useEffect(() => {
    d3.json(mapUrl).then(setGeoJson);
  }, []);

  return geoJson ? <Map data={geoJson} width={1000} height={600} /> : <h4>Loading Map..</h4>;
}
