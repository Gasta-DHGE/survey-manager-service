import { StatusCodes } from 'http-status-codes';
import { firestore } from '../firebase.js';
import mapSurvey from '../mapper/mapSurvey.js';

export default async function (request, reply) {
  const { companyId, name, description, startDate, expiringDate, fixedOrder, questions, customField } = request.body;

  const newSurvey = {
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

    console.dir(response);

    return getSurvey(request, reply, response);
  } catch (error) {
    reply
      .code(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error);
  }
}

async function getSurvey (request, reply, firebaseResponse) {
  const { companyId } = request.body;
  const surveyId = firebaseResponse._path.segments.pop();

  try {
    const survey = await firestore
      .collection('companies')
      .doc(companyId)
      .collection('survey')
      .get(surveyId);

    if (!survey.exists) {
      reply
        .code(StatusCodes.NOT_FOUND)
        .send({
          statusCode: StatusCodes.NOT_FOUND,
          message: `the survey with id ${surveyId} was not found`
        });
    }

    const mappedSurvey = mapSurvey(survey);

    reply
      .code(StatusCodes.CREATED)
      .send(mappedSurvey);
  } catch (error) {
    reply
      .code(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error);
  }
}
