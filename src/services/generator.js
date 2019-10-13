export const generateNumbers = (from, to = false) => {
  let count = from;
  let num = 0;
  if (to) {
    count = +to - +from;
    num = +from;
  }

  return [...take(count, naturalNumbers(num))];
};

export const naturalNumbers = function*(num = 0) {
  while (true) {
    yield num;
    num++;
  }
};

export const take = function*(n, iterable) {
  let index = 0;
  for (const val of iterable) {
    if (index >= n) {
      return;
    }
    index++;
    yield val;
  }
};
