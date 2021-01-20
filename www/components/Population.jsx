import React, { useState, useEffect, useRef } from "react";
import { css } from "@emotion/css";

import population from "../vectors/population";
import theme from "../theme";
import { OrdinalScale } from "../utils/scale-tools";

import Animator from "./Animator.jsx";
import LegendBox from "./LegendBox";

let vis;
const setVis = (v) => {
  vis = v;
};

export default function Population(props) {
  const { data, height, width } = props;

  console.log(data);

  const indexEliminator = (d) => d.RACEGROUP;
  const raceIndexes = [...new Set(data.map(indexEliminator).sort())];

  const calculateData = data.reduce((acc, row) => {
    const value = row["DEATHRATEADJ"];
    const category = indexEliminator(row);
    for (let i = 0; i < value; i++) {
      acc.push(category);
    }
    return acc;
  }, []);

  const themeColors = theme.palettes.DataVizPalette;

  const colors = raceIndexes.reduce((acc, race, i) => {
    acc[race] = themeColors[i];
    return acc;
  }, {});

  const colorScale = OrdinalScale(raceIndexes, themeColors);

  const valueHandler = (category) => colors[category];

  const options = {
    height,
    width,
    data: calculateData,
    valueHandler,
  };

  return (
    <>
      <LegendBox scale={colorScale} formatter={(d) => d} width={width} />
      <Animator drawer={population} setVis={setVis} options={options} />
    </>
  );
}
