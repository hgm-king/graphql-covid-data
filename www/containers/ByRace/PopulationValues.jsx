import React from "react";

import PieChart from "../../components/charts/PieChart";
import FlexRow from "../../components/FlexRow";

import theme from "../../theme"

export default function PopulationValues(props) {
  const { data, field, index, keys, total } = props;



  // adding another slice here
  const dataWithTotal = data.concat({
    [index]: "Total",
    [field]: total
  })


  const makePopulationSection = (d, i) => (
        <div key={i} style={{marginLeft: 16}}>
          <h6>{d[index]}</h6>
          <p>~{Math.floor(d[field]).toLocaleString("en")} people ({((100 * d[field]) / total).toFixed(1)}%)</p>
        </div>
  );

  return (
    <>
      <FlexRow flex='flex-start'>
        <PieChart
          data={data}
          keys={keys}
          valueEliminator={(d) => d[field]}
          labelEliminator={d => d[index]}
          width={500}
          height={500}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors={theme.palettes.DataVizPalette}
          backgroundColor={"#f5f2e3"}
          backgroundRadius={14}
        />
        <FlexRow direction='column' flex='space-between'>
          {dataWithTotal.map(makePopulationSection)}
        </FlexRow>
      </FlexRow>
    </>
  );
}
