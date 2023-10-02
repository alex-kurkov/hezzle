/* eslint-disable react-hooks/exhaustive-deps */
import { Table, Text, Button, Group, Stack } from '@mantine/core';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { sortComparator } from '../../utils/sortComparator';
import { elements } from '../../data/elements';
import { SortableTableCell, SortableTableHead } from '.';
import { useEditedCellsStorage } from '../../utils/useEditedCellsStorage';
import { useEditStateHandling } from '../../utils/useEditStateHandling';
import { getPrevValueByIdAndKey } from '../../utils/getPrevValueById';
import { useSortSearchParams } from '../../utils/useSortSearchParams';

export const SortableTable = () => {
  const [data, setData] = useState<IElement[]>(elements);
  const { editState, editedId, editedKey, enableEditState, disableEditState } =
    useEditStateHandling(elements[0]);
  const [elementsEditedCount, cellsEditedCount, recordNewEditing, wasEdited] =
    useEditedCellsStorage(elements);
  const { sortedBy, order, handleOrderChange } = useSortSearchParams(elements);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCellClick: MouseEventHandler<HTMLTableSectionElement> = (e) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }
    const cell = e.target.parentElement;

    if (
      !(cell instanceof HTMLTableCellElement) ||
      editState ||
      !cell.dataset.colkey ||
      cell.dataset.colkey === 'id'
    ) {
      return;
    }
    enableEditState(cell.dataset?.id, cell.dataset.colkey);
  };

  // Хендлер сохранения в edit-режиме
  const handleSave = () => {
    if (!inputRef.current || !editedId || !editedKey) return;

    const prevValue = getPrevValueByIdAndKey(editedId, editedKey, data);
    const currentValue =
      typeof prevValue === 'number'
        ? Number(inputRef.current.value)
        : inputRef.current.value;

    if (prevValue !== currentValue) {
      setData((prev) =>
        prev.map((element) =>
          element.id === editedId
            ? { ...element, [editedKey]: currentValue }
            : element
        )
      );
      recordNewEditing(editedId, editedKey);
    }
    disableEditState();
  };

  useEffect(() => {
    handleOrderChange();
  }, [editState]);

  // Сортировка столбцов
  useEffect(() => {
    const orderMultiplyer = order === 'ASC' ? 1 : -1;
    const sorted = [...data].sort(
      (a, b) => sortComparator(a, b, sortedBy) * orderMultiplyer
    );
    setData(sorted);
  }, [sortedBy, order, editState]);

  return (
    <Stack p={20} miw={320} gap="sm" justify="space-between">
      <Group w="100%">
        <Text size="xl">Элементов Изменено: {elementsEditedCount}</Text>
        <Text size="xl">Всего внесено изменений: {cellsEditedCount}</Text>
      </Group>
      <Table.ScrollContainer minWidth={'90vw'}>
        <Table
          verticalSpacing="md"
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders>
          <SortableTableHead
            onClick={handleOrderChange}
            elements={elements}
            sortedBy={sortedBy}
            order={order}
          />
          <Table.Tbody onClick={handleCellClick}>
            {data.map((element, index) => (
              <Table.Tr key={element.id}>
                <Table.Td key={'number' + element.id}>{index + 1}</Table.Td>

                {Object.entries(element).map(([key, value]) => {
                  const isActive = editedId === element.id && editedKey === key;

                  return (
                    <SortableTableCell
                      wasEdited={wasEdited(element.id, key as keyof IElement)}
                      value={value}
                      elementId={element.id}
                      colKey={key}
                      key={element.id + key}
                      isActive={isActive}
                      inputRef={inputRef}
                    />
                  );
                })}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      {editState && (
        <Group>
          <Button size="lg" w="100%" onClick={handleSave}>
            Сохранить
          </Button>
          <Button size="lg" w="100%" onClick={disableEditState}>
            Отменить
          </Button>
        </Group>
      )}
    </Stack>
  );
};
