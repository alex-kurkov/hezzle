import { Table, Text } from '@mantine/core';
import React, { ChangeEventHandler, FC, useState } from 'react';
import classes from './SortableTableCell.module.scss';

interface Props {
  value: string | number;
  colKey: string;
  elementId: IElement['id'];
  isActive: boolean;
  wasEdited: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const SortableTableCell: FC<Props> = ({
  value,
  colKey,
  elementId,
  isActive,
  inputRef,
  wasEdited,
}) => {
  const [curValue, setCurValue] = useState(value);

  const [tooltipVisible, setTooltipVisible] = useState(false);

  // TODO логика валидации
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (typeof value === 'number' && /[^\d]/.test(e.target.value)) {
      setTooltipVisible(true);
      return;
    }
    if (tooltipVisible) setTooltipVisible(false);
    setCurValue(e.target.value);
  };

  return (
    <Table.Td
      data-id={elementId}
      data-colkey={colKey}
      bg={isActive ? 'blue' : wasEdited ? 'lime' : 'inherit'}
      p={10}
      m={0}
      className={classes.cell}>
      {isActive ? (
        <>
          <input
            autoFocus
            type="text"
            placeholder={String(value)}
            ref={inputRef}
            onChange={handleChange}
            onFocus={handleChange}
            value={curValue}
          />
          <Text
            className={classes.cell__tooltip}
            c="red"
            size="sm"
            data-tooltip-visible={tooltipVisible}>
            Только цифры
          </Text>
        </>
      ) : (
        <Text className={classes.cell__text} lh={2} p={10} m={0}>
          {value}
        </Text>
      )}
    </Table.Td>
  );
};
