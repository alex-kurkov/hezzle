export const keyTypeGuard = (
  key: string,
  element: IElement
): key is keyof IElement => {
  return key in element;
};
