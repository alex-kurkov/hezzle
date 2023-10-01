import { Table, Text } from '@mantine/core';
import { IElement } from '../../data/elements';
import React, { ChangeEventHandler, FC, useState } from 'react';
import classes from './SortableTableCell.module.scss';

interface Props {
  value: string | number;
  colKey: string;
  elementId: IElement['id'];
  isActive: boolean;
  wasEdited: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  key: string;
}

export const SortableTableCell: FC<Props> = ({
  value,
  colKey,
  elementId,
  isActive,
  inputRef,
  wasEdited,
  key,
}) => {
  const [curValue, setCurValue] = useState(value);

  // TODO логика валидации
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCurValue(e.target.value);
  };

  return (
    <Table.Td
        key={key}
        data-id={elementId}
        data-key={colKey}
        bg={isActive ? 'blue' : wasEdited ? 'lime' : 'inherit'}
        p={10}
        m={0}
        className={classes.cell}>
        {isActive ? (
          <input
            autoFocus
            type="text"
            placeholder={String(value)}
            ref={inputRef}
            onChange={handleChange}
            value={curValue}
          />
        ) : (
          <Text
            className={classes.cell__text}
            lh={2}
            p={10}
            m={0}>
            {value}
          </Text>
        )}
      </Table.Td>
  );
};
