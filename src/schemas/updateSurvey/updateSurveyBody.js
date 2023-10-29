import questionSchema from '../questionSchema.js';
import surveyReward from '../surveyReward.js';

export default {
  type: 'object',
  properties: {
    companyId: { type: 'string', minLength: 20, maxLength: 20 },
    name: { type: 'string', minLength: 10 },
    description: { type: 'string', minLength: 10 },
    startDate: { type: 'number' },
    expiringDate: { type: 'number' },
    fixedOrder: { type: 'boolean' },
    questions: {
      type: 'array',
      items: questionSchema
    },
    reward: surveyReward,
    customField: {
      type: 'object'
    }
  }
};
