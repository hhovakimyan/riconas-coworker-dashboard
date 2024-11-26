import React, { useState } from 'react';
import { TextField } from '@mui/material';

import { TableColumnAlign } from 'types/tables';
import EditableCell from 'components/EditableCell';

type Props = {
  cellName: string;
  cellValue: string | undefined;
  onChange: (cellNewValue: string) => void;
  columnAlign?: TableColumnAlign;
  inputType?: string;
  maxLength?: number;
};

const EditableTextFieldCell = ({
  cellName,
  cellValue,
  onChange,
  columnAlign,
  inputType,
  maxLength,
}: Props) => {
  const [value, setValue] = useState<string>(cellValue || '');
  const [editFinished, setEditFinished] = useState<boolean | null>(null);

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onBlur = () => {
    onChange(value);
  };

  const onFocus = () => {
    setEditFinished(false);
  };

  const onTextInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  const onTextInputKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      setEditFinished(true);
      onChange(value);

      event.stopPropagation();
    }
  };

  const inputProps = maxLength ? { maxLength } : {};

  return (
    <EditableCell
      cellValue={cellValue}
      columnAlign={columnAlign}
      type="input"
      cellEditFinished={editFinished || false}
    >
      <TextField
        type={inputType || 'text'}
        name={cellName}
        onChange={onTextChange}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        onClick={onTextInputClick}
        size="small"
        autoComplete="off"
        slotProps={{
          htmlInput: inputProps,
        }}
        onKeyDown={onTextInputKeyDown}
      />
    </EditableCell>
  );
};

export default EditableTextFieldCell;
