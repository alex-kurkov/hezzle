/* eslint-disable react-hooks/exhaustive-deps */
import { Table, Flex, Center, Text, Title, Button, Group } from '@mantine/core';
import {
  MouseEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { sortComparator } from '../../utils/sortComparator';
import { elements, IElement } from '../../data/elements';
import { SortableTableCell, SortableTableHead } from '.';
import { useSearchParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useEditedCellsStorage } from '../../utils/useEditedCellsStorage';

export type SortOrder = 'ASC' | 'DESC';

export const SortableTable = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    sortedBy: Object.keys(elements)[0],
    order: 'ASC',
  });

  const [data, setData] = useState<IElement[]>(elements);
  const [sortedBy, setSortedBy] = useState<keyof IElement>('id');
  const [order, setOrder] = useState<SortOrder>('ASC');
  const [editState, setEditState] = useState(false);
  const [elementsEditedCount, cellsEditedCount, recordNewEditing, wasEdited] =
    useEditedCellsStorage(elements);

  const editCell = useRef<{
    id: string;
    key: string;
  }>({
    id: '',
    key: '',
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCellClick: MouseEventHandler<HTMLTableSectionElement> = (e) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }
    const cell = e.target.parentElement;

    if (
      !(cell instanceof HTMLTableCellElement) ||
      editState ||
      cell.dataset.key === 'id' ||
      !cell.dataset.key
    ) {
      return;
    }

    setEditState(true);

    const { id, key } = cell.dataset;

    if (!id || !key) return;

    editCell.current = { id, key };
  };

  // Хендлеры сохранения/отмены в edit-режиме
  const handleCancel = () => {
    setEditState(false);
    editCell.current = { id: '', key: '' };
  };

  const handleSave = () => {
    if (!inputRef.current) return;

    const { id, key } = editCell.current;

    const elIndex = data.findIndex((el) => {
      return String(el.id) === id;
    });

    const prevEl = data[elIndex];

    const prevValue = prevEl[key as keyof IElement].toString();

    if (prevValue !== inputRef.current.value) {
      setData((prev) =>
        prev.map((element) => {
          if (String(element.id) !== id) {
            return element;
          }
          return { ...element, [key]: inputRef.current?.value };
        })
      );

      recordNewEditing(Number(id), key as keyof IElement);
    }

    handleCancel();
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
    <Center pt={60} maw="100%">
      <Flex
        p={20}
        miw={320}
        direction="column"
        gap="lg"
        justify="space-between">
        <Title mb={40}>MantineUI + React + React-router + Vite</Title>
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
                    const isActive =
                      editCell.current.id === element.id.toString() &&
                      editCell.current.key === key;

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
          <Group>
            <Text size="xl">Элементов Изменено: {elementsEditedCount}</Text>
            <Text size="xl">Всего внесено изменений: {cellsEditedCount}</Text>
          </Group>
          {editState && (
            <Group>
              <Button size="lg" onClick={handleSave}>
                Сохранить
              </Button>
              <Button size="lg" onClick={handleCancel}>
                Отменить
              </Button>
            </Group>
          )}
        </Flex>

        <Text>
          роутер подключен для дублирования информации о столбце и направлении
          сортировки из внутреннего стейта в query-параметры адреса и легкой
          передаче этого стейта путем копирования адресной строки. Пока без
          оптимизаций и анимаций, да они здесь и не нужны
        </Text>
        <Text>
          ячейки можно редактировать - кроме столбца ID, однако пока не
          подключена валидация. Также все пока хранится внутри стейта, за
          исключением данных об измененнных ячейках - для обработки истории
          изменений создан кастомный хук useEditedCellsStorage. При вынесении
          данных и обработчиков в стор в будущем, восприятие значительно
          упростится
        </Text>
        <Text>Таблица скроллится по горизонтали при переполнении</Text>
      </Flex>
    </Center>
  );
};
