export default {
  type: 'object',
  properties: {
    companyId: { type: 'string', minLength: 20, maxLength: 20 },
    surveyId: { type: 'string', minLength: 20, maxLength: 20 }
  },
  required: ['companyId', 'surveyId']
};
