import https from 'https';

// function list(req, res, next) {
//   const { limit = 50, skip = 0, name } = req.query;

//   Stop.list({ limit, skip, name })
//     .then(stops => res.json(stops))
//     .catch(e => next(e));
// }

const STIB_API = process.env.STIB_API;

function search(req, res) {
  let by = req.query.by;
  let term = req.query.term;

  https.get(STIB_API + '/stops/proximity/1,1', function (respApi) {
    let apiData = '';

    // A chunk of data has been recieved.
    respApi.on('data', (chunk) => apiData += chunk);

    // The whole response has been received. Print out the result.
    respApi.on('end', () => {
      return res.json(
        JSON.parse(apiData)
      )
    });
  });
}

export default {
  search
};
