import React, { useState } from "react";
import { BarGroupHorizontal, Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisLeft } from "@visx/axis";

import LegendBox from "../LegendBox";

import {
  LinearScale,
  OrdinalScale,
  BandScale,
  calculateXRange,
  calculateYRange,
} from "../../utils/scale-tools";
import theme from "../../theme/";

export default function BarChartGroup(props) {
  const {
    data,
    keys,
    width,
    height,
    indexExtractor,
    margin,
    legendFormatter,
    backgroundColor,
    backgroundRadius,
    valueLabel,
  } = props;

  const [selected, setSelected] = useState(props.selected);

  const colors = props.colors ?? ["#000"];

  const colorsMapped = colors.map((c, i) =>
    !selected || keys[i] === selected ? c : `${c}20`
  );

  const selectIndex = (index) => {
    console.log(index);
    if (index === selected) {
      setSelected(undefined);
    } else {
      setSelected(index);
    }
  };

  const allTotals = data.reduce((allTotals, row) => {
    const total = keys.reduce((total, key) => {
      total += row[key];
      return total;
    }, 0);
    allTotals.push(total);
    return allTotals;
  }, []);

  const xRange = calculateXRange(width, margin);
  const yRange = calculateYRange(height, margin);

  const xScale = LinearScale([0, Math.max(...allTotals)], xRange);
  const yScale = BandScale(data.map(indexExtractor), yRange, 0.4);
  const y1Scale = BandScale(keys, [0, yScale.bandwidth()], 0.1);

  const colorScale = OrdinalScale(keys, colorsMapped);

  return (
    <div>
      <LegendBox
        scale={colorScale}
        formatter={legendFormatter}
        width={width}
        onClick={selectIndex}
      />
      <svg width={width} height={height}>
        <rect
          width={width}
          height={height}
          fill={backgroundColor}
          ry={backgroundRadius}
        />
        <Group>
          <BarGroupHorizontal
            data={data}
            keys={keys}
            y0={indexExtractor}
            y0Scale={yScale}
            y1Scale={y1Scale}
            xScale={xScale}
            color={colorScale}
          >
            {(barGroups) =>
              barGroups.map((barGroup) => (
                <Group
                  key={`bar-group-horizontal-${barGroup.index}-${barGroup.y0}`}
                  top={barGroup.y0}
                >
                  {barGroup.bars.map((bar, i) => (
                    <React.Fragment key={i}>
                      <Bar
                        key={`${barGroup.index}-${bar.index}-${bar.key}`}
                        x={bar.x + margin.left}
                        y={bar.y + margin.top}
                        width={bar.width}
                        height={bar.height}
                        fill={bar.color}
                        rx={4}
                        onClick={() => {
                          selectIndex(bar.key);
                        }}
                      />
                      <text
                        fill={theme.colors.black}
                        x={bar.x + margin.left + bar.width}
                        y={bar.y + margin.top + bar.height / 2}
                        dy=".33em"
                        fontSize={13}
                        textAnchor="start"
                      >
                        {valueLabel && valueLabel(bar, barGroup)}
                      </text>
                    </React.Fragment>
                  ))}
                </Group>
              ))
            }
          </BarGroupHorizontal>
          <AxisLeft
            left={margin.left}
            hideAxisLine
            hideTicks
            scale={yScale}
            tickFormat={(d) => d}
            stroke={theme.colors.black}
            tickStroke={theme.colors.black}
            tickLabelProps={() => ({
              fill: theme.colors.black,
              fontSize: 11,
              textAnchor: "end",
              dy: "0.33em",
            })}
          />
        </Group>
      </svg>
    </div>
  );
}
