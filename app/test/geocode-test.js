import test from 'tape';
import geocode from '../services/geocode';
import { mockGeocoder } from './helpers';

function mockGoogle(response, paramsAssertions) {
  return { maps: mockGeocoder(response, paramsAssertions) };
}

test('when the Google API responds normally', (t) => {
  t.plan(3);

  const address = 'Some place';
  const google = mockGoogle({ lat: 0.5, lng: 20.3 },
                            (params) => t.equal(params.address, address));

  geocode(google, address).then((result) => {
    t.equal(result.lat, 0.5);
    t.equal(result.lng, 20.3);
  });
});

test('when the Google API errors', (t) => {
  t.plan(2);

  const address = 'Some bad place';
  const google = mockGoogle('ERROR', (params) => t.equal(params.address, address));

  geocode(google, address)
    .catch((error) => t.equal(error, `Google returned error ERROR`));
});
