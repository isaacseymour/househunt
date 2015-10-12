import { jsdom } from 'jsdom';

export function dom() {
  global.document = jsdom('<html><body></body></html>');
  global.window = global.document.defaultView;
  global.navigator = {
    userAgent: 'node.js',
  };
}
