import { unpackValueTypes } from '../services/utils.js';

export default function (survey) {
  const { uid, surveyInfo, companyId, name, description, customField, startDate, expiringDate, fixedOrder, questions } = survey._fieldsProto;

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
    questions: getQuestions(questions, fixedOrder)
  };

  return mappedCompany;
}

function buildDateInfo (timestamp) {
  console.log(timestamp);
  const date = new Date(timestamp * 1000);
  return {
    timestampSeconds: parseInt(timestamp),
    timestampMilliseconds: parseInt(timestamp * 1000),
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
    version: parseInt(version)
  };
}

function getQuestions (questions, fixedOrder) {
  const mappedQuestions = unpackValueTypes(questions);

  return {
    fixedOrder: fixedOrder.booleanValue,
    questionList: mappedQuestions,
    questionAmount: mappedQuestions.length
  };
}
