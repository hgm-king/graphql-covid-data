import React from "react";
import { useQuery } from "urql";

import Loader from "../../components/Loader";
import Error from "../../components/Error";

import SummaryQuery from "../../queries/summary";

export default function Summary(_props) {
  const [result, _reexecuteQuery] = useQuery({
    query: SummaryQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <Loader />;
  if (error) return <Error error={error} />;

  console.log(data);
  return (
    <>
      <h3>Summary</h3>
    </>
  );
}
