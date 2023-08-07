import { unpackValueTypes } from '../services/utils.js';

export default function (survey) {
  const { uid, surveyInfo, companyId, name, description, customField, startDate, expiringDate, questions } = survey._fieldsProto;

  const mappedCompany = {
    uid: uid.stringValue,
    surveyInfo: getSurveyInfo(surveyInfo),
    id: survey.id,
    companyId: companyId.stringValue,
    name: name.stringValue,
    description: description.stringValue,
    customField: unpackValueTypes(customField),
    startDate: buildDateInfo(startDate.integerValue),
    expiringDate: buildDateInfo(expiringDate.integerValue),
    questions: unpackValueTypes(questions)
  };

  return mappedCompany;
}

function buildDateInfo (timestamp) {
  console.log(timestamp);
  const date = new Date(timestamp * 1000);
  return {
    timestampSeconds: timestamp,
    timestampMilliseconds: timestamp * 1000,
    isoTime: date.toISOString(),
    dateTime: date.toDateString(),
    utcTime: date.toUTCString()
  };
}

function getSurveyInfo (surveyInfo) {
  const { creationTimestamp, lastModified, version } = unpackValueTypes(surveyInfo);

  return {
    creationTimestamp: buildDateInfo(creationTimestamp),
    lastModified: buildDateInfo(lastModified),
    version
  };
}
