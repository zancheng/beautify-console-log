const path = require('path');

import BeautifyConsole from '../index';

test('SDK getHostInfo', () => {
  const log = BeautifyConsole.getInstance()
  expect(log.info(1234, '4', [3, 5])).toBe(undefined);
  expect(log.log(1234)).toBe(undefined);
  expect(log.close().warn(1234)).toBe(undefined);
  expect(log.open().log(1234)).toBe(undefined);
  expect(log.error(1234)).toBe(undefined);
  expect(log.warn(1234)).toBe(undefined);
  expect(log.setPadStartText('log', 'hello world ->').log(1234)).toBe(undefined);
  expect(log.setPadStartText('info', 'hello world ->').info('info')).toBe(undefined);
});
