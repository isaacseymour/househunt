import uuid from 'uuid';
import geocode from './services/geocode';
import fetch from 'isomorphic-fetch';

export const ADD_DESTINATION = 'ADD_DESTINATION';
export function requestDestination(id, postcode) {
  return {
    type: ADD_DESTINATION,
    id,
    postcode,
  };
}

export function addDestination(google, postcode) {
  const id = uuid.v1();

  return (dispatch) => {
    dispatch(requestDestination(id, postcode));

    geocode(google, postcode)
      .then((data) => dispatch(updateDestinationData(id, data.lat(), data.lng())));
  };
}

export const DELETE_DESTINATION = 'DELETE_DESTINATION';
export function deleteDestination(id) {
  return {
    type: DELETE_DESTINATION,
    id,
  };
}

export const ADD_HOUSE = 'ADD_HOUSE';
export function requestHouse(id, url) {
  return {
    type: ADD_HOUSE,
    id,
    url,
  };
}

export function addHouse(url) {
  const id = uuid.v1();

  return (dispatch) => {
    dispatch(requestHouse(id, url));

    fetch('/crawl', {
      method: 'POST',
      body: JSON.stringify({ crawlUrl: url }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((r) => r.json())
    .then((response) => {
      console.log('add house response', response);
      if(response.error !== undefined) throw response;

      dispatch(updateHouseData(id, response.address));
    })
    .catch((error) => {
      console.log('add house error', error);
      // TODO: tell the user what's wrong somehow
      dispatch(deleteHouse(id));
    });
  };
}

export const DELETE_HOUSE = 'DELETE_HOUSE';
export function deleteHouse(id) {
  return {
    type: DELETE_HOUSE,
    id,
  };
}

export const UPDATE_HOUSE_DATA = 'UPDATE_HOUSE_DATA';
export function updateHouseData(id, address, imageUrl) {
  return {
    type: UPDATE_HOUSE_DATA,
    id,
    address,
    imageUrl,
  };
}

export const UPDATE_DESTINATION_DATA = 'UPDATE_DESTINATION_DATA';
export function updateDestinationData(id, lat, lng) {
  return {
    type: UPDATE_DESTINATION_DATA,
    id,
    lat,
    lng,
  };
}
