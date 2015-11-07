export const ADD_DESTINATION = 'ADD_DESTINATION';
export function addDestination(postcode) {
  return {
    type: ADD_DESTINATION,
    postcode,
  };
}

export const DELETE_DESTINATION = 'DELETE_DESTINATION';
export function deleteDestination(uuid) {
  return {
    type: DELETE_DESTINATION,
    uuid,
  };
}

export const ADD_HOUSE = 'ADD_HOUSE';
export function addHouse(url) {
  return {
    type: ADD_HOUSE,
    url,
  };
}

export const UPDATE_HOUSE_DATA = 'UPDATE_HOUSE_DATA';
export function updateHouseData(url, address) {
  return {
    type: UPDATE_HOUSE_DATA,
    url,
    address
  };
}
