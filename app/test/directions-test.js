import { describe } from '../test-lib/main';

import _ from 'lodash';
import directions from '../services/directions';
import { mockDirections } from '../maps';

const from = { lat: 1, lng: 2 };
const to = { lat: 3, lng: 4 };

describe('when directions are found for all travel modes', (t) => {
  t.plan(9);

  const responses = { WALKING: 100, TRANSIT: 100 };

  mockDirections(responses, (params) => {
    console.log('I got called', responses);
    // t.assertEqual(params.origin.lat(), from.lat);
    t.assertEqual(params.origin.lng(), from.lng);
    t.assertEqual(params.destination.lat(), to.lat);
    t.assertEqual(params.destination.lng(), to.lng);
  });

  directions(from, to)
    .then((results) => t.deepEqual(results, responses))
    .catch((e) => { throw e });
});

// describe('when no directions are available', (t) => {
//   t.plan(9);

//   const responses = {
//     WALKING: 'ZERO_RESULTS',
//     TRANSIT: 'ZERO_RESULTS',
//   };

//   mockDirections(responses, (params) => {
//     t.assertEqual(params.origin.lat(), from.lat);
//     t.assertEqual(params.origin.lng(), from.lng);
//     t.assertEqual(params.destination.lat(), to.lat);
//     t.assertEqual(params.destination.lng(), to.lng);
//   });

//   directions(from, to)
//     .then((results) => {
//       t.deepEqual(results, _.mapValues(responses, (value) => `Error: ${value}`));
//     })
//     .catch((e) => { throw e });
// });


// describe('when some directions are available', (t) => {
//   t.plan(9);

//   const responses = {
//     WALKING: 100,
//     TRANSIT: 'ZERO_RESULTS',
//   };

//   mockDirections(responses, (params) => {
//     t.assertEqual(params.origin.lat(), from.lat);
//     t.assertEqual(params.origin.lng(), from.lng);
//     t.assertEqual(params.destination.lat(), to.lat);
//     t.assertEqual(params.destination.lng(), to.lng);
//   });

//   const expectedResults = Object.assign({}, responses, { TRANSIT: 'Error: ZERO_RESULTS' });

//   directions(from, to)
//     .then((results) => t.deepEqual(results, expectedResults))
//     .catch((e) => { throw e });
// });

