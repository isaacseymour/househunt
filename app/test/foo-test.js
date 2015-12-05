import {
  describe,
} from '../test-lib/main';

const foo = (x, y) => x + y;

describe('testing foo', (t) => {
  t.assertEqual(1, 1);
  t.describe('Adding 2 + 2', (t) => {
    t.assertEqual(foo(2, 2), 4);
  });

  t.describe('Adding 1 + 1', (t) => {
    t.assertEqual(foo(1, 1), 3);
  });

  t.describe('Things are fine', (t) => {
    t.ok(true);
    t.ok(false);
  });

  t.describe('Another block', (t) => {
    t.deepEqual({ x : 1 }, { y: 1 });
  });

  t.describe('Something async', (t) => {
    t.async(1, 1);
    t.ok(true);
    setTimeout(() => {
      t.ok(true);
    }, 100);
  });
});
