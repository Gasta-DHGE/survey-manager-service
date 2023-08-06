import handleCreateSurvey from '../../services/handleCreateSurvey.js';
import validateApiAccess from '../../services/validateApiAccess.js';
import createSurveyBody from '../../schemas/createSurvey/createSurveyBody.js';
import createSurveyHeader from '../../schemas/createSurvey/createSurveyHeader.js';

export default async function (fastify, opts) {
  fastify.post('/', { schema: { body: createSurveyBody, header: createSurveyHeader } }, async function (request, reply) {
    await validateApiAccess(request, reply);

    return handleCreateSurvey(request, reply);
  });

  fastify.get('/', async function (request, reply) {
    await validateApiAccess(request, reply);

    return 'get survey';
  });

  fastify.put('/', async function (request, reply) {
    await validateApiAccess(request, reply);

    return 'update survey';
  });

  fastify.delete('/', async function (request, reply) {
    await validateApiAccess(request, reply);

    return 'delete survey';
  });
}
