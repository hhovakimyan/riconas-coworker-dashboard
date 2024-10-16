import { TableCell } from '@mui/material';
import { ReactNode, useState } from 'react';

import { TableCellMode, TableColumnAlign } from 'types/generic';

type Props = {
  columnAlign?: TableColumnAlign;
  children: ReactNode;
  cellValue: string | undefined;
}

const EditableCell = ({columnAlign, children, cellValue}: Props) => {
  const [mode, setMode] = useState<string>(TableCellMode.normal);

  const onDoubleClick = () => {
    setMode((prev) => prev === TableCellMode.normal ? TableCellMode.edit : prev);
  }

  const onClick = () => {
    setMode((prev) => prev === TableCellMode.edit ? TableCellMode.normal : prev);
  }

  return (
    <TableCell
      align={columnAlign}
      onDoubleClick={onDoubleClick}
      onClick={onClick}
    >
      { mode === TableCellMode.normal ? cellValue : children }
    </TableCell>
  )
}


export default EditableCell;