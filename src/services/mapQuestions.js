import uniqid from 'uniqid';

export default function (questions) {
  return questions.map(question => {
    const { isOptional, questionType, questionText, description, data } = question;

    const mappedQuestion = {
      isOptional,
      questionType,
      questionText,
      description,
      questionId: uniqid('gasta-')
    };

    if (data !== undefined) {
      mappedQuestion.data = data;
    }

    return mappedQuestion;
  });
}
