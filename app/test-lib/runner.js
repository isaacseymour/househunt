import { processAssertions } from './main';

import { renderResults } from './dom-render';
import { logResults } from './log-render';

export function runTestsOnFiles(files) {
  const promises = files.map((f) => System.import(f));
  Promise.all(promises).then(() => {
    return processAssertions();
  }).then((results) => {
    console.log('results', results);
    const message = document.createElement('p');
    message.textContent = 'All errors are logged to the console for clickable stack traces!';
    message.classList.add('top-message');
    document.body.appendChild(message);
    document.body.appendChild(renderResults(results));
    logResults(results);
  }).catch((e) => {
    console.error('Eror running tests', e);
  });
}

