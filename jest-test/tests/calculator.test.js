import calculator from '../modules/calculator';

test('Addition', () => {
  expect(calculator.add(1, 3)).toBe(4);
})

test('Subtraction', () => {
  expect(calculator.subtract(3, 4)).toBe(-1);
})

test('Division', () => {
  expect(calculator.divide(3, 2)).toBeCloseTo(1.5);
})

test('Multiplcation', () => {
  expect(calculator.multiply(3, 5)).toBe(15);
})

test('Invalid nums', () => {
  expect(() => {calculator.add("hello", "bye")}).toThrow();
})