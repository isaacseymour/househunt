import directions from '../services/directions';

export const requestCommutesForHouse = (houseId) => (dispatch, getState) => {
  getState().destinations.keySeq()
    .map((destinationId) => addCommute(houseId, destinationId))
    .forEach(dispatch);
};

export const requestCommutesForDestination = (destinationId) => (dispatch, getState) => {
  getState().houses.keySeq()
    .map((houseId) => addCommute(houseId, destinationId))
    .forEach(dispatch);
};

export const POPULATE_COMMUTE = 'POPULATE_COMMUTE';
const populateCommute = (houseId, destinationId) => (commutes) => ({
  type: POPULATE_COMMUTE,
  houseId,
  destinationId,
  commutes,
});

export const addCommute = (houseId, destinationId) => (dispatch, getState) => {
  const state = getState();
  const house = state.houses.get(houseId);
  const destination = state.destinations.get(destinationId);

  const from = { lat: house.get('lat'), lng: house.get('lng') };
  const to = { lat: destination.get('lat'), lng: destination.get('lng') };

  directions(from, to).then(populateCommute(houseId, destinationId)).then(dispatch);

  return {};
};
