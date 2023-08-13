import { StatusCodes } from 'http-status-codes';
import { firestore } from '../firebase.js';
import mapSurvey from '../mapper/mapSurvey.js';

export default async function (request, reply) {
  const { uid } = request.headers;
  const { companyId, name, description, startDate, expiringDate, fixedOrder, questions, customField } = request.body;

  const newSurvey = {
    uid,
    surveyInfo: createNewSurveyInfo(),
    companyId,
    name,
    description,
    startDate,
    expiringDate,
    fixedOrder,
    questions,
    customField
  };

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
    reply
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

    console.log(survey);

    if (!survey.exists) {
      reply
        .code(StatusCodes.NOT_FOUND)
        .send({
          statusCode: StatusCodes.NOT_FOUND,
          message: `the survey with id "${surveyId}" was not found`
        });
    }

    const mappedSurvey = mapSurvey(await survey);

    reply
      .code(StatusCodes.CREATED)
      .send(mappedSurvey);
  } catch (error) {
    reply
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
    reply
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
