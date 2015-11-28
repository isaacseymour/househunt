import { Map } from 'immutable';
import {
  ADD_DESTINATION,
  DELETE_DESTINATION,
  UPDATE_DESTINATION_DATA,
} from '../actions/destination';

export const addDestinationReducer = (destinations, { id, postcode }) =>
  destinations.set(id, Map({ postcode }));

export const deleteDestinationReducer = (destinations, { id }) => destinations.delete(id);

export const updateDestinationDataReducer = (destinations, { id, lat, lng }) =>
  destinations.mergeIn([id], { lat, lng });

export default function destinationReducer(state = Map(), action) {
  switch(action.type) {
    case ADD_DESTINATION:
      return addDestinationReducer(state, action);
    case UPDATE_DESTINATION_DATA:
      return updateDestinationDataReducer(state, action);
    case DELETE_DESTINATION:
      return deleteDestinationReducer(state, action);

    default:
      return state;
  }
}
