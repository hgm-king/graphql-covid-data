import React from "react";
import Select from "react-select";

import { toOption } from "../utils/data-tools";

export default function SelectPrime(props) {
  const { options, selected, onChange, width, label } = props;

  const optionsMapped = options.map(toOption);

  return (
    <div style={{ width: width, padding: 24 }}>
      {label && <label htmlFor={label}>{label}:</label>}
      <Select
        options={optionsMapped}
        defaultValue={optionsMapped[0]}
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
