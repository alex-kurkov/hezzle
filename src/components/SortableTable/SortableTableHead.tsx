import { FC } from 'react';
import { Table, Flex, Text } from '@mantine/core';
import { Icon } from '../Icon';
import { v4 as uuidv4 } from 'uuid';
import { SortOrder } from '.';

interface Props {
  elements: IElement[];
  onClick: (key: keyof IElement) => void;
  sortedBy: keyof IElement;
  order: SortOrder;
}

export const SortableTableHead: FC<Props> = ({
  elements,
  order,
  sortedBy,
  onClick,
}) => {
  return (
    <Table.Thead>
      <Table.Tr>
        <Table.Th key="row-header">#</Table.Th>

        {Object.keys(elements[0]).map((key) => (
          <Table.Th key={uuidv4()}>
            <Flex justify="space-between">
              <Text size="xl">{key.toLocaleUpperCase()} </Text>
              <Icon
                type={
                  sortedBy !== key
                    ? 'arrows'
                    : order === 'ASC'
                    ? 'arrow-down'
                    : 'arrow-up'
                }
                onClick={() => onClick(key as keyof IElement)}
              />
            </Flex>
          </Table.Th>
        ))}
      </Table.Tr>
    </Table.Thead>
  );
};
