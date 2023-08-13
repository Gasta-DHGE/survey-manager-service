import mapSurveys from './mapSurveys.js';

export default function (companySurveySnapshots) {
  let mappedCompanies = [];

  companySurveySnapshots.forEach(surveySnapshot => {
    const mappedSurveySnapshot = mapSurveys(surveySnapshot);

    mappedCompanies = mappedCompanies.concat(mappedSurveySnapshot);
  });

  return mappedCompanies;
}
