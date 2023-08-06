export default {
  type: 'object',
  properties: {
    uid: { type: 'string', minLength: 28, maxLength: 28 }
  },
  required: ['uid']
};
