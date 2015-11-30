import {
  assertions,
  processAssertions
} from './test';

const testFiles = [
  'test/foo-test.js'
];

const promises = testFiles.map((f) => System.import(f));

const hasPassed = (result) => {
  if (result.nested.length === 0 && result.passed) return true;

  const nestedFailed = result.nested.some((r) => hasPassed(r) === false);
  return result.passed && nestedFailed.length === 0;
}
const logResult = (result, indentLevel) => {
  const prefix = Array.from({ length: indentLevel }, () => '\t').join('');
  console.log(prefix, result.name, hasPassed(result) ? 'Success' : 'Fail');
  if (result.error) console.warn(prefix, result.error);
  result.nested.forEach((result) => printResult(result, indentLevel + 1));
};
Promise.all(promises).then(() => {
  const results = processAssertions();
  results.forEach((result) => {
    logResult(result, 0);
  });
}).catch((e) => {
  console.log('Eror running tests', e);
});
