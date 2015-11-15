import test from 'tape';
import _ from 'lodash';
import directions from '../services/directions';
import { mockDirections } from './helpers';

function mockGoogle(responses, paramsAssertions) {
  const apis = mockDirections(responses, paramsAssertions);
  return { maps: apis };
}

const from = 'from', to = 'to';

test('when directions are found for all travel modes', (t) => {
  t.plan(5);

  const responses = { WALKING: 100, TRANSIT: 100 };

  const google = mockGoogle(responses, (params) => {
    t.equal(params.origin, from);
    t.equal(params.destination, to);
  });

  directions(google, from, to)
    .then((results) => t.deepEqual(results, responses))
    .catch(t.fail);
});

test('when no directions are available', (t) => {
  t.plan(5);

  const responses = {
    WALKING: 'ZERO_RESULTS',
    TRANSIT: 'ZERO_RESULTS',
  };

  const google = mockGoogle(responses, (params) => {
    t.equals(params.origin, from);
    t.equals(params.destination, to);
  });

  directions(google, from, to)
    .then((results) => {
      t.deepEqual(results, _.mapValues(responses, (value) => `Error: ${value}`));
    })
    .catch(t.fail);
});


test('when some directions are available', (t) => {
  t.plan(5);

  const responses = {
    WALKING: 100,
    TRANSIT: 'ZERO_RESULTS',
  };

  const google = mockGoogle(responses, (params) => {
    t.equals(params.origin, from);
    t.equals(params.destination, to);
  });

  const expectedResults = Object.assign({}, responses, { TRANSIT: 'Error: ZERO_RESULTS' });

  directions(google, from, to)
    .then((results) => t.deepEqual(results, expectedResults))
    .catch(t.fail);
});

