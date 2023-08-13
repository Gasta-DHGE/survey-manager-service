import mapSurvey from './mapSurvey.js';

export default function (rawSurveys) {
  const mappedSurveys = [];

  rawSurveys.forEach(rawSurvey => {
    const mappedSurvey = mapSurvey(rawSurvey);
    mappedSurveys.push(mappedSurvey);
  });

  return mappedSurveys;
}
