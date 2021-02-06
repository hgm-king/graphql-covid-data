import React from "react";
import Select from "react-select";

import { toOption } from "../utils/data-tools";

export default function SelectPrime(props) {
  const { options, selected, onChange, width, label } = props;

  return (
    <div style={{ width: width, padding: 24 }}>
      <label htmlFor={label}>{label}:</label>
      <Select
        options={options.map(toOption)}
        selected={toOption(selected)}
        onChange={onChange}
        styles={{
          container: (provided) => ({
            ...provided,
            width: "100%",
          }),
        }}
      />
    </div>
  );
}
