export const isObject = (param: unknown): param is object => {
  return typeof param === 'object' && !Array.isArray(param) && param !== null;
}
