import { IElement } from './../data/elements';

export const sortComparator = (
  a: IElement,
  b: IElement,
  key: keyof IElement
): -1 | 0 | 1 => {
  const valueA = a[key];
  const valueB = b[key];

  const type = isCommonType(valueA, valueB);

  switch (type) {
    case 'string':
      if (valueA > valueB) {
        return 1;
      } else if (valueA < valueB) {
        return -1;
      }
      return 0;

    case 'number':
      if (valueA > valueB) {
        return 1;
      } else if (valueA < valueB) {
        return -1;
      }
      return 0;

    default:
      return 0;
  }
};

const isCommonType = (a: unknown, b: unknown) => {
  if (typeof a !== typeof b) {
    throw new Error('types are not comparable');
  } else return typeof a;
};
