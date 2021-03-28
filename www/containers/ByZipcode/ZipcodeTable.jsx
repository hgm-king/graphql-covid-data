import React from "react";

import DataTable from "../../components/charts/DataTable";

const excludedKeys = ["__typename", "id", "MODIFIEDZCTA", "date"];
const includedKeys = (key) => !excludedKeys.includes(key);

export default function ZipcodeTable(props) {
  const { data } = props;

  const keys = Object.keys(data[0]).filter(includedKeys);

  return <DataTable data={data} keys={keys} />;
}
