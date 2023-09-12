import questionData from './questionData.js';

export default {
  type: 'object',
  properties: {
    questionType: { type: 'string' },
    isOptional: { type: 'boolean' },
    questionText: { type: 'string', minLength: 10 },
    description: { type: 'string' },
    data: questionData
  },
  required: ['questionType', 'isOptional', 'questionText', 'description', 'data']
};
