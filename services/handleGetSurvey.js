import { firestore } from '../firebase.js';
import { StatusCodes } from 'http-status-codes';
import mapSurveys from '../mapper/mapSurveys.js';
import mapMultipleCompanySurveys from '../mapper/mapMultipleCompanySurveys.js';
import mapSurvey from '../mapper/mapSurvey.js';

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

    const companySurveySnapshots = await getCompanySurveyArray(snapshot, uid);

    reply
      .code(StatusCodes.ACCEPTED)
      .send(mapMultipleCompanySurveys(companySurveySnapshots));
  } catch (error) {
    reply
      .code(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error);
  }
}

async function handleGetCompanyBySurveyId (request, reply) {
  const { surveyId } = request.query;

  try {
    const surveyRefSnapshot = await firestore
      .collection('surveys')
      .doc(surveyId)
      .get();

    if (!surveyRefSnapshot.exists) {
      reply
        .code(StatusCodes.NOT_FOUND)
        .send({
          statusCode: StatusCodes.NOT_FOUND,
          message: `the survey with the surveyId: "${surveyId}" was not found`
        });
    }

    const { companyId } = surveyRefSnapshot.data();

    const surveySnapshot = await getSurveySnapshot(reply, companyId, surveyId);

    reply
      .code(StatusCodes.ACCEPTED)
      .send(mapSurvey(surveySnapshot));
  } catch (error) {
    reply
      .code(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error);
  }
}

async function getSurveySnapshot (reply, companyId, surveyId) {
  try {
    const surveyRefSnapshot = await firestore
      .collection('companies')
      .doc(companyId)
      .collection('survey')
      .doc(surveyId)
      .get();

    if (!surveyRefSnapshot.exists) {
      reply
        .code(StatusCodes.NOT_FOUND)
        .send({
          statusCode: StatusCodes.NOT_FOUND,
          message: `survey with surveyId "${surveyId}" was not found at the company with companyId "${companyId}"`
        });
    }

    return surveyRefSnapshot;
  } catch (error) {
    reply
      .code(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error);
  }
}

async function getCompanySurveyArray (companySnapshots, uid) {
  const companyArray = [];
  companySnapshots.forEach((doc) => {
    companyArray.push(doc);
  });

  const companySurveyArray = await Promise.all(companyArray.map(async (company) => {
    const surveySnapshot = await firestore
      .collection('companies')
      .doc(company.id)
      .collection('survey')
      .where('uid', '==', uid)
      .get();

    if (surveySnapshot.empty === true) {
      return [];
    }

    return surveySnapshot;
  }));

  return companySurveyArray;
}
