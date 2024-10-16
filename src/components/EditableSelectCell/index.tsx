
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
) => (
    <EditableCell cellValue={cellValue} columnAlign={columnAlign}>
      <SelectInput
        value={cellValue || options[0].value}
        name={cellName}
        options={options}
        onChange={onChange}
        size="small"
      />
    </EditableCell>
);


export default EditableSelectCell;