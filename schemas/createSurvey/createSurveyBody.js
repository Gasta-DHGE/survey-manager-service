const question = {
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
      items: question
    },
    customField: {
      type: 'object'
    }
  },
  required: ['name', 'description', 'startDate', 'expiringDate', 'fixedOrder', 'questions']
};
