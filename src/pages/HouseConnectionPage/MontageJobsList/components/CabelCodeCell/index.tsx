import { TableCell, TextField } from '@mui/material';
import React, { useState } from 'react';

import { JobApiListItem } from 'types/montage-jobs';
import { TableCellMode, TableColumnAlign } from 'types/generic';

type Props = {
  columnAlign?: TableColumnAlign;
  rowData: JobApiListItem;
  onChange: (cellNewValue: string) => void;
}

const CabelCodeCell = ({rowData, columnAlign, onChange}: Props) => {
  const [mode, setMode] = useState<string>(TableCellMode.normal);
  const [value, setValue] = useState<string>(rowData.cabel_code || '');

  const toggleCellMode = () => {
    setMode((prev) => prev === TableCellMode.normal ? TableCellMode.edit : TableCellMode.normal)
  }

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const onBlur = () => {
    onChange(value);
  }

  const onTextInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  }

  return (
    <TableCell
      align={columnAlign}
      onClick={toggleCellMode}
    >
      {
        mode === TableCellMode.normal ?
          rowData.cabel_code :
          <TextField
            name="cabelCode"
            onChange={onTextChange}
            onBlur={onBlur}
            value={value}
            onClick={onTextInputClick}
            size={'small'}
            autoComplete="off"
          />
      }
    </TableCell>
  )
}


export default CabelCodeCell