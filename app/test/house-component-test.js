import { describe } from '../test-lib/main';
import { Map } from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import House from '../components/house';

const rightmoveUrl = 'www.rightmove.co.uk/property-to-rent/property-46665035.html';

describe('House component while fetching the house', (t) => {
  const house = Map({ url: rightmoveUrl });

  const result = ReactTestUtils.renderIntoDocument(
    <House house={house} uuid="123" />
  );

  const element = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'div');
  t.ok(ReactDOM.findDOMNode(element).textContent.indexOf('Fetching property details...') > -1);
});

describe('House component with the house loaded', (t) => {
  const house = Map({
    url: rightmoveUrl,
    address: 'Goswell Road, EC1V',
    imageUrl: 'http://rightmove.co.uk/some/image/url.jpg',
  });

  const result = ReactTestUtils.renderIntoDocument(
    <House house={house} uuid="123" />
  );

  const element = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'div');
  t.ok(ReactDOM.findDOMNode(element).textContent.indexOf(house.get('address')) > -1);
});

describe('Deleting the house', (t) => {
  const house = Map({ url: rightmoveUrl, address: 'Goswell Road, EC1V' });
  const callback = (id) => t.equal(id, 'abc123');

  const result = ReactTestUtils.renderIntoDocument(
    <House
      house={house} uuid='abc123'
      deleteHouseCallback={callback}
    />
  );

  const link = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'a');
  ReactTestUtils.Simulate.click(link);
});
