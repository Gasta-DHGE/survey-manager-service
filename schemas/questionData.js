export default {
  type: 'object',
  required: ['value'],
  oneOf: [
    {
      properties: {
        value: { type: 'string' }
      },
      required: ['value']
    },
    {
      properties: {
        value: { type: 'number' }
      },
      required: ['value']
    },
    {
      properties: {
        value: { type: 'boolean' }
      },
      required: ['value']
    }
  ]
};
