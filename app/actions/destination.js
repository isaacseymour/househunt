import uuid from 'uuid';
import geocode from '../services/geocode';
import { updateCommutes } from './commute';

export const ADD_DESTINATION = 'ADD_DESTINATION';
export const requestDestination = (id, postcode) => ({
  type: ADD_DESTINATION,
  id,
  postcode,
});

export const addDestination = (google, postcode) => (dispatch) => {
  const id = uuid.v1();

  dispatch(requestDestination(id, postcode));

  geocode(google, postcode)
    .then((data) => dispatch(updateDestinationData(id, data.lat(), data.lng())))
    .then(() => dispatch(updateCommutes));
};

export const UPDATE_DESTINATION_DATA = 'UPDATE_DESTINATION_DATA';
export const updateDestinationData = (id, lat, lng) => ({
  type: UPDATE_DESTINATION_DATA,
  id,
  lat,
  lng,
});

export const DELETE_DESTINATION = 'DELETE_DESTINATION';
export const deleteDestination = (id) => (dispatch) => {
  dispatch({
    type: DELETE_DESTINATION,
    id,
  });

  dispatch(updateCommutes);
};
