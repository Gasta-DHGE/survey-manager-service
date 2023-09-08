export default {
  type: 'object',
  properties: {
    questionType: { type: 'string' },
    isOptional: { type: 'boolean' },
    questionText: { type: 'string', minLength: 10 },
    description: { type: 'string' },
    questionId: { type: 'string' },
    data: {
      type: 'object',
      properties: {
        value: {
          type: ['null', 'number', 'boolean', 'array', 'string'],
          items: {
            oneOf: [
              { type: 'string' },
              { type: 'number' },
              { type: 'boolean' }
            ]
          }
        }
      },
      required: []
    }
  },
  required: ['questionType', 'isOptional', 'questionText', 'description', 'data']
};
