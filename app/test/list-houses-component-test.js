import { describe } from 'jspm-test/describe';
import { Map } from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import ListHouses from '../components/list-houses';

describe('ListHouses component', (t) => {
  const houses = Map({
    abc123: Map({ url: 'www.rightmove.co.uk/property-to-rent/property-46665035.html' }),
  });

  const result = ReactTestUtils.renderIntoDocument(
    <ListHouses houses={houses} />
  );

  const element = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'li');
  const textNode = ReactDOM.findDOMNode(element);
  t.equal(textNode.textContent, 'Fetching property details...');
});
