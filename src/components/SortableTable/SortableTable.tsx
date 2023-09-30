/* eslint-disable react-hooks/exhaustive-deps */
import {
  Table,
  Flex,
  Center,
  Text,
  Title,
} from '@mantine/core';
import { useEffect, useLayoutEffect, useState } from 'react';
import { sortComparator } from '../../utils/sortComparator';
import { elements, IElement } from '../../data/elements';
import { v4 as uuidv4 } from 'uuid';
import { SortableTableHead } from '.';
import { useSearchParams } from 'react-router-dom';

export type SortOrder = 'ASC' | 'DESC';

export const SortableTable = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    'sortedBy': Object.keys(elements)[0],
    'order': 'ASC'
  });

  const [data, setData] = useState<IElement[]>([]);
  const [sortedBy, setSortedBy] = useState<keyof IElement>('id');
  const [order, setOrder] = useState<SortOrder>('ASC');

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

  useEffect(() => {
    const orderMultiplyer = order === 'ASC' ? 1 : -1;
    const sorted = [...elements].sort(
      (a, b) => sortComparator(a, b, sortedBy) * orderMultiplyer
    );
    setData(sorted);
    setSearchParams({
      sortedBy: sortedBy,
      order: order,
    });
  }, [sortedBy, order]);

  const handleSortClick = (key: keyof IElement) => {
    if (key !== sortedBy) {
      setSortedBy(key);
      setOrder('ASC');
    } else {
      setOrder((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
    }
  };

  return (
    <Center pt={200}>
      <Flex
        w="80%"
        miw={320}
        direction="column"
        gap="lg"
        justify="space-between">
        <Title mb={40}>MantineUI + React + React-router + Vite</Title>
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
          <Table.Tbody>
            {data.map((element, index) => (
              <Table.Tr key={uuidv4()}>
                <Table.Td key={`row-${index}`}>{ index + 1}</Table.Td>

                {Object.values(element).map((value) => (
                  <Table.Td key={value}>{value}</Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        <Text>
          роутер подключен для дублирования информации о столбце и направлении
          сортировки из внутреннего стейта в query-параметры адреса и легкой
          передаче этого стейта путем копирования адресной строки. Пока без
          оптимизаций и анимаций, да они здесь и не нужны
        </Text>
      </Flex>
    </Center>
  );
};
