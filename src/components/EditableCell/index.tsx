import { TableCell } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TableCellMode, TableColumnAlign } from 'types/tables';
import { editableCellStyles } from 'components/EditableCell/styles';
import { useOutsideClick } from 'hooks/outside-click';

type Props = {
  columnAlign?: TableColumnAlign;
  children: ReactNode;
  type: 'select' | 'input';
  cellValue: string | undefined;
  cellLabel?: string | undefined;
  cellEditFinished?: boolean;
};

const EditableCell = ({
  columnAlign,
  children,
  type,
  cellValue,
  cellLabel,
  cellEditFinished,
}: Props) => {
  const { t: mainT } = useTranslation('main');

  const [mode, setMode] = useState<string>(TableCellMode.normal);

  const ref = useOutsideClick(() => {
    if (type !== 'select') {
      setMode(TableCellMode.normal);
    }
  });

  const onDoubleClick = () => {
    setMode((prev) =>
      prev === TableCellMode.normal ? TableCellMode.edit : prev,
    );
  };

  const onClick = () => {
    setMode((prev) =>
      prev === TableCellMode.edit ? TableCellMode.normal : prev,
    );
  };

  useEffect(() => {
    if (cellEditFinished) {
      setMode(TableCellMode.normal);
    }
  }, [cellEditFinished]);

  return (
    <TableCell
      align={columnAlign}
      onDoubleClick={onDoubleClick}
      onClick={onClick}
      ref={ref}
      sx={editableCellStyles}
      title={
        mode === TableCellMode.normal ? mainT('table.editableCellTitle') : ''
      }
    >
      {mode === TableCellMode.normal ? cellLabel || cellValue : children}
    </TableCell>
  );
};

export default EditableCell;
