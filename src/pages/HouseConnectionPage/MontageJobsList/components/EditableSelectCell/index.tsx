
import { TableColumnAlign } from 'types/generic';
import SelectInput from 'components/SelectInput';
import EditableCell from 'pages/HouseConnectionPage/MontageJobsList/components/EditableCell';

type Props = {
  cellName: string;
  cellValue: string | undefined;
  onChange: (cellNewValue: string) => void;
  options: {label: string, value: string}[];
  columnAlign?: TableColumnAlign;
  defaultValue?: string;
}

const EditableSelectCell = (
  {cellName, cellValue, onChange, options, defaultValue, columnAlign}: Props
) => (
    <EditableCell cellValue={cellValue} columnAlign={columnAlign}>
      <SelectInput
        value={cellValue || defaultValue}
        name={cellName}
        options={options}
        onChange={onChange}
        size="small"
      />
    </EditableCell>
);


export default EditableSelectCell;