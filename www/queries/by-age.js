const ByAgeQuery = `
{
  ByAge {
    id,
    AGEGROUP,
    CASERATE,
    HOSPITALIZEDRATE,
    DEATHRATE,
    CASECOUNT,
    HOSPITALIZEDCOUNT,
    DEATHCOUNT,
    date
  }
}
`;

export default ByAgeQuery;
