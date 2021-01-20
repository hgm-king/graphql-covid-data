import React from "react";
import { css } from "@emotion/css";
import { LegendOrdinal, LegendItem, LegendLabel } from "@visx/legend";

export default function LegendBox(props) {
  const { scale, formatter, height, width, onClick } = props;

  const containerStyle = css`
    border-bottom: 1px solid black;
    height: ${height}px;
    width: ${width}px;
    margin-bottom: 24px;
  `;

  const wrapperStyle = css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 24px 24px 0px 24px;
  `;

  const legendGlyphSize = 15;

  return (
    <div className={containerStyle}>
      <LegendOrdinal scale={scale} labelFormat={formatter}>
        {(keys) => (
          <div className={wrapperStyle}>
            {keys.map((label, i) => (
              <LegendItem
                key={`legend-quantile-${i}`}
                onClick={() => onClick && onClick(label.datum)}
              >
                <svg width={legendGlyphSize} height={legendGlyphSize}>
                  <rect
                    fill={label.value}
                    width={legendGlyphSize}
                    height={legendGlyphSize}
                  />
                </svg>
                <LegendLabel>{label.text}</LegendLabel>
              </LegendItem>
            ))}
          </div>
        )}
      </LegendOrdinal>
    </div>
  );
}
