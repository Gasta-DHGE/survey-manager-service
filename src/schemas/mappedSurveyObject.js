import dateInfoSchema from './dateInfoSchema.js';
import questionSchemaResponse from './questionSchemaResponse.js';
import surveyReward from './surveyReward.js';

export default {
  type: 'object',
  properties: {
    uid: { type: 'string' },
    companyId: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    id: { type: 'string' },
    startDate: dateInfoSchema,
    expiringDate: dateInfoSchema,
    surveyInfo: {
      type: 'object',
      properties: {
        creationTimestamp: dateInfoSchema,
        lastModified: dateInfoSchema,
        version: { type: 'number' }
      }
    },
    questions: {
      type: 'object',
      properties: {
        questionAmount: { type: 'number' },
        questionList: {
          type: 'array',
          items: questionSchemaResponse
        }
      }
    },
    reward: surveyReward,
    customField: {
      type: 'object'
    }
  }
};
