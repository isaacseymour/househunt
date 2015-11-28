import { jsdom } from 'jsdom';

export function dom() {
  global.document = jsdom('<html><body></body></html>');
  global.window = global.document.defaultView;
  global.navigator = {
    userAgent: 'node.js',
  };
}

class LatLng {
  constructor(lat, lng) {
    this._lat = lat;
    this._lng = lng;
  }

  lat() {
    return this._lat;
  }
  lng() {
    return this._lng;
  }
  toObject() {
    return { lat: this.lat(), lng: this.lng() };
  }
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
    LatLng,
    TravelMode: { WALKING: "WALKING", TRANSIT: "TRANSIT" },
    DirectionsStatus: { OK: "OK", ZERO_RESULTS: "ZERO_RESULTS" },
    DirectionsService: MockDirectionsService,
  };
}

export function mockGeocoder(response, paramsAssertions) {
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
