export default {
  type: 'object',
  properties: {
    questionType: { type: 'string' },
    isOptional: { type: 'boolean' },
    questionText: { type: 'string', minLength: 10 },
    description: { type: 'string' },
    data: {
      type: 'object'
    }
  },
  required: ['questionType', 'isOptional', 'questionText', 'description', 'data']
};
