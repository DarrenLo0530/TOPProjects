import caesar from '../modules/caesar';

test('Encryption test', () => {
  expect(caesar.encrypt('hello world', 5)).toBe('mjqqt btwqi');
})

test('Non letter characters', () => {
  expect(caesar.encrypt('testing123.', 3)).toBe('whvwlqj123.');
})

test('Character wrapping', () => {
  expect(caesar.encrypt('agzd', 14)).toBe('ounr');
});

test('Capital letters', () => {
  expect(caesar.encrypt('This Is A Test', 22)).toBe('Pdeo Eo W Paop');
})