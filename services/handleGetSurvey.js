import { firestore } from '../firebase.js';
import { StatusCodes } from 'http-status-codes';
import mapSurveys from '../mapper/mapSurveys.js';
import mapMultipleCompanySurveys from '../mapper/mapMultipleCompanySurveys.js';

export default async function (request, reply) {
  const { companyId, uid, surveyId } = request.query;

  if (companyId !== undefined) {
    return handleGetSurveyByCompanyId(request, reply);
  } else if (uid !== undefined) {
    return handleGetSurveyByUid(request, reply);
  } else if (surveyId !== undefined) {
    return handleGetCompanyBySurveyId(request, reply);
  } else {
    reply
      .code(StatusCodes.BAD_REQUEST)
      .send({
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'you need to provide one of the 3 resources: companyid, uid, surveyId'
      });
  }
}

async function handleGetSurveyByCompanyId (request, reply) {
  const { companyId } = request.query;

  try {
    const response = await firestore
      .collection('companies')
      .doc(companyId)
      .collection('survey')
      .get();

    if (response.empty) {
      reply
        .code(StatusCodes.OK)
        .send([]);
    }

    reply
      .code(StatusCodes.ACCEPTED)
      .send(mapSurveys(response));
  } catch (error) {
    reply
      .code(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error);
  }
}

async function handleGetSurveyByUid (request, reply) {
  const { uid } = request.query;

  try {
    const snapshot = await firestore
      .collection('companies')
      .where('owner', '==', uid)
      .get();

    if (snapshot.empty) {
      reply
        .code(StatusCodes.OK)
        .send([]);
    }

    const companySurveySnapshots = [];

    for await (const company of snapshot) {
      const surveySnapshot = await firestore
        .collection('companies')
        .doc(company.id)
        .collection('survey')
        .where('uid', '==', uid);

      if (surveySnapshot.empty === false) {
        companySurveySnapshots.push([]);
      }
    }

    reply
      .code(StatusCodes.ACCEPTED)
      .send(mapMultipleCompanySurveys(companySurveySnapshots));
  } catch (error) {
    reply
      .code(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error);
  }

  return 'uid';
}

async function handleGetCompanyBySurveyId (request, reply) {
  return 'surveyId';
}
