const SummaryQuery = `
{
  DataByDay {
    id,
    dateOfInterest,
    CASECOUNT,
    HOSPITALIZEDCOUNT,
    DEATHCOUNT
  }
}
`;
export default SummaryQuery;
