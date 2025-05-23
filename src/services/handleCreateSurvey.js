import { StatusCodes } from 'http-status-codes';
import { firestore } from '../firebase/firebase.js';
import mapSurvey from '../mapper/mapSurvey.js';
import mapQuestions from './mapQuestions.js';

export default async function (request, reply) {
  const { companyId } = request.body;
  await checkCompanyExists(companyId, reply);

  const newSurvey = buildNewSurvey(request);

  try {
    const response = await firestore
      .collection('companies')
      .doc(companyId)
      .collection('survey')
      .add(newSurvey);

    const id = response._path.segments.pop();

    await setReference(reply, companyId, id);
    await getSurvey(request, reply, id);
  } catch (error) {
    return reply
      .code(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error);
  }
}

async function getSurvey (request, reply, surveyId) {
  const { companyId } = request.body;

  try {
    const survey = await firestore
      .collection('companies')
      .doc(companyId)
      .collection('survey')
      .doc(surveyId)
      .get();

    if (!survey.exists) {
      return reply
        .code(StatusCodes.NOT_FOUND)
        .send({
          statusCode: StatusCodes.NOT_FOUND,
          message: `the survey with id "${surveyId}" was not found`
        });
    }

    const mappedSurvey = mapSurvey(await survey);

    return reply
      .code(StatusCodes.CREATED)
      .send(mappedSurvey);
  } catch (error) {
    return reply
      .code(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error);
  }
}

async function setReference (reply, companyId, id) {
  try {
    await firestore
      .collection('surveys')
      .doc(id)
      .set({ companyId });
  } catch (error) {
    return reply
      .code(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error);
  }
}

function createNewSurveyInfo () {
  return {
    creationTimestamp: Date.now(),
    lastModified: Date.now(),
    version: 1
  };
}

async function checkCompanyExists (companyId, reply) {
  const companySnapshot = await firestore
    .collection('companies')
    .doc(companyId)
    .get();

  if (companySnapshot.exists === false) {
    return reply
      .code(StatusCodes.BAD_REQUEST)
      .send({
        statusCode: StatusCodes.BAD_REQUEST,
        message: `there is no company with id "${companyId}"`
      });
  }
}

function buildNewSurvey (request) {
  const { uid } = request.headers;
  const { companyId, name, description, startDate, expiringDate, fixedOrder, questions, reward, customField } = request.body;

  const mappedQuestions = mapQuestions(questions);

  const newSurvey = {
    uid,
    surveyInfo: createNewSurveyInfo(),
    companyId,
    name,
    description,
    startDate,
    expiringDate,
    fixedOrder,
    questions: mappedQuestions,
    reward,
    customField
  };

  return newSurvey;
}
