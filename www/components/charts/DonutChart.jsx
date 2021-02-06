import React, { useState, useEffect } from "react";
import Pie from "@visx/shape/lib/shapes/Pie";
import { Group } from "@visx/group";

export default function DonutChart(props) {
  const {
    data,
    keys,
    radius,
    valueEliminator,
    labelEliminator,
    margin,
    backgroundColor,
    backgroundRadius,
    onClick,
  } = props;

  const [selected, setSelected] = useState(props.selected);

  // need to use effect to make the props link up to our state
  useEffect(() => {
    setSelected(props.selected);
  }, [props.selected]);

  const innerRadius = props.innerRadius ?? radius * 0.35;
  const outerRadius = props.outerRadius ?? radius;

  const colors = props.colors ?? ["#000"];
  const colorsMapped = colors.map((c, i) =>
    !selected || keys[i] === selected ? c : `${c}20`
  );
  const colorCount = colors.length;

  const innerWidth = radius - margin.left - margin.right;
  const innerHeight = radius - margin.top - margin.bottom;

  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;

  const handleClick = (e, pie) => {
    const key = labelEliminator(pie.data);

    if (selected == key) {
      setSelected(null);
    } else {
      setSelected(key);
    }

    if (onClick) {
      onClick(e, pie, key, setSelected);
    }
  };

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
              const key = labelEliminator(arc.data, arc);
              return (
                <g key={i}>
                  <path
                    d={pies.path(arc)}
                    fill={colorsMapped[i % colorCount]}
                    onClick={(e) => handleClick(e, arc)}
                  />
                  <text
                    fill="white"
                    x={centroidX}
                    y={centroidY}
                    dy=".33em"
                    fontSize={9}
                    textAnchor="middle"
                    onClick={(e) => handleClick(e, arc)}
                  >
                    {key}
                  </text>
                  {key == selected && (
                    <text x={0} y={0} textAnchor="middle">
                      {key}
                    </text>
                  )}
                </g>
              );
            })
          }
        </Pie>
        {null == selected && (
          <text x={0} y={0} textAnchor="middle">
            Total
          </text>
        )}
      </Group>
    </svg>
  );
}
