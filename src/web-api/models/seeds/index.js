import APIError from '../../helpers/APIError';

import QuestionSeeder from './questions.seed';

//
const seeders = [QuestionSeeder];

export default {
  /**
   * Run all DB seeds
   */
  runAll: function runThemAll() {
    seeders.forEach(seeder => {
      if (seeder != undefined && typeof seeder['run'] === 'function')
        throw new APIError(
          `[SEEDER] The provider seeder \'${seeder}\' must be a function`
        );
      seeder['run'].call({});
    });
  }
};
