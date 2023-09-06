import { StatusCodes } from 'http-status-codes';
import { firestore } from '../firebase.js';
import mapSurvey from '../mapper/mapSurvey.js';

export default async function (request, reply) {
  const { companyId, surveyId, version: lastVersion } = request.query;

  const surveyRef = firestore
    .collection('companies')
    .doc(companyId)
    .collection('survey')
    .doc(surveyId);

  try {
    const snapshot = await surveyRef.get();

    const { surveyInfo, surveyInfo: { version } } = snapshot.data();

    if (lastVersion !== version) {
      return reply
        .code(StatusCodes.BAD_REQUEST)
        .send({
          statusCode: StatusCodes.BAD_REQUEST,
          message: `the version "${lastVersion}" is not current. Current version: "${version}"`
        });
    }

    return updateSurvey(request, reply, surveyRef, surveyInfo);
  } catch (error) {
    return reply
      .code(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error);
  }
}

async function updateSurvey (request, reply, surveyRef, surveyInfo) {
  const updateBody = getUpdateBody(request.body, surveyInfo);

  try {
    await surveyRef.set(updateBody, { merge: true });
    const updatedSurvey = await surveyRef.get();

    const mappedSurvey = mapSurvey(updatedSurvey);

    return reply
      .code(StatusCodes.CREATED)
      .send(mappedSurvey);
  } catch (error) {
    return reply
      .code(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error);
  }
}

function getUpdateBody (body, surveyInfo) {
  const { name, description, startDate, expiringDate, fixedOrder, questions, customField } = body;

  const updateBody = {};

  if (name !== undefined) {
    updateBody.name = name;
  }
  if (description !== undefined) {
    updateBody.description = description;
  }
  if (startDate !== undefined) {
    updateBody.startDate = startDate;
  }
  if (expiringDate !== undefined) {
    updateBody.expiringDate = expiringDate;
  }
  if (fixedOrder !== undefined) {
    updateBody.fixedOrder = fixedOrder;
  }
  if (questions !== undefined) {
    updateBody.questions = questions;
  }
  if (customField !== undefined) {
    updateBody.customField = customField;
  }

  surveyInfo.version++;
  surveyInfo.lastModified = Date.now();

  updateBody.surveyInfo = surveyInfo;

  return updateBody;
}
