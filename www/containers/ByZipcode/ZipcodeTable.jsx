import React from "react";

export default function ZipcodeTable(props)  {
  const { data } = props;

  const keys = Object.keys(data[0])

  return (
    <table>
      <Header keys={keys} />
      <Body data={data} />
    </table>
  )
}

function Header(props)  {
  const { keys } = props;

  const makeKey = (key, i) => <th key={i}>{key}</th>

  return (
    <thead>
      <tr>
        {keys.map(makeKey)}
      </tr>
    </thead>
  )
}

function Body(props) {
  const { data } = props;

  const makeRow = (row, i) => <tr key={i}>{Object.keys(row).map(makeCell(row))}</tr>
  const makeCell = (row) => (key, i) => <td>{row[key]}</td>

  return (
    <tbody>
      {data.map(makeRow)}
    </tbody>
  )
}
