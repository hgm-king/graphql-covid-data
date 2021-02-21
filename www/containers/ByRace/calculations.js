export const getTrend = (getIndex, getField) => (row, i, data) => {
  const yesterday = data[i - 1];
  const index = getIndex(row);

  const hasTrend = yesterday && index === getIndex(yesterday);

  const value = getField(row) !== null ? getField(row) : 0;
  const yesterdayValue =
    yesterday && getField(yesterday) ? getField(yesterday) : 1;

  const trend = hasTrend ? value - yesterdayValue : 0;
  const rate = hasTrend ? (trend / yesterdayValue) * 100 : 0;

  return {
    index,
    trend,
    value,
    rate,
    date: row.date,
  };
};

export const getPopulationFromRate = (d) => {
  d.TOTALPOPCASE = (d.CASECOUNT * 100000) / d.CASERATEADJ;
  d.TOTALPOPHOSP = (d.HOSPITALIZEDCOUNT * 100000) / d.HOSPITALIZEDRATEADJ;
  d.TOTALPOPDEATH = (d.DEATHCOUNT * 100000) / d.DEATHRATEADJ;
  return d;
};
