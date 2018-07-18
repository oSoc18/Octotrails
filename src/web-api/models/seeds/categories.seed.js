import Category from '../category.model';
// @ts-ignore
import mockData from './categories.mock.json';

/**
 * Insert the DB seeds for Category collection
 */
function run() {
  Category.count({}).then(count => {
    if (count === 0) {
      Category.insertMany(mockData)
        .then(_ => console.log('[CATEGORY_SEEDER] Inserted all categories'))
        .catch(err => new Error('[CATEGORY_SEEDER] Error on insertions'));
    }
  });
}

export default {
  run
};