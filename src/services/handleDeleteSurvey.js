import { StatusCodes } from 'http-status-codes';
import { firestore } from '../firebase/firebase.js';

export default async function (request, reply) {
  const { companyId, surveyId } = request.query;

  try {
    firestore
      .collection('companies')
      .doc(companyId)
      .collection('survey')
      .doc(surveyId)
      .delete();

    firestore
      .collection('surveys')
      .doc(surveyId)
      .delete();

    return reply
      .code(StatusCodes.OK)
      .send(`survey with id "${surveyId}" was deleted`);
  } catch (error) {
    return reply
      .code(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error);
  }
}
