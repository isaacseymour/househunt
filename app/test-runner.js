import {
  assertions,
  processAssertions
} from './test';

const testFiles = [
  'test/list-houses-component-test.js'
];

const promises = testFiles.map((f) => System.import(f));

const hasPassed = (result) => {
  if (result.nested.length === 0 && result.passed) return true;

  const nestedFailed = result.nested.some((r) => hasPassed(r) === false);
  return result.passed && nestedFailed === false;
}

const createResultUl = () => {
  const ul = document.createElement('ul');
  ul.classList.add('test-results');
  return ul;
}

const renderResult = (result) => {
  const li = document.createElement('li');
  const div = document.createElement('div');
  div.classList.add(
    'test-result',
    `test-${hasPassed(result) ? 'success' : 'fail'}`
  );

  const innerContent = (() => {
    const span = document.createElement('span');
    if (hasPassed(result)) {
      span.textContent = result.name + ' passed!';
    } else {
      const text = document.createTextNode(result.name + ' failed!');
      span.appendChild(text);

      if (result.error && result.error.message) {
        const preMessage = document.createElement('pre');
        const codeMessage = document.createElement('code');
        codeMessage.textContent = result.error.message;
        preMessage.appendChild(codeMessage);
        span.appendChild(preMessage);
      }

      if (result.error && result.error.stack) {
        const preStack = document.createElement('pre');
        const codeStack = document.createElement('code');
        codeStack.textContent = result.error.stack;
        preStack.appendChild(codeStack);
        span.appendChild(preStack);
      }
    }

    return span;
  })();

  div.appendChild(innerContent);

  if (result.nested.length > 0) {
    console.log('doing nested', result.nested);
    div.appendChild(renderResults(result.nested));
  }

  li.appendChild(div);

  return li;
}

const renderResults = (results) => {
  const listFrag = document.createDocumentFragment();

  const ul = createResultUl();

  results.map((r) => renderResult(r)).forEach((elem) => {
    listFrag.appendChild(elem);
  });

  ul.appendChild(listFrag);
  return ul;
}

const logResult = (result, indentLevel) => {
  const prefix = Array.from({ length: indentLevel }, () => '\t').join('');
  console.log(prefix, result.name, hasPassed(result) ? 'Success' : 'Fail');
  if (result.error) console.warn(prefix, result.error);
  result.nested.forEach((result) => logResult(result, indentLevel + 1));
};

Promise.all(promises).then(() => {
  const results = processAssertions();
  document.body.appendChild(renderResults(results));
  // results.forEach((result) => {
  //   logResult(result, 0);
  // });
}).catch((e) => {
  console.log('Eror running tests', e);
});
