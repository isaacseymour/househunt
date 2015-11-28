import test from 'tape';
import uuid from 'uuid';
import { Map } from 'immutable';

import {
  requestDestination,
  deleteDestination,
  updateDestinationData,
} from '../actions/destination';
import { requestHouse, deleteHouse, updateHouseData } from '../actions/house';

import reducer from '../reducers';

test('adding destination', (t) => {
  const initState = { destinations: Map() };
  const newState = reducer(initState, requestDestination('id', 'WC1X 9QZ'));
  t.equal(newState.destinations.size, 1);
  t.deepEqual(newState.destinations.first().toJS(), Map({
    postcode: 'WC1X 9QZ',
  }).toJS());
  t.end();
});

test('removing a destination', (t) => {
  const initState = {
    destinations: Map({ 'abc': Map() }),
  };
  const newState = reducer(initState, deleteDestination('abc'));
  t.ok(newState.destinations.isEmpty());
  t.end();
});

test('adding house', (t) => {
  const rightmoveUrl = 'www.rightmove.co.uk/property-to-rent/property-46665035.html';
  const initState = { houses: Map() };
  const newState = reducer(initState, requestHouse('id', rightmoveUrl));
  t.equal(newState.houses.size, 1);
  t.deepEqual(newState.houses.first().toJS(), Map({
    url: rightmoveUrl,
  }).toJS());
  t.end();
});

test('removing a house', (t) => {
  const initState = {
    houses: Map({ 'abc': Map() }),
  };
  const newState = reducer(initState, deleteHouse('abc'));
  console.log(initState, newState);
  t.ok(newState.houses.isEmpty());
  t.end();
});

test('updating a house', (t) => {
  const id = uuid.v1();
  const initState = {
    houses: Map({
      [id]: Map({ url: 'thing' }),
    }),
  };
  const action = updateHouseData(id, '6 Sanders House', 'https://media.com/thing.png');
  const newState = reducer(initState, action);
  t.deepEqual(newState.houses.first().toJS(), Map({
    url: 'thing',
    address: '6 Sanders House',
    imageUrl: 'https://media.com/thing.png',
  }).toJS());
  t.end();
});

test('updating a destination', (t) => {
  t.plan(1);
  const id = uuid.v1();
  const initState = {
    destinations: Map({
      [id]: Map({ postcode: 'E1 5QY' }),
    }),
  };

  const action = updateDestinationData(id, 1, 2);
  const newState = reducer(initState, action);

  t.deepEqual(newState.destinations.first().toJS(), {
    postcode: 'E1 5QY',
    lat: 1,
    lng: 2,
  });
});
