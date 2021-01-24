// packages
import React, { useState } from "react";
import { css } from "@emotion/css";
import { createClient, Provider } from "urql";

// containers
import Antibody from "./containers/Antibody/";
import ByRace from "./containers/ByRace/";

// components
import FlexRow from "./components/FlexRow";
import Button from "./components/Button";

// utils
import theme from "./theme/";

const serverHost = process.env.SERVER_HOST ?? "localhost";
const serverPort = process.env.SERVER_PORT ?? "3000";

const client = createClient({
  url: `http://${serverHost}:${serverPort}/graphql`,
});

export default function App(_props) {
  const navs = ["Antibodies", "ByRace"];

  const [selected, setSelected] = useState(navs[1]);

  const main = css`
    color: ${theme.colors.black};
    margin-left: 48px;
    margin-right: 48px;
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
        <h6>Hello, World!</h6>
        <p>NYC Covid Data Dashboard by HG King</p>
        <FlexRow flex="flex-start">{navs.map(makeNav)}</FlexRow>
        {selected === "Antibodies" ? (
          <Antibody />
        ) : selected === "ByRace" ? (
          <ByRace />
        ) : (
          <h1>None</h1>
        )}
      </div>
    </Provider>
  );
}
