import { unpackValueTypes } from '../services/utils.js';

export default function (survey) {
  const unpackedSurvey = survey.data();

  const { uid, surveyInfo, companyId, name, description, customField, startDate, expiringDate, questions, fixedOrder } = unpackedSurvey;

  const mappedCompany = {
    uid,
    surveyInfo,
    id: survey.id,
    companyId,
    name,
    description,
    customField,
    startDate: buildDateInfo(startDate),
    expiringDate: buildDateInfo(expiringDate),
    questions: {
      questionList: questions,
      fixedOrder
    }
  };

  return mappedCompany;
}

function buildDateInfo (timestamp) {
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
