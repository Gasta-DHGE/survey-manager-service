import validateApiAccess from '../../services/validateApiAccess.js';

export default async function (fastify, opts) {
  fastify.post('/', async function (request, reply) {
    await validateApiAccess(request, reply);

    return 'create survey';
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
