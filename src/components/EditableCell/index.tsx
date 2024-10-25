import { TableCell } from '@mui/material';
import { ReactNode, useState } from 'react';

import { TableCellMode, TableColumnAlign } from 'types/generic';
import { useOutsideClick } from 'hooks/outside-click';

type Props = {
  columnAlign?: TableColumnAlign;
  children: ReactNode;
  type: 'select' | 'input',
  cellValue: string | undefined;
}

const EditableCell = ({columnAlign, children, type, cellValue}: Props) => {
  const [mode, setMode] = useState<string>(TableCellMode.normal);

  const ref = useOutsideClick(() => {
    if (type !== 'select') {
      setMode(TableCellMode.normal);
    }
  });

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
      ref={ref}
    >
      { mode === TableCellMode.normal ? cellValue : children }
    </TableCell>
  )
}


export default EditableCell;