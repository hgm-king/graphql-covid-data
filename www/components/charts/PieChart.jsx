import React from "react";
import Pie from "@visx/shape/lib/shapes/Pie";
import { Group } from "@visx/group";

export default function PieChart(props) {
  const {
    data,
    radius,
    valueEliminator,
    labelEliminator,
    margin,
    backgroundColor,
    backgroundRadius,
  } = props;

  const innerRadius = props.innerRadius ?? 0;
  const outerRadius = props.outerRadius ?? 200;

  const colors = props.colors ?? ["#000"];
  const colorCount = colors.length;

  const innerWidth = radius - margin.left - margin.right;
  const innerHeight = radius - margin.top - margin.bottom;

  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;

  return (
    <svg width={radius} height={radius}>
      <rect
        width={radius}
        height={radius}
        fill={backgroundColor}
        rx={backgroundRadius}
        ry={backgroundRadius}
      />
      <Group top={centerY + margin.top} left={centerX + margin.left}>
        <Pie
          data={data}
          pieValue={valueEliminator}
          pieSortValues={() => -1}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
        >
          {(pies) =>
            pies.arcs.map((arc, i) => {
              const [centroidX, centroidY] = pies.path.centroid(arc);
              return (
                <g key={i}>
                  <path d={pies.path(arc)} fill={colors[i % colorCount]} />
                  <text
                    fill="white"
                    x={centroidX}
                    y={centroidY}
                    dy=".33em"
                    fontSize={9}
                    textAnchor="middle"
                  >
                    {labelEliminator(arc.data, arc)}
                  </text>
                </g>
              );
            })
          }
        </Pie>
      </Group>
    </svg>
  );
}
