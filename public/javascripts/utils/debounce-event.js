const debounceEvent = (func, delay) => {
  let timer;
  return arg => {
    clearTimeout(timer);
    timer = setTimeout(() => func(arg), delay);
  };
};

export { debounceEvent };
