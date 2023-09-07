export default {
  type: 'object',
  properties: {
    questionType: { type: 'string' },
    isOptional: { type: 'boolean' },
    questionText: { type: 'string', minLength: 10 },
    description: { type: 'string' },
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
      required: ['value']
    }
  },
  required: ['questionType', 'isOptional', 'questionText', 'description', 'data']
};
