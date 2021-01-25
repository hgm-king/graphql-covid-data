import React from "react";

import Animator from "./Animator.jsx";

import map from "../vectors/map";
import theme from "../theme";

let vis;
const setVis = (v) => {
  vis = v;
};

export default function Map(props) {
  const { data, height, width } = props;

  const options = {
    data,
    height,
    width,
  };

  return (
    <>
      <Animator drawer={map} setVis={setVis} options={options} />
    </>
  );
}
