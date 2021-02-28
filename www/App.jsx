// packages
import React, { useState } from "react";
import { css } from "@emotion/css";
import { createClient, Provider } from "urql";

// containers
import Summary from "./containers/Summary/";
import ByRace from "./containers/ByRace/";
import ByZipcode from "./containers/ByZipcode/";

// components
import FlexRow from "./components/FlexRow";
import Button from "./components/Button";
import Footer from "./components/Footer";

// utils
import theme from "./theme/";

// const serverHost = process.env.SERVER_HOST ?? "104.131.165.152";
const serverHost = process.env.SERVER_HOST ?? "104.131.165.152";
const serverPort = process.env.SERVER_PORT ?? "3000";

const client = createClient({
  url: `http://${serverHost}:${serverPort}/graphql`,
});

export default function App(_props) {
  const navs = ["Summary", "ByRace", "ByZipcode"];

  const [selected, setSelected] = useState(navs[1]);

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
        <h6>Hello, World!</h6>
        <p>NYC Covid Data Dashboard by HG King</p>
        <FlexRow flex="flex-start" wrap="wrap">
          {navs.map(makeNav)}
        </FlexRow>
        {selected === "Summary" ? (
          <Summary />
        ) : selected === "ByRace" ? (
          <ByRace />
        ) : selected === "ByZipcode" ? (
          <ByZipcode />
        ) : (
          <h1>None</h1>
        )}
        <Footer />
      </div>
    </Provider>
  );
}
