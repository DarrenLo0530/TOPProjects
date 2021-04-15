import { reverseString } from '../modules/reverseString';

test('No capitals', () => {
  expect(reverseString('abc')).toBe('cba');
})

test('Only capitals', () => {
  expect(reverseString('AAABB')).toBe('BBAAA');
})

test('Mixed chars', () => {
  expect(reverseString('AbCdEfG')).toBe('GfEdCbA');
})

test('Spaces', () => {
  expect(reverseString('race car')).toBe('rac ecar');
})