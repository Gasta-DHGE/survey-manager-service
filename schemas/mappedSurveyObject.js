import dateInfoSchema from './dateInfoSchema.js';
import questionSchema from './questionSchema.js';

export default {
  type: 'object',
  properties: {
    uid: { type: 'string' },
    companyId: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
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
          items: questionSchema
        }
      }
    },
    customField: {
      type: 'object'
    }
  }
};
