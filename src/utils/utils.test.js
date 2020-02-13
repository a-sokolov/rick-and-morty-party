import { isValidCharacterName } from './utils.js';

test('invalid character name RI', () => {
  expect(isValidCharacterName('RI')).toBe(false);
});
