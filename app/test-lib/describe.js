import { assertEqual, ok } from './assertions';
import isEqual from 'lodash.isequal';
import { expect } from 'chai';

let counter = 0;

const makeId = () => counter++;

class Describe {
  constructor(name, fn) {
    this.id = makeId();
    this.name = name;
    this.fn = fn;
    this.nested = [];
    this.assertions = [];
    this.asyncCount = 0;
    this.syncCount = 0;
    this.ASYNC_TIMEOUT = 2000;
  }

  describe(name, fn) {
    const nested = makeDescribe(name, fn);
    this.nested.push(nested);
    return nested;
  }

  async(num, syncNum) {
    this.asyncCount = num;
    this.syncCount = syncNum;
  }

  passed() {
    if (this.asyncError) return false;

    if (this.assertions.length === 0) {
      // if this describe has no direct assertions
      // we say it passed if all its nested ones passed
      return this.nestedAllPass();
    } else {
      // however, if this has assertions
      // we say it's passed if they passed
      return this.assertionsAllPass();
    }
  }

  nestedAllPass() {
    return this.nested.every((d) => d.passed());
  }

  assertionsAllPass() {
    return this.assertions.every((a) => a.passed);
  }

  passedString() {
    if (this.assertions.length > 0) {
      let str = this.assertionsAllPass() ? 'Success!' : 'Fail!';
      if (!this.nestedAllPass()) {
        str += ' (A nested test failed)';
      }
      return str;
    } else {
      return this.nestedAllPass() ? 'Success!' : 'Fail!';
    }
  }

  runIteration() {
    this.fn.call(null, this);
    // need to run anything nested too
    const nestedPromises = this.nested.map((d) => d.run());
    return Promise.all(nestedPromises);
  }

  run() {
    let maxTries = this.ASYNC_TIMEOUT / 50;
    let currentTries = 0;

    if (this.asyncCount > 0) {
      const runAndCheck = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            currentTries++;
            this.runIteration().then(() => {
              if (this.asyncCount + this.syncCount === this.assertions.length) {
                resolve(this);
              } else if (currentTries >= maxTries) {
                throw new Error('ASYNC_TMEOUT test fail');
              } else {
                resolve(runAndCheck());
              }
            }).catch((e) => {
              this.asyncError = e;
              resolve(this);
            });
          }, 50);
        });
      };

      return runAndCheck();
    } else {
      return this.runIteration().then(() => {
        return this;
      });
    }
  }

  hasMatchingAssertion(name, args) {
    return this.assertions.some((a) => {
      return a.name === name && isEqual(a.args, args);
    });
  }
}

const wrapAssertion = (name, assertionFn) => {
  Describe.prototype[name] = function(...args) {
    // avoid running the same assertion multiple times
    if (this.hasMatchingAssertion(name, args)) return;

    let passed = true;
    let error;

    try {
      assertionFn(...args);
    } catch (e) {
      passed = false;
      error = e;
    }

    this.assertions.push({ name, args, passed, error });
  }
}

wrapAssertion('assertEqual', (x, y) => {
  expect(x).to.equal(y);
});

wrapAssertion('ok', (x) => {
  expect(x).to.be.ok;
});

wrapAssertion('deepEqual', (x, y) => {
  expect(x).to.deep.equal(y);
});

const makeDescribe = (name, fn) => {
  return new Describe(name, fn);
}

export { makeDescribe, wrapAssertion };

