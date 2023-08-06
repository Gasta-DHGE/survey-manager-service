export default function (survey) {
  const { companyId, name, description, customField, startDate, expiringDate, questions } = survey._fieldsProto;

  console.dir(companyId);
  console.dir(name);
  console.dir(description);
  console.dir(customField);
  console.dir(startDate);
  console.dir(expiringDate);
  console.dir(questions);

  return {};
}
