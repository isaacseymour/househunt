import uuid from 'uuid';

export const ADD_DESTINATION = 'ADD_DESTINATION';
export function addDestination(postcode) {
  return {
    type: ADD_DESTINATION,
    id: uuid.v1(),
    postcode,
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
export function addHouse(url) {
  return {
    type: ADD_HOUSE,
    id: uuid.v1(),
    url,
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
