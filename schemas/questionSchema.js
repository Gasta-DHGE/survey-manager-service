export default {
  type: 'object',
  required: ['questionType', 'isOptional', 'questionText', 'description'],
  oneOf: [
    {
      properties: {
        questionType: { const: 'text' },
        isOptional: { type: 'boolean' },
        questionText: { type: 'string', minLength: 10 },
        description: { type: 'string' },
        data: { type: 'string' }
      },
      required: ['questionType', 'isOptional', 'questionText', 'description', 'data']
    },
    {
      properties: {
        questionType: { const: 'select' },
        isOptional: { type: 'boolean' },
        questionText: { type: 'string', minLength: 10 },
        description: { type: 'string' },
        data: { type: 'array', items: { type: 'string' } }
      },
      required: ['questionType', 'isOptional', 'questionText', 'description', 'data']
    },
    {
      properties: {
        questionType: { const: 'multiSelect' },
        isOptional: { type: 'boolean' },
        questionText: { type: 'string', minLength: 10 },
        description: { type: 'string' },
        data: { type: 'array', items: { type: 'string' } }
      },
      required: ['questionType', 'isOptional', 'questionText', 'description', 'data']
    },
    {
      properties: {
        questionType: { const: 'numberRating' },
        isOptional: { type: 'boolean' },
        questionText: { type: 'string', minLength: 10 },
        description: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            minRating: { type: 'number' },
            maxRating: { type: 'number' }
          },
          required: ['minRating', 'maxRating']
        }
      },
      required: ['questionType', 'isOptional', 'questionText', 'description', 'data']
    },
    {
      properties: {
        questionType: { const: 'ratingTable' },
        isOptional: { type: 'boolean' },
        questionText: { type: 'string', minLength: 10 },
        description: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            ratingHeader: { type: 'array', items: { type: 'string' } },
            ratingQuestions: { type: 'array', items: { type: 'string' } }
          },
          required: ['ratingHeader', 'ratingQuestions']
        }
      },
      required: ['questionType', 'isOptional', 'questionText', 'description', 'data']
    },
    {
      properties: {
        questionType: { const: 'date' },
        isOptional: { type: 'boolean' },
        questionText: { type: 'string', minLength: 10 },
        description: { type: 'string' }
      },
      required: ['questionType', 'isOptional', 'questionText', 'description']
    },
    {
      properties: {
        questionType: { const: 'time' },
        isOptional: { type: 'boolean' },
        questionText: { type: 'string', minLength: 10 },
        description: { type: 'string' }
      },
      required: ['questionType', 'isOptional', 'questionText', 'description']
    },
    {
      properties: {
        questionType: { const: 'dateAndTime' },
        isOptional: { type: 'boolean' },
        questionText: { type: 'string', minLength: 10 },
        description: { type: 'string' }
      },
      required: ['questionType', 'isOptional', 'questionText', 'description']
    }
  ]
};
// enum QuestionType { text, select, multiSelect }
