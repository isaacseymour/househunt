import { jsdom } from 'jsdom';

export function dom() {
  global.document = jsdom('<html><body></body></html>');
  global.window = global.document.defaultView;
  global.navigator = {
    userAgent: 'node.js',
  };
}

export function mockDirections(responses, paramsAssertions) {
  class MockDirectionsService {
    route(params, callback) {
      paramsAssertions(params);

      const response = responses[params.travelMode];

      if(typeof response === 'string') {
        callback(undefined, response);
      } else {
        callback({ routes: [{ legs: [{ duration: { value: response } }] }] }, "OK");
      }
    }
  }

  return {
    TravelModes: { WALKING: "WALKING", TRANSIT: "TRANSIT" },
    DirectionsStatus: { OK: "OK", ZERO_RESULTS: "ZERO_RESULTS" },
    DirectionsService: MockDirectionsService,
  };
}

export function mockGeocoder(response, paramsAssertions) {
  class LatLng {
    constructor(lat, lng) {
      this.lat = lat;
      this.lng = lng;
    }
  }

  const GeocoderStatus = { ERROR: "ERROR", OK: "OK" };

  class Geocoder {
    geocode(params, callback) {
      paramsAssertions(params);

      if(typeof response === 'object') {
        callback([{ geometry: { location: response } }], GeocoderStatus.OK);
      } else {
        callback(undefined, response);
      }
    }
  }

  return { LatLng, GeocoderStatus, Geocoder };
}
