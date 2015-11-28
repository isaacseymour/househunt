import { Map } from 'immutable';
import { REQUEST_COMMUTE, POPULATE_COMMUTE, DELETE_COMMUTE } from '../actions/commute';

export const requestCommuteReducer = (commutes, { id }) => commutes.set(id, Map({}));

export const populateCommuteReducer =
  (state, { id, commutes }) => state.mergeIn([id], commutes);

export const deleteCommuteReducer = (commutes, { id }) => commutes.delete(id);

export default function commuteReducer(state = Map(), action) {
  switch(action.type) {
    case REQUEST_COMMUTE:
      return requestCommuteReducer(state, action);
    case POPULATE_COMMUTE:
      return populateCommuteReducer(state, action);
    case DELETE_COMMUTE:
      return deleteCommuteReducer(state, action);

    default:
      return state;
  }
}
