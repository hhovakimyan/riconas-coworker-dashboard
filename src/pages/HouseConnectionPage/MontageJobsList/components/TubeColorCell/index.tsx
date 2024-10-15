import { TableCell } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { JobApiListItem } from 'types/montage-jobs';
import { TableCellMode, TableColumnAlign } from 'types/generic';
import SelectInput from 'components/SelectInput';
import { TUBE_COLORS } from 'constants/montageJobs';

type Props = {
  columnAlign?: TableColumnAlign;
  rowData: JobApiListItem;
  onChange: (cellNewValue: string) => void;
}

const TubeColorCell = ({rowData, columnAlign, onChange}: Props) => {
  const { t } = useTranslation('montage-jobs', {keyPrefix: 'table.tubeColorCell'});
  const [mode, setMode] = useState<string>(TableCellMode.normal);

  const toggleCellMode = () => {
    setMode(
      (prev) =>
        prev === TableCellMode.normal ? TableCellMode.edit : TableCellMode.normal
    )
  }

  return (
    <TableCell padding="none" align={columnAlign} onClick={toggleCellMode}>
      {
        mode === TableCellMode.normal ?
          rowData.tube_color :
          <SelectInput
            value={rowData.tube_color || TUBE_COLORS[0]}
            name="tubeColor"
            options={
              TUBE_COLORS.map((cabelType) => ({label: cabelType, value: cabelType}))
            }
            label={t('tubeColor.selectLabel')}
            onChange={onChange}
          />
      }
    </TableCell>
  )
}


export default TubeColorCell