import React from "react";
import { css } from "@emotion/css";

export default function Footer(props) {
  const footerStyle = css`
    margin-top: 48px;
    border-top: 1px solid black;
  `;

  return (
    <div className={footerStyle}>
      <p style={{ textAlign: "center" }}>
        <a href="https://github.com/nychealth/coronavirus-data">
          Source Data provided by NYC Deptartment of Health
        </a>
        &nbsp;| Calculations and presentation by{" "}
        <a href="https://github.com/HGHimself/graphql-covid-data">HG King</a>
        &nbsp;| Made in Astoria
      </p>
    </div>
  );
}
