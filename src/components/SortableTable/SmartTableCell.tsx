import { Table, Text } from '@mantine/core';
import { IElement } from '../../data/elements';
import React, { ChangeEventHandler, FC, useState } from 'react';

interface Props {
  value: string | number;
  colKey: string;
  elementId: IElement['id'];
  isActive: boolean;
  wasEdited: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const SmartTableCell: FC<Props> = ({
  value,
  colKey,
  elementId,
  isActive,
  inputRef,
  wasEdited,
}) => {
  const [curValue, setCurValue] = useState(value);

  // TODO логика валидации
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCurValue(e.target.value);
  };

  return (
    <>
      <Table.Td
        data-id={elementId}
        data-key={colKey}
        bg={isActive ? 'blue' : wasEdited ? 'lime' : 'inherit'}
        style={{
          position: 'relative',
        }}>
        {isActive ? (
          <input
            autoFocus
            type="text"
            style={{
              background: 'none',
              position: 'absolute',
              top: 0,
              left: 0,
              outline: 'none',
              border: 'none',
              width: '100%',
              height: '100%',
              padding: '10px 16px',
              margin: 0,
              boxSizing: 'border-box',
            }}
            placeholder={String(value)}
            ref={inputRef}
            onChange={handleChange}
            value={curValue}
          />
        ) : (
          <Text
            style={{
              background: 'none',
              position: 'absolute',
              top: 0,
              left: 0,
              outline: 'none',
              border: 'none',
              width: '100%',
              height: '100%',
              padding: '10px 16px',
              margin: 0,
              boxSizing: 'border-box',
              lineHeight: 2,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              textWrap: 'nowrap',
            }}>
            {value}
          </Text>
        )}
      </Table.Td>
    </>
  );
};
