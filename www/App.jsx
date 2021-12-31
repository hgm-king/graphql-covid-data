// packages
import React, { useState, useEffect } from "react";
import { css } from "@emotion/css";
import { createClient, Provider } from "urql";
import { pipe, subscribe } from "wonka";

// containers
import Summary from "./containers/Summary/";

// components
import FlexRow from "./components/FlexRow";
import Button from "./components/Button";
import Footer from "./components/Footer";

// utils
import theme from "./theme/";
import VersionQuery from "./queries/version";

let serverHost;
let serverPort;

if (process.env.NODE_ENV === "production") {
  serverHost = "covid-data.nyc";
  serverPort = 4000;
} else {
  serverHost = "0.0.0.0";
  serverPort = 4000;
}

const client = createClient({
  url: `http://${serverHost}:${serverPort}/graphql`,
});

export default function App(_props) {
  console.log("rendering App");
  const navs = ["Summary"];

  const [selected, setSelected] = useState(navs[0]);
  const [versionData, setVersionData] = useState();

  useEffect(() => {
    const { unsubscribe } = pipe(
      client.query(VersionQuery, { id: "test" }),
      subscribe((result) => {
        if (result.error) {
          console.log("-- Error!! --");
        }
        setVersionData(result.data.coviddatafrontend[0]);
      })
    );
    return unsubscribe;
  }, []);

  const main = css`
    color: ${theme.colors.black};
  `;

  const selectHeader = (header) => (_e) => setSelected(header);
  const selectedPredicate = (header) =>
    header === selected ? "black" : "white";
  const makeNav = (header, i) => (
    <div key={i}>
      <Button type={selectedPredicate(header)} onClick={selectHeader(header)}>
        {header}
      </Button>
    </div>
  );

  return (
    <Provider value={client}>
      <div id="main" className={main}>
        {selected === "Summary" ? (
          <Summary />
        ) : selected === "Race" ? (
          <ByRace />
        ) : selected === "Age" ? (
          <ByAge />
        ) : selected === "Zipcode" ? (
          <ByZipcode />
        ) : (
          <h1>None</h1>
        )}
        <Footer versionData={versionData} />
      </div>
    </Provider>
  );
}
