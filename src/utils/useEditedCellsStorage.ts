import { useRef, useState } from "react";
import { IElement } from "../data/elements";


type WasEditedFn = (id: IElement['id'], key: keyof IElement) => boolean
type RecordNewEditingFn = (id: IElement['id'], key: keyof IElement) => void;


export const useEditedCellsStorage = (elements: IElement[]): [number, number, RecordNewEditingFn, WasEditedFn] => {
  const initStorageMap = new Map<number, Set<keyof IElement>>();

  elements.map(({ id }) => {
    initStorageMap.set(id, new Set<keyof IElement>())
  })
  
  const cellsStorage = useRef(initStorageMap);

  const [elementsEditedCount, setElementsEditedCount] = useState<number>(0);
  const [cellsEditedCount, setCellsEditedCount] = useState<number>(0);

  const wasEdited: WasEditedFn = (id, key) => {
   return !!cellsStorage.current.get(id)?.has(key) || false
  }

  const recordNewEditing: RecordNewEditingFn = (id, key) => {
    if (cellsStorage.current.get(id)?.size === 0) {
      setElementsEditedCount(prev => prev + 1);
    }
    if (!cellsStorage.current.get(id)?.has(key)) {
      setCellsEditedCount(prev => prev + 1)
    }

    cellsStorage.current.get(id)?.add(key)
  };

  return [elementsEditedCount, cellsEditedCount, recordNewEditing, wasEdited];
};
