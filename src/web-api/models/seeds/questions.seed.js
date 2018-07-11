import APIError from '../../helpers/APIError';

import Question from '../questions.model';
import mockData from './questions.mock.json';

/**
 * Insert the DB seeds for Questions collection
 */
function run() {
  Question.insertMany(mockData)
    .then(_ => console.log('[QUESTION_SEEDER] Inserted alll questions'))
    .catch(err => new Error('[QUESTION_SEEDER] Error on insertions'));
}

export default { run };
