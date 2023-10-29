import path from 'path';
import AutoLoad from '@fastify/autoload';
import swagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const options = {};

export default async function (fastify, opts) {
  fastify.register(swagger, {});
  fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'My FirstAPP Documentation',
        description: 'My FirstApp Backend Documentation description',
        version: '0.1.0',
        termsOfService: 'https://mywebsite.io/tos',
        contact: {
          name: 'John Doe',
          url: 'https://www.johndoe.com',
          email: 'john.doe@email.com'
        }
      },
      externalDocs: {
        url: 'https://www.johndoe.com/api/',
        description: 'Find more info here'
      },
      host: '127.0.0.1:3000',
      basePath: '',
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [{
        name: 'User',
        description: 'User\'s API'
      }],
      definitions: {
        User: {
          type: 'object',
          required: ['id', 'email'],
          properties: {
            id: {
              type: 'number',
              format: 'uuid'
            },
            firstName: {
              type: 'string'
            },
            lastName: {
              type: 'string'
            },
            email: {
              type: 'string',
              format: 'email'
            }
          }
        }
      }
    },
    uiConfig: {
      docExpansion: 'none',
      deepLinking: true
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      }
    },
    staticCSP: false,
    transformStaticCSP: (header) => header,
    exposeRoute: true
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  });
}
