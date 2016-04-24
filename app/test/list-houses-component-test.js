import test from 'tape';
import { Map } from 'immutable';
import React from 'react';
import { shallow } from 'enzyme';

import { ListHouses } from '../components/list-houses';
import House from '../components/house';

test('ListHouses component', (t) => {
  const houses = Map({
    abc123: Map({ url: 'www.rightmove.co.uk/property-to-rent/property-46665035.html' }),
  });
  const result = shallow(
    <ListHouses houses={houses} />
  );

  t.equal(result.find(House).length, 1);
  const house = result.find(House);
  t.deepEqual(house.props(), { house: houses.get("abc123"), uuid: "abc123" });
  t.end();
});
