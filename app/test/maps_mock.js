export const GeocoderStatus = { ERROR: "ERROR", OK: "OK", OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT" };

export class LatLng {
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

let directionsParamsAssertions;
let directionsResponses;

export class DirectionsService {
  route(params, callback) {
    directionsParamsAssertions(params);

    const response = directionsResponses[params.travelMode];

    if(typeof response === 'string') {
      callback(undefined, response);
    } else {
      callback({ routes: [{ legs: [{ duration: { value: response } }] }] }, "OK");
    }
  }
}

let geocoderParamsAssertions;
let geocoderResponse;

export class Geocoder {
  geocode(params, callback) {
    geocoderParamsAssertions(params);

    if(typeof geocoderResponse === 'object') {
      callback([{ geometry: { location: geocoderResponse } }], GeocoderStatus.OK);
    } else {
      callback(undefined, geocoderResponse);
    }
  }
}

export function mockDirections(responses, paramsAssertions) {
  directionsResponses = responses;
  directionsParamsAssertions = paramsAssertions;
}

export function mockGeocoder(response, paramsAssertions) {
  geocoderResponse = response;
  geocoderParamsAssertions = paramsAssertions;
}

export function clearMocks() {
  mockDirections([], () => {});
  mockGeocoder(new LatLng(51, 0.5), () => {});
}

clearMocks();

export const TravelMode = { WALKING: "WALKING", TRANSIT: "TRANSIT" };
export const DirectionsStatus = { OK: "OK", ZERO_RESULTS: "ZERO_RESULTS" };
