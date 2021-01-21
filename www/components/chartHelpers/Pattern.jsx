import React from "react";
import { PatternCircles } from "@visx/pattern";
import { Bar } from "@visx/shape";

export default function Pattern(props) {
  const { fill, id, ...other } = props;

  return (
    <svg>
      <PatternCircles
        id={id}
        width={10}
        height={10}
        fill={fill}
        complement
      />
      <Bar {...other} fill={`url(#${id})`} />
    </svg>
  );
}
