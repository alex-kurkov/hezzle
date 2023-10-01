/* eslint-disable react-hooks/exhaustive-deps */
import { Table, Flex, Text, Button, Group } from '@mantine/core';
import {
  MouseEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { sortComparator } from '../../utils/sortComparator';
import { elements } from '../../data/elements';
import { SortableTableCell, SortableTableHead } from '.';
import { useSearchParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useEditedCellsStorage } from '../../utils/useEditedCellsStorage';
import { useEditStateHandling } from '../../utils/useEditStateHandling';
import { getPrevValueByIdAndKey } from '../../utils/getPrevValueById';

export const SortableTable = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    sortedBy: Object.keys(elements)[0],
    order: 'ASC',
  });

  const [data, setData] = useState<IElement[]>(elements);
  const [sortedBy, setSortedBy] = useState<keyof IElement>('id');
  const [order, setOrder] = useState<SortOrder>('ASC');

  const { editState, editedId, editedKey, enableEditState, disableEditState } =
    useEditStateHandling(elements[0]);

  const [elementsEditedCount, cellsEditedCount, recordNewEditing, wasEdited] =
    useEditedCellsStorage(elements);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCellClick: MouseEventHandler<HTMLTableSectionElement> = (e) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }
    const cell = e.target.parentElement;

    if (
      !(cell instanceof HTMLTableCellElement) ||
      editState ||
      !cell.dataset.key ||
      cell.dataset.key === 'id'
    ) {
      return;
    }
    enableEditState(cell.dataset?.id, cell.dataset.key);
  };

  // Хендлер сохранения в edit-режиме
  const handleSave = () => {
    if (!inputRef.current || !editedId || !editedKey) return;

    const prevValue = getPrevValueByIdAndKey(editedId, editedKey, data, true);

    if (prevValue !== inputRef.current.value) {
      setData((prev) =>
        prev.map((element) =>
          element.id === editedId
            ? { ...element, [editedKey]: inputRef.current?.value }
            : element
        )
      );

      recordNewEditing(editedId, editedKey);
    }

    disableEditState();
  };

  // подгрузка из адресной строки параметров сортировки до отрисовки DOM
  useLayoutEffect(() => {
    const sortedBy = searchParams.get('sortedBy');
    if (sortedBy && Object.keys(elements[0]).includes(sortedBy)) {
      setSortedBy(sortedBy as keyof IElement);
    }
    const order = searchParams.get('order');
    if (order && (order === 'DESC' || order === 'ASC')) {
      setOrder(order as SortOrder);
    }
  }, []);

  // Сортировка столбцов
  useEffect(() => {
    const orderMultiplyer = order === 'ASC' ? 1 : -1;
    const sorted = [...data].sort(
      (a, b) => sortComparator(a, b, sortedBy) * orderMultiplyer
    );
    setData(sorted);
    setSearchParams({
      sortedBy: sortedBy,
      order: order,
    });
  }, [sortedBy, order, editState]);

  const handleSortClick = (key: keyof IElement) => {
    if (key !== sortedBy) {
      setSortedBy(key);
      setOrder('ASC');
    } else {
      setOrder((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
    }
  };

  return (
    <Flex p={20} miw={320} direction="column" gap="lg" justify="space-between">
      <Table.ScrollContainer minWidth={'90vw'}>
        <Table
          verticalSpacing="md"
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders>
          <SortableTableHead
            onClick={handleSortClick}
            elements={elements}
            sortedBy={sortedBy}
            order={order}
          />
          <Table.Tbody onClick={handleCellClick}>
            {data.map((element, index) => (
              <Table.Tr key={element.id}>
                <Table.Td key={'number'}>{index + 1}</Table.Td>

                {Object.entries(element).map(([key, value]) => {
                  const isActive = editedId === element.id && editedKey === key;

                  return (
                    <>
                      <SortableTableCell
                        wasEdited={wasEdited(
                          Number(element.id),
                          key as keyof IElement
                        )}
                        value={value}
                        elementId={element.id}
                        colKey={key}
                        key={key + uuid()}
                        isActive={isActive}
                        inputRef={inputRef || null}
                      />
                    </>
                  );
                })}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Flex justify="space-between" gap={20}>
        <Group w="50%">
          <Text size="xl">Элементов Изменено: {elementsEditedCount}</Text>
          <Text size="xl">Всего внесено изменений: {cellsEditedCount}</Text>
        </Group>
        {editState && (
          <Group w="50%">
            <Button size="lg" w="100%" onClick={handleSave}>
              Сохранить
            </Button>
            <Button size="lg" w="100%" onClick={disableEditState}>
              Отменить
            </Button>
          </Group>
        )}
      </Flex>
    </Flex>
  );
};
