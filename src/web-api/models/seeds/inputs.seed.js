import Input from '../input.model';
// @ts-ignore
import mockData from './inputs.mock.json';

/**
 * Insert the DB seeds for Inputs collection
 */
function run() {
  Input.collection.count({}).then(count => {
    if (count === 0) {
      Input.insertMany(mockData)
        .then(_ => console.log('[INPUT_SEEDER] Inserted alll inputs'))
        .catch(err => new Error('[INPUT_SEEDER] Error on insertions'));
    }
  });
}

export default { run };
