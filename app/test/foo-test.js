import {
  describe,
} from '../test-lib/main';

const foo = (x, y) => x + y;

describe('testing foo', (t) => {
  t.equal(1, 1);
  t.describe('Adding 2 + 2', (t) => {
    t.equal(foo(2, 2), 4);
  });

  t.describe('Adding 1 + 1', (t) => {
    t.equal(foo(1, 1), 3);
  });

  t.describe('Things are fine', (t) => {
    t.ok(true);
    t.ok(false);
  });

  t.describe('Another block', (t) => {
    t.deepEqual({ x : 1 }, { y: 1 });
  });

  t.describe('Something async', (t) => {
    t.plan(4);
    t.ok(true);
    setTimeout(() => {
      t.ok(true);
      t.ok(2 == 2);
      t.equal(2, 3);
    }, 100);
  });
});
