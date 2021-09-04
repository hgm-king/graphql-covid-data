import { useQuery } from "urql";
import Loader from "../components/Loader";
import Error from "../components/Error";

export default function withQuery(WrappedComponent, query, variables) {
  const [result, _reexecuteQuery] = useQuery({
    query: query,
    variables: variables
  });

  const { data, fetching, error } = result;

  if (error) return <Error error={error} />;
  if (data) return <WrappedComponent data={data} />;
  if (fetching) return <Loader />;
}
