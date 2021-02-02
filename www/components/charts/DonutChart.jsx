import React, { useState } from "react";
import Pie from "@visx/shape/lib/shapes/Pie";
import { Group } from "@visx/group";

export default function DonutChart(props) {
  const {
    data,
    keys,
    width,
    height,
    valueEliminator,
    labelEliminator,
    margin,
    backgroundColor,
    backgroundRadius,
    onClick,
  } = props;

  const [selected, setSelected] = useState(null);
  console.log({selected, keys});
  const innerRadius = props.innerRadius ?? width * 0.35;
  const outerRadius = props.outerRadius ?? width;

  const colors = props.colors ?? ["#000"];
  const colorsMapped = colors.map((c, i) =>
    !selected || keys[i] === selected ? c : `${c}20`
  );
  const colorCount = colors.length;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;

  const handleClick = (e, pie) => {
    const key = labelEliminator(pie.data)
    if ( selected == key )  { setSelected(null); }
    else { setSelected(key); }
    if ( onClick ) { onClick(e, pie); }
  }

  return (
    <svg width={width} height={height}>
      <rect
        width={width}
        height={height}
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
              const key = labelEliminator(arc.data, arc);
              return (
                <g key={i}>
                  <path d={pies.path(arc)} fill={colorsMapped[i % colorCount]} onClick={(e) => handleClick(e, arc)}/>
                  <text
                    fill="white"
                    x={centroidX}
                    y={centroidY}
                    dy=".33em"
                    fontSize={9}
                    textAnchor="middle"
                  >
                    {key}
                  </text>
                  {key == selected &&
                    <text
                      x={0}
                      y={0}
                      textAnchor="middle"
                      >
                      {key}
                    </text>
                  }
                </g>
              );
            })
          }
        </Pie>
        {null == selected &&
          <text
            x={0}
            y={0}
            textAnchor="middle"
            >
            Total
          </text>
        }
      </Group>
    </svg>
  );
}
