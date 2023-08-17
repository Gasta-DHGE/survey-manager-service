import handleCreateSurvey from '../../services/handleCreateSurvey.js';
import validateApiAccess from '../../services/validateApiAccess.js';
import createSurveyBody from '../../schemas/createSurvey/createSurveyBody.js';
import createSurveyHeader from '../../schemas/createSurvey/createSurveyHeader.js';
import createSurveyResponse from '../../schemas/createSurvey/createSurveyResponse.js';
import handleGetSurvey from '../../services/handleGetSurvey.js';
import getSurveyQuery from '../../schemas/getSurvey/getSurveyQuery.js';
import getSurveyResponse from '../../schemas/getSurvey/getSurveyResponse.js';
import handleUpdateSurvey from '../../services/handleUpdateSurvey.js';
import updateSurveyQuery from '../../schemas/updateSurvey/updateSurveyQuery.js';
import updateSurveyBody from '../../schemas/updateSurvey/updateSurveyBody.js';
import handleDeleteSurvey from '../../services/handleDeleteSurvey.js';
import deleteSurveyQuery from '../../schemas/deleteSurvey/deleteSurveyQuery.js';

export default async function (fastify, opts) {
  fastify.post('/', { schema: { body: createSurveyBody, header: createSurveyHeader, response: createSurveyResponse } }, async function (request, reply) {
    await validateApiAccess(request, reply);

    return handleCreateSurvey(request, reply);
  });

  fastify.get('/', { schema: { querystring: getSurveyQuery, response: getSurveyResponse } }, async function (request, reply) {
    await validateApiAccess(request, reply);

    return handleGetSurvey(request, reply);
  });

  fastify.put('/', { schema: { body: updateSurveyBody, querystring: updateSurveyQuery, response: createSurveyResponse } }, async function (request, reply) {
    await validateApiAccess(request, reply);

    return handleUpdateSurvey(request, reply);
  });

  fastify.delete('/', { schema: { querystring: deleteSurveyQuery } }, async function (request, reply) {
    await validateApiAccess(request, reply);

    return handleDeleteSurvey(request, reply);
  });
}
