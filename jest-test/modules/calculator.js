export default (() => {
  function checkNums(a, b) {
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      throw new Error('Invalid numbers');
    }
  }

  const add = (a, b) => {
    checkNums(a, b);
    return a + b;
  };

  const multiply = (a, b) => {
    checkNums(a, b);
    return a * b;
  };

  const divide = (a, b) => {
    checkNums(a, b);
    return a / b;
  };

  const subtract = (a, b) => {
    checkNums(a, b);
    return a - b;
  };

  return {
    add, multiply, subtract, divide,
  };
})();
