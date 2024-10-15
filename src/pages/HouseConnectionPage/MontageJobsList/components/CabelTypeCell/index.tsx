import { TableCell } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { JobApiListItem } from 'types/montage-jobs';
import { TableColumnAlign } from 'types/generic';
import SelectInput from 'components/SelectInput';
import { CABEL_TYPES } from 'constants/montageJobs';

type Props = {
  columnAlign?: TableColumnAlign;
  rowData: JobApiListItem;
  onChange: (cellNewValue: string) => void;
}

const CabelTypeCell = ({rowData, columnAlign, onChange}: Props) => {
  const { t } = useTranslation('montage-jobs', {keyPrefix: 'table.cabelTypeCell'});
  const [mode, setMode] = useState<string>('normal');

  const toggleCellMode = () => {
    setMode((prev) => prev === 'normal' ? 'edit' : 'normal')
  }

  return (
    <TableCell padding="none" align={columnAlign} onClick={toggleCellMode}>
      {
        mode === 'normal' ?
          rowData.cabel_type :
          <SelectInput
            name="cabelType"
            options={
              CABEL_TYPES.map((cabelType) => ({label: cabelType, value: cabelType}))
            }
            label={t('cabelType.selectLabel')}
            onChange={onChange}
          />
      }
    </TableCell>
  )
}


export default CabelTypeCell