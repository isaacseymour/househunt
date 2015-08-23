export const ADD_DESTINATION = 'ADD_DESTINATION';
export function addDestination(postcode) {
  return {
    type: ADD_DESTINATION,
    postcode,
  };
}
