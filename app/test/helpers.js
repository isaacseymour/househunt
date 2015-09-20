export function dom() {
  return makeDom('html><body></body></html>');
}

export function makeDom(markup) {
  if (typeof document !== 'undefined') { return; }
  const jsdom = require('jsdom').jsdom;
  global.document = jsdom(markup || '');
  global.window = document.parentWindow;
  global.navigator = {
    userAgent: 'node.js',
  };
}
