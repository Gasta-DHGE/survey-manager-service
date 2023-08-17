import mappedSurveyObject from '../mappedSurveyObject.js';

export default {
  '2xx': {
    oneOf: [
      mappedSurveyObject,
      {
        type: 'array',
        items: mappedSurveyObject
      }
    ]
  }
};
