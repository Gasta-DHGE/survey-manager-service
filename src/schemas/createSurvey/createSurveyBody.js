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
    reward: surveyReward,
    questions: {
      type: 'array',
      items: questionSchema
    },
    customField: {
      type: 'object'
    }
  },
  required: ['name', 'description', 'startDate', 'expiringDate', 'fixedOrder', 'reward', 'questions']
};
