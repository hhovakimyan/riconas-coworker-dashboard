
export type SearchedValueType = {
  name: string;
  value: string;
}

export type TableColumnAlign = 'inherit' | 'left' | 'center' | 'right' | 'justify';

export interface TableColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: TableColumnAlign;
  format?: (value: number) => string;
  options?: {label: string, value: string}[];
  inputType?: string;
}

export enum TableCellMode {
  normal = 'normal',
  edit = 'edit',
}