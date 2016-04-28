import test from 'tape';
import { dom } from './helpers';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import { AddDestination } from '../components/add-destination';

test('AddDestination component', (t) => {
  dom();
  t.plan(4);
  const callback = (postcode, name) => {
    t.equal(postcode, 'WC1X 9QZ');
    t.equal(name, 'Somewhere');
  };

  const result = ReactTestUtils.renderIntoDocument(
    <AddDestination addDestination={callback} />
  );

  const nameEl = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'input')[0];
  const nameNode = ReactDOM.findDOMNode(nameEl);
  nameNode.value = 'Somewhere';
  ReactTestUtils.Simulate.change(nameNode);

  const postcodeEl = ReactTestUtils.scryRenderedDOMComponentsWithTag(result, 'input')[1];
  const postcodeNode = ReactDOM.findDOMNode(postcodeEl);
  postcodeNode.value = 'WC1X 9QZ';
  ReactTestUtils.Simulate.change(postcodeNode);

  const form = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'form');
  ReactTestUtils.Simulate.submit(ReactDOM.findDOMNode(form));

  t.equal(nameNode.value, '');
  t.equal(postcodeNode.value, '');
});
