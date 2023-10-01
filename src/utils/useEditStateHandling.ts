import { useRef, useState } from 'react';
import { isObject } from './isObject';

type EditableKey = keyof Omit<IElement, 'id'>;
type IdKey = IElement['id'];

type EnableEditStateFn = (id?: string, key?: string) => void;

type InferParamsFn = (
  id?: string,
  key?: string
) => { id: Nullable<IdKey>; key: Nullable<EditableKey> };

type HookReturnType = {
  editState: boolean;
  editedId: Nullable<IdKey>;
  editedKey: Nullable<EditableKey>;
  enableEditState: EnableEditStateFn;
  disableEditState: () => void;
  inferParams: InferParamsFn;
};

type EditCell = { id: Nullable<IdKey>; key: Nullable<EditableKey> };
const initCell: EditCell = { id: null, key: null };

export const useEditStateHandling = (element: IElement): HookReturnType => {
  const editCell = useRef(initCell);
  const [editState, setEditState] = useState(false);

  const enableEditState: EnableEditStateFn = (idParam, keyParam) => {
    const { id, key } = inferParams(idParam, keyParam);
    if (!id || !key) return;

    editCell.current = { id, key };
    setEditState(true);
  };

  const disableEditState = () => {
    editCell.current = initCell;
    setEditState(false);
  };

  const inferParams: InferParamsFn = (id?, key?) => {
    const isCorrectKey = Boolean(
      element && isObject(element) && key && key in element && key !== 'id'
    );
    // TODO typeGuard for key

    const isCorrectNumber = Boolean(
      id && id.length !== 0 && !isNaN(Number(id))
    );

    return {
      id: isCorrectNumber ? Number(id) : null,
      key: isCorrectKey ? (key as EditableKey) : null,
    };
  };

  return {
    editState,
    editedId: editCell.current.id,
    editedKey: editCell.current.key,
    enableEditState,
    disableEditState,
    inferParams,
  };
};
