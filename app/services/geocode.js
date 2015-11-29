import { Geocoder, GeocoderStatus } from '../maps';

const geocoder = new Geocoder();

// Returns a promise which resolves to a LatLng
export default function geocode(address) {
  return new Promise((resolve, reject) => {
    geocoder.geocode({ address }, (results, status) => {
      if(status === GeocoderStatus.OK) {
        resolve(results[0].geometry.location);
      } else {
        reject(`Google returned error ${status}`);
      }
    });
  });
}
