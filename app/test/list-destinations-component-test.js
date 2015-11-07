import test from 'tape';
import { dom } from './helpers';
import { Map } from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import ListDestinations from '../components/list-destinations';

test('ListDestinations component', (t) => {
  dom();

  const destinations = Map({
    abc123: Map({
      postcode: 'WC1X 9QZ',
    }),
  });

  const result = ReactTestUtils.renderIntoDocument(
    <ListDestinations destinations={destinations} />
  );

  const element = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'li');
  const textNode = ReactDOM.findDOMNode(element);
  t.ok(textNode.textContent.indexOf('WC1X 9QZ') > -1);
  t.end();
});
