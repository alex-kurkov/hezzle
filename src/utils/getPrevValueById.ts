export const getPrevValueByIdAndKey = (
  id: IElement['id'],
  key: keyof IElement,
  data: IElement[],
  toString?: boolean
) => {
  const elIndex = data.findIndex((el) => {
    return el.id === id;
  });

  const value = data[elIndex][key];

  return toString ? value.toString() : value;
};
