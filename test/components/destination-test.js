import test from 'tape';
import { dom } from './helpers';
import { Map } from 'immutable';

import ReactTestUtils from 'react/lib/ReactTestUtils';

import Destination from '../../app/components/destination';

test('Destination component', (t) => {
  dom();
  const destination = Map({
    postcode: 'WC1X 9QZ',
  });


  const result = ReactTestUtils.renderIntoDocument(
    <Destination destination={destination} uuid="123" />
  );

  const element = ReactTestUtils.findRenderedDOMComponentWithTag(result, 'div');
  t.equal(element.getDOMNode().textContent, 'hello world');
  t.end();
});


