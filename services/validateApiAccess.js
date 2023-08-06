import { StatusCodes } from 'http-status-codes';
import { auth } from '../firebase.js';

export default async function (request, reply) {
  if (request.headers['gasta-dhge'] !== 'cb041321-b510-45ca-9bd6-748b957b83da') {
    reply
      .code(StatusCodes.UNAUTHORIZED)
      .send({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'you did not provide a valid api key'
      });
  }

  if (request.headers.uid === undefined) {
    reply
      .code(StatusCodes.UNAUTHORIZED)
      .send({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'you did not provide a valid uid'
      });
  } else {
    try {
      const uid = request.headers.uid;

      await auth.getUser(uid);
    } catch (error) {
      reply
        .code(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: 'something went wrong while user verification',
          error
        });
    }
  }
}
