import uuid from 'uuid';
import fetch from 'isomorphic-fetch';
import geocode from '../services/geocode';
import { requestCommutesForHouse } from './commute';

export const addHouse = (url) => (dispatch) => {
  const id = uuid.v1();

  dispatch(requestHouse(id, url));

  const crawlArgs = {
    method: 'POST',
    body: JSON.stringify({ crawlUrl: url }),
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
  };

  fetch('/crawl', crawlArgs)
    .then((r) => r.json())
    .then((response) => {
      console.log('add house response', response);
      if(response.error !== undefined) throw response;

      const { address, imageUrl } = response;
      dispatch(updateHouseData(id, { address, imageUrl }));

      return geocode(address);
    })
    .then((location) => ({ lat: location.lat(), lng: location.lng() }))
    .then((location) => updateHouseData(id, location))
    .then(dispatch)
    .then(() => requestCommutesForHouse(id))
    .then(dispatch)
    .catch((error) => {
      console.warn('add house error', error);
      // TODO: tell the user what's wrong somehow
      dispatch(deleteHouse(id));
    });
};

export const REQUEST_HOUSE = 'REQUEST_HOUSE';
export const requestHouse = (id, url) => ({ type: REQUEST_HOUSE, id, url });

export const DELETE_HOUSE = 'DELETE_HOUSE';
export const deleteHouse = (id) => ({ type: DELETE_HOUSE, id });

export const UPDATE_HOUSE_DATA = 'UPDATE_HOUSE_DATA';
export const updateHouseData = (id, data) => {
  return Object.assign({ type: UPDATE_HOUSE_DATA, id }, data);
};

