import { capitalize } from '../modules/capitalize'
test('Capitalize single string', () => {
  expect(capitalize('test')).toBe('Test');
});

test('Capitalize multiple strings', () => {
  expect(capitalize('capital notcapital')).toBe('Capital notcapital');
})

test('Capitalize already capitalized', () => {
  expect(capitalize('Capitalized')).toBe('Capitalized');
})