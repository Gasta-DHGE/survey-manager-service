import { StatusCodes } from 'http-status-codes';
import { firestore } from '../firebase.js';

export default async function (request, reply) {
  const { companyId, surveyId, version: lastVersion } = request.query;
  const { name, description, startDate, expiringDate, fixedOrder, questions, customField } = request.body;

  try {
    const snapshot = await firestore
      .collection('companies')
      .doc(companyId)
      .collection('survey')
      .doc(surveyId)
      .get();

    const { surveyInfo: { version } } = snapshot.data();

    if (lastVersion !== version) {
      reply
        .code(StatusCodes.BAD_REQUEST)
        .send({
          statusCode: StatusCodes.BAD_REQUEST,
          message: `the version "${lastVersion}" is not current. Current version: "${version}"`
        });
    }

    reply
      .code(StatusCodes.ACCEPTED)
      .send(snapshot.data());
  } catch (error) {
    reply
      .code(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error);
  }
}
