import React, { useEffect } from "react";
import { css } from "@emotion/css";

const tableStyle = css`
  overflow-y: auto;
  overflow-x: scroll;
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

export default function DataTable(props) {
  const {
    data,
    keys,
    formatValue,
    formatHeader,
    sortHeader,
    sortDirection,
  } = props;

  useEffect(() => {
    const sorter = (a, b) => {
      const fieldA = a[sortHeader];
      const fieldB = b[sortHeader];

      return sortDirection ? fieldA - fieldB : fieldB - fieldA;
    };

    data.sort(sorter);
  }, [data, sortHeader, sortDirection]);

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
  const makeCell = (row) => (key, i) => <td key={i}>{doFormat(row[key])}</td>;

  return <tbody>{data.map(makeRow)}</tbody>;
}
