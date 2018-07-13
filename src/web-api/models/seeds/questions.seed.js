import APIError from '../../helpers/APIError';

import Question from '../question.model';
// @ts-ignore
import mockData from './questions.mock.json';

/**
 * Insert the DB seeds for Questions collection
 */
function run() {
  Question.count({}).then(count => {
    if (count === 0) {
      Question.insertMany(mockData)
        .then(_ => console.log('[QUESTION_SEEDER] Inserted alll questions'))
        .catch(err => new Error('[QUESTION_SEEDER] Error on insertions'));
    }
  });
}

export default { run };
