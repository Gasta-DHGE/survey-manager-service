import { StatusCodes } from 'http-status-codes';
import { firestore } from '../firebase.js';

export default async function (request, reply) {
  const { companyId, surveyId } = request.query;

  try {
    firestore
      .collection('companies')
      .doc(companyId)
      .collection('survey')
      .doc(surveyId)
      .delete();

    reply
      .code(StatusCodes.OK)
      .send(`survey with id "${surveyId}" was deleted`);
  } catch (error) {
    reply
      .code(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error);
  }
}
