import { analyzeArray } from '../modules/arrayAnalysis';

test('Test min', () => {
  expect(analyzeArray([1, -10, 2, 100]).min).toBe(-10);
});

test('Test max', () => {
  expect(analyzeArray([-10, 20, 300]).max).toBe(300);
});

test('Test dcimals', () => {
  expect(analyzeArray([3.1, 3.2, 3.1111, 3.22222]).max).toBeCloseTo(3.22222);
});

test('Test average', () => {
  expect(analyzeArray([1, 2, 3, 4, 99]).average).toBeCloseTo(21.8);
});

test('Test length', () => {
  expect(analyzeArray(new Array(101)).length).toBe(101);
});

test('Test strings (Invalid input) ', () => {
  expect(() => { analyzeArray(['hello', 'bye']); }).toThrow(Error);
});

test('Test all', () => {
  expect(analyzeArray([-1, 3, 10.123, -30, -30.2])).toEqual({
    average: -9.6154, min: -30.2, max: 10.123, length: 5,
  });
});
