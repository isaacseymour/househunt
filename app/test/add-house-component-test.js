import test from 'tape';
import { dom } from './helpers';
import { Map } from 'immutable';
import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import AddHouse from '../components/add-house';

test('AddHouse component', (t) => {
  dom();
  t.plan(1);
  const callback = (url) => {
    t.equal(url, 'www.rightmove.co.uk/property-to-rent/property-46665035.html');
  };

  const result = ReactTestUtils.renderIntoDocument(
    <AddHouse addHouseCallback={callback}/>
  );

  const element = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'input');
  const textNode = element.getDOMNode();
  textNode.value = 'www.rightmove.co.uk/property-to-rent/property-46665035.html';
  ReactTestUtils.Simulate.change(textNode);

  const form = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'form');
  ReactTestUtils.Simulate.submit(form.getDOMNode());
});
