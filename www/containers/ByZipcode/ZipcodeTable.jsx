import React from "react";
import { css } from "@emotion/css";

const excludedKeys = ["__typename", "id", "MODIFIEDZCTA", "date"];
const includedKeys = (key) => !excludedKeys.includes(key);

const tableStyle = css`
  overflow-y: auto;
  height: 500px;

  thead th {
    position: sticky;
    top: 0;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th,
  td {
    padding: 8px 16px;
    border: 1px solid #ccc;
  }
  th {
    background: #eee;
  }
`;

export default function ZipcodeTable(props) {
  const { data } = props;

  const keys = Object.keys(data[0]).filter(includedKeys);

  return (
    <div className={tableStyle}>
      <table>
        <Header keys={keys} />
        <Body data={data} keys={keys} />
      </table>
    </div>
  );
}

function Header(props) {
  const { keys } = props;

  const makeKey = (key, i) => <th key={i}>{key}</th>;

  return (
    <thead>
      <tr>{keys.map(makeKey)}</tr>
    </thead>
  );
}

function Body(props) {
  const { data, keys } = props;

  const makeRow = (row, i) => <tr key={i}>{keys.map(makeCell(row))}</tr>;
  const makeCell = (row) => (key, i) => <td key={i}>{row[key].toLocaleString()}</td>;

  return <tbody>{data.map(makeRow)}</tbody>;
}
