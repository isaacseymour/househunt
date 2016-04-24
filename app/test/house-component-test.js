import test from 'tape';
import { dom } from './helpers';
import { Map } from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import { House } from '../components/house';

const rightmoveUrl = 'www.rightmove.co.uk/property-to-rent/property-46665035.html';

test('House component while fetching the house', (t) => {
  t.plan(1);
  dom();

  const house = Map({ url: rightmoveUrl, commutes: Map() });

  const result = ReactTestUtils.renderIntoDocument(
    <House house={house} uuid="123" destinations={Map()} />
  );

  const element = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'div');
  t.ok(ReactDOM.findDOMNode(element).textContent.indexOf('Fetching property details...') > -1);
});

test('House component with the house loaded', (t) => {
  t.plan(1);
  dom();

  const house = Map({
    url: rightmoveUrl,
    address: 'Goswell Road, EC1V',
    imageUrl: 'http://rightmove.co.uk/some/image/url.jpg',
    commutes: Map(),
  });

  const result = ReactTestUtils.renderIntoDocument(
    <House house={house} uuid="123" destinations={Map()} />
  );

  const element = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'div');
  t.ok(ReactDOM.findDOMNode(element).textContent.indexOf(house.get('address')) > -1);
});

test('Deleting the house', (t) => {
  dom();
  t.plan(1);

  const house = Map({
    url: rightmoveUrl,
    address: 'Goswell Road, EC1V',
    commutes: Map(),
  });
  const callback = (id) => t.equal(id, 'abc123');

  const result = ReactTestUtils.renderIntoDocument(
    <House
      house={house} uuid='abc123'
      destinations={Map()}
      deleteHouse={callback}
    />
  );

  const link = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'a')[1];
  ReactTestUtils.Simulate.click(link);
});
