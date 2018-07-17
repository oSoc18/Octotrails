import APIError from '../../helpers/APIError';

import QuestionSeeder from './questions.seed';
import InputSeeder from './inputs.seed';

//
const seeders = [QuestionSeeder, InputSeeder];

export default {
  /**
   * Run all DB seeds
   */
  populate: function runThemAll() {
    seeders.forEach(seeder => {
      if (seeder != undefined && typeof seeder['run'] !== 'function')
        throw new APIError(
          `[SEEDER] The provider seeder \'${seeder}\' must be a function`
        );
      seeder['run'].call({});
    });
  }
};
