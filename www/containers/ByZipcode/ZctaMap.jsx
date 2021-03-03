import React, { useState, useEffect } from "react";

import FlexRow from "../../components/FlexRow";
import Animator from "../../components/Animator.jsx";
import Select from "../../components/Select";

import map from "../../vectors/map";
import { OrdinalScale, LinearScale } from "../../utils/scale-tools";
import theme from "../../theme";
import { toOption } from "../../utils/data-tools";

const excludedKeys = [
  "__typename",
  "id",
  "MODIFIEDZCTA",
  "ZCTA",
  "NEIGHBORHOODNAME",
  "BOROUGHGROUP",
  "date",
];

const includedKeys = (key) => !excludedKeys.includes(key);

let vis;
const setVis = (v) => {
  vis = v;
};

export default function ZctaMap(props) {
  const { data, geoJson } = props;

  const [selectedZipcode, setSelectedZipcode] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState("COVIDCASECOUNT");

  const propertiesIndex = "postalCode";
  const fetchFromData = (zipcode) => data.find((d) => d.ZCTA == zipcode);

  const keys = Object.keys(data[0]).filter(includedKeys);

  const colors = [
    theme.palettes.DataVizPalette[theme.palettes.DataVizPalette.length - 1],
    theme.palettes.DataVizPalette[0],
  ];

  const valueHandler = (properties) => {
    const row = fetchFromData(properties[propertiesIndex]);
    return colors[row ? row[selectedIndex] : "N/A"];
  };

  const max = Math.max(...data.map((d) => d[selectedIndex] || 0));
  const min = Math.min(...data.map((d) => d[selectedIndex] || 0));

  const colorScale = LinearScale([min, max], colors);

  geoJson.features = geoJson.features.map((feature) => {
    const row = fetchFromData(feature.properties[propertiesIndex]);
    feature.properties.fill = colorScale(row ? row[selectedIndex] : 0);
    return feature;
  });

  const colorHandler = (properties) => properties.fill;

  const onClick = (d) => {
    setSelectedZipcode(d[propertiesIndex]);
  };

  const handleIndexChange = ({ value }) => {
    setSelectedIndex(value);
    vis.update();
  };

  const options = {
    data: geoJson,
    height: 600,
    width: 600,
    valueHandler,
    colorHandler,
    selectedIndex,
    onClick,
  };

  return (
    <>
      <FlexRow flex="space-between" wrap="wrap">
        <div style={{ width: 400 }}>
          <Select
            options={keys}
            default={selectedIndex}
            onChange={handleIndexChange}
            width="100%"
          />
          <FlexRow flex="flex-start" align="center">
            <div
              style={{
                height: 20,
                width: 20,
                backgroundColor: colorScale(min),
                marginRight: "16px",
              }}
            />
            Min: {min} | Max: {max}
            <div
              style={{
                height: 20,
                width: 20,
                backgroundColor: colorScale(max),
                marginLeft: "16px",
              }}
            />
          </FlexRow>
          <MapSummary
            selectedZipcode={selectedZipcode}
            data={fetchFromData(selectedZipcode)}
          />
        </div>
        <Animator drawer={map} setVis={setVis} options={options} />
      </FlexRow>
    </>
  );
}

function MapSummary(props) {
  const { selectedZipcode, data } = props;
  if (!data) return <h6>Select a zipcode...</h6>;

  const makeRow = (key, i) => (
    <div key={i}>
      <p>
        {key} :: {data[key]}
      </p>
    </div>
  );

  return (
    <div>
      <h6>
        {data["MODIFIEDZCTA"]} :: {data["BOROUGHGROUP"]} ::{" "}
        {data["NEIGHBORHOODNAME"]}
      </h6>
      {Object.keys(data).filter(includedKeys).map(makeRow)}
    </div>
  );
}
