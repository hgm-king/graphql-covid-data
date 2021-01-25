import React from "react";

export default function PopulationValues(props) {
  const { data, field, index } = props;

  const total = data.reduce((acc, d) => acc + d[field], 0);

  const makeHeader = (data) => (
    <tr>
      {data.concat({ [index]: "Total" }).map((d, i) => (
        <th key={i}>{d[index]}</th>
      ))}
    </tr>
  );

  const makeValueRow = (data) => (
    <tr>
      {data.concat({ [field]: total }).map((d, i) => (
        <td key={i}>{Math.floor(d[field]).toLocaleString("en")}</td>
      ))}
    </tr>
  );
  const makePercentRow = (data) => (
    <tr>
      {data.concat({ [field]: total }).map((d, i) => (
        <td key={i}>{((100 * d[field]) / total).toFixed(1)}%</td>
      ))}
    </tr>
  );

  return (
    <table style={{ width: "75%" }}>
      <thead>{makeHeader(data)}</thead>
      <tbody>
        {makeValueRow(data)}
        {makePercentRow(data)}
      </tbody>
    </table>
  );
}
