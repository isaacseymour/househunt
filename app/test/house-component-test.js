import test from 'tape';
import { dom } from './helpers';
import { Map } from 'immutable';
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import House from '../components/house';

const rightmoveUrl = 'www.rightmove.co.uk/property-to-rent/property-46665035.html';

test('House component while fetching the house', (t) => {
  t.plan(1);
  dom();

  const house = Map({ url: rightmoveUrl });

  const result = ReactTestUtils.renderIntoDocument(
    <House house={house} uuid="123" />
  );

  const element = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'div');
  t.ok(element.getDOMNode().textContent.indexOf('Fetching property details...') > -1);
});

test('House component with the house loaded', (t) => {
  t.plan(1);
  dom();

  const house = Map({
    url: rightmoveUrl,
    address: 'Goswell Road, EC1V',
    imageUrl: 'http://rightmove.co.uk/some/image/url.jpg',
  });

  const result = ReactTestUtils.renderIntoDocument(
    <House house={house} uuid="123" />
  );

  const element = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'div');
  t.ok(element.getDOMNode().textContent.indexOf(house.get('address')) > -1);
  // TODO: scrape the image
  // t.ok(element.getDOMNode().innerHTML.indexOf(house.get('imageUrl')) > -1);
});
