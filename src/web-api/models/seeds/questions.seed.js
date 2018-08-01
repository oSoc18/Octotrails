import APIError from '../../helpers/APIError';

import Question from '../question.model';
// @ts-ignore
import mockData from './questions.mock.json';

/**
 * Insert the DB seeds for Questions collection
 */
function run() {
  Question.collection.count({}).then(count => {
    if (count === 0) {
      Question.insertMany(mockData)
        .then(_ => console.log('[QUESTION_SEEDER] Inserted all questions'))
        .catch(err => new Error('[QUESTION_SEEDER] Error on insertions'));
    }
  });
}

export default { run };
