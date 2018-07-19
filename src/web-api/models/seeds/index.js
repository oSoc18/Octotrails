import APIError from '../../helpers/APIError';

import QuestionSeeder from './questions.seed';
import InputSeeder from './inputs.seed';
import CategorySeeder from './categories.seed';
import HistorySeeder from './histories.seed';

//
const seeders = [QuestionSeeder, InputSeeder, CategorySeeder, HistorySeeder];

export default {
  /**
   * Run all DB seeds
   */
  populate: function runThemAll() {
    for (const seeder of seeders) {
      if (seeder != undefined && typeof seeder['run'] !== 'function') {
        throw new APIError(
          `[SEEDER] The seeder \'${seeder}\' must be implement 'run' function`
        );
      }
      try {
        seeder['run'].call({});
      } catch (err) {
        console.error(err);
      }
    }
  }
};
