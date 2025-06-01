export const timeout = (ms: number) => {
  return new Promise((r) => {
    setTimeout(() => {
      r(null);
    }, ms);
  });
};
