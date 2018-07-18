import APIError from '../../helpers/APIError';

import QuestionSeeder from './questions.seed';
import InputSeeder from './inputs.seed';
import CategorySeeder from './categories.seed';

//
const seeders = [QuestionSeeder, InputSeeder,CategorySeeder];

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
