export const sortComparator = (
  a: IElement,
  b: IElement,
  key: keyof IElement
): -1 | 0 | 1 => {
  const valueA = a[key];
  const valueB = b[key];

  const type = getCommonSortType(valueA, valueB);

  switch (type) {
    case 'string':
      if (
        valueA.toString().toLocaleLowerCase() >
        valueB.toString().toLocaleLowerCase()
      ) {
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
    
    // какая-то кастомная сложная логика - даты, например
    // case 'date':
    //   if (valueA > valueB) {
    //     return 1;
    //   } else if (valueA < valueB) {
    //     return -1;
    //   }
    //   return 0;

    default:
      return 0;
  }
};

const getCommonSortType = (a: unknown, b: unknown): 'string' | 'number' => {
  if (typeof a === typeof b && typeof a === 'number') {
    return 'number';
  } else return 'string';
};
