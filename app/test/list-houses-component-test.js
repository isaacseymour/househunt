import { Map } from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import { expect } from 'chai';
import { describe } from '../test';

import ListHouses from '../components/list-houses';

describe('ListHouses component', () => {
  const houses = Map({
    abc123: Map({ url: 'www.rightmove.co.uk/property-to-rent/property-46665035.html' }),
  });

  const result = ReactTestUtils.renderIntoDocument(
    <ListHouses houses={houses} />
  );

  const element = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'li');
  const textNode = ReactDOM.findDOMNode(element);
  expect(textNode.textContent).to.eql('Fuck off');
});

describe('ListHouses other component', () => {
  const houses = Map({
    abc123: Map({ url: 'www.rightmove.co.uk/property-to-rent/property-46665035.html' }),
  });

  const result = ReactTestUtils.renderIntoDocument(
    <ListHouses houses={houses} />
  );

  const element = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'li');
  const textNode = ReactDOM.findDOMNode(element);
  expect(textNode.textContent).to.eql('Fetching property details...');

  describe('foo', () => {
    expect(2).to.eql(4);
  });
});
