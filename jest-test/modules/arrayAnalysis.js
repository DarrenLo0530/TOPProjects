function analyzeArray(array) {
  // eslint-disable-next-line no-restricted-globals
  if (array.some(isNaN)) {
    throw new Error('Only numbers are allowed');
  }

  return {
    average: array.reduce((acc, curr) => acc + curr, 0) / array.length,
    min: Math.min(...array),
    max: Math.max(...array),
    length: array.length,
  };
}

// eslint-disable-next-line import/prefer-default-export
export { analyzeArray };
