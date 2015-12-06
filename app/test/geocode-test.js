import { describe } from '../test-lib/main';
import geocode from '../services/geocode';
import { LatLng, mockGeocoder } from '../maps';

describe('when the Google API responds normally', (t) => {
  t.plan(3);

  const address = 'Some place';
  mockGeocoder(new LatLng(0.5, 20.3),
               (params) => t.equal(params.address, address));

  geocode(address)
    .then((result) => {
      t.equal(result.lat(), 0.5);
      t.equal(result.lng(), 20.3);
    })
    .catch(t.fail);
});

describe('when the Google API errors', (t) => {
  t.plan(2);

  const address = 'Some bad place';
  mockGeocoder('ERROR', (params) => t.equal(params.address, address));

  geocode(address).catch((error) => t.equal(error, `Google returned error ERROR`));
});
