import React from "react"
import { useQuery } from "urql"

import AntibodyQuery from "../queries/antibody"

import Loader from "../components/Loader.jsx"
import Error from "../components/Error.jsx"

export default function Antibody( props )  {

  const [result, reexecuteQuery] = useQuery({
    query: AntibodyQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <Loader />;
  if (error) return <Error error={error} />;

  console.log(data);

  return (
    <>
      <h3>Antibody</h3>

    </>
  )
}
