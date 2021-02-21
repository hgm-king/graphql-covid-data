import React from "react";
import { css } from "@emotion/css";

const tableStyle = css`
  overflow-y: auto;

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

export default function DataTable(props) {
  const { data, keys, formatValue, formatHeader } = props;

  return (
    <div className={tableStyle}>
      <table>
        <Header keys={keys} formatHeader={formatHeader} />
        <Body data={data} keys={keys} formatValue={formatValue} />
      </table>
    </div>
  );
}

function Header(props) {
  const { keys, formatHeader } = props;

  const doFormat = (key) => (formatHeader ? formatHeader(key) : key);
  const makeKey = (key, i) => <th key={i}>{doFormat(key)}</th>;

  return (
    <thead>
      <tr>{keys.map(makeKey)}</tr>
    </thead>
  );
}

function Body(props) {
  const { data, keys, formatValue } = props;

  const doFormat = (value) => (formatValue ? formatValue(value) : value);
  const makeRow = (row, i) => <tr key={i}>{keys.map(makeCell(row))}</tr>;
  const makeCell = (row) => (key, i) => <td>{doFormat(row[key])}</td>;

  return <tbody>{data.map(makeRow)}</tbody>;
}
