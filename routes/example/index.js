import validateApiAccess from '../../services/validateApiAccess.js';

export default async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    await validateApiAccess(request, reply);

    return 'if you can reach this endpoint you can start develop!';
  });
}
