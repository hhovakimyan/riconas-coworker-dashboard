
import React, { useState } from 'react';
import { TextField } from '@mui/material';

import { TableColumnAlign } from 'types/generic';
import EditableCell from 'components/EditableCell';

type Props = {
  cellName: string;
  cellValue: string | undefined;
  onChange: (cellNewValue: string) => void;
  columnAlign?: TableColumnAlign;
  inputType?: string;
  maxLength?: number;
}

const EditableTextFieldCell = (
  {cellName, cellValue, onChange, columnAlign, inputType, maxLength}: Props
) => {
  const [value, setValue] = useState<string>(cellValue || '');

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const onBlur = () => {
    onChange(value);
  }

  const onTextInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  }

  const inputProps = maxLength ? { maxLength } : {}

  return (
    <EditableCell cellValue={cellValue} columnAlign={columnAlign}>
      <TextField
        type={inputType || 'text'}
        name={cellName}
        onChange={onTextChange}
        onBlur={onBlur}
        value={value}
        onClick={onTextInputClick}
        size="small"
        autoComplete="off"
        slotProps={{
          htmlInput: inputProps,
        }}
      />
    </EditableCell>
  )
};


export default EditableTextFieldCell;