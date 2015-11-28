import _ from 'lodash';
import directions from '../services/directions';

export const updateCommutes = (dispatch, getState) => {
  const state = getState();

  const houseIds = Array.from(state.houses.keys());
  const destinationIds = Array.from(state.destinations.keys());
  const knownCommutes = Array.from(state.commutes.keys());

  const desiredCommutes = destinationIds
    .map((destinationId) => houseIds.map((houseId) => `${houseId}.${destinationId}`))
    .reduce((acc, commuteIds) => acc.concat(commuteIds), []);

  const requiredCommutes = _.difference(desiredCommutes, knownCommutes);
  const deadCommutes = _.difference(knownCommutes, desiredCommutes);

  deadCommutes.map(deleteCommute).forEach(dispatch);

  requiredCommutes
    .map((id) => {
      const [houseId, destinationId] = id.split('.');

      return addCommute(
        id,
        state.houses.get(houseId),
        state.destinations.get(destinationId)
      );
    })
    .forEach(dispatch);

  return {};
};

export const addCommute = (id, house, destination) => (dispatch) => {
  const from = { lat: house.get('lat'), lng: house.get('lng') },
        to   = { lat: destination.get('lat'), lng: destination.get('lng') };

  directions(google, from, to).then(populateCommute(id)).then(dispatch);

  return {};
};

export const REQUEST_COMMUTE = 'REQUEST_COMMUTE';
export const requestCommute = (id) => ({ type: REQUEST_COMMUTE, id });

export const POPULATE_COMMUTE = 'POPULATE_COMMUTE';
export const populateCommute = (id) => (commutes) => ({
  type: POPULATE_COMMUTE,
  id,
  commutes,
});

export const DELETE_COMMUTE = 'DELETE_COMMUTE';
export const deleteCommute = (id) => ({ type: DELETE_COMMUTE, id });
