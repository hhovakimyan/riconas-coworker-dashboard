import React from 'react';
import { useTranslation } from 'react-i18next';

import { TableColumnAlign } from 'types/generic';
import SelectInput from 'components/SelectInput';
import EditableCell from 'components/EditableCell';

type Props = {
  cellName: string;
  cellValue: string | undefined;
  onChange: (cellNewValue: string) => void;
  options: {label: string, value: string}[];
  columnAlign?: TableColumnAlign;
}

const EditableSelectCell = (
  {cellName, cellValue, onChange, options, columnAlign}: Props
) => {
  const { t } = useTranslation('main');

  const allOptions = [
    {
      label: t('selectEmptyLabel'),
      value: 'none'
    },
    ...options,
  ];

  const selectedOption = options.find(
    (option) => option.value === cellValue
  );

  return (
    <EditableCell
      cellValue={cellValue}
      cellLabel={selectedOption?.label}
      columnAlign={columnAlign}
      type="select"
    >
      <SelectInput
        value={cellValue || 'none'}
        name={cellName}
        options={allOptions}
        onChange={(changedValue: string) => {
          let newCellValue = changedValue;
          if (changedValue === 'none') {
            newCellValue = '';
          }

          onChange(newCellValue);
        }}
        size="small"
      />
    </EditableCell>
  );
};


export default EditableSelectCell;