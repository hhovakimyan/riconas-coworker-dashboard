import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import LocationCell from 'features/BlowInJobs/components/LocationCell';
import { UiListItem } from 'features/BlowInJobs/types';

import EditableSelectCell from 'components/EditableSelectCell';
import EditableTextFieldCell from 'components/EditableTextFieldCell';
import { TableColumn } from 'types/tables';
import TablePhotosCell from 'components/TablePhotosCell';

type Props = {
  rowData: UiListItem;
  tableColumns: TableColumn[];
  updateCellData: (jobId: string, itemName: string, itemValue: string) => void;
  onGalleryBtnClick: (jobId: string) => void;
};

const JobTableRow = ({
  rowData,
  tableColumns,
  updateCellData,
  onGalleryBtnClick,
}: Props) => (
  <TableRow hover role="checkbox" tabIndex={-1} key={`job-${rowData.id}`}>
    {tableColumns.map((column) => {
      let value: string = rowData[column.id as keyof object];
      if (column.id === 'location') {
        return (
          <LocationCell
            key={column.id}
            rowData={rowData}
            columnAlign={column.align}
          />
        );
      }

      if (column.id === 'band_color_planned') {
        value = `${rowData.band_code_planned} ${rowData.cabel_color_planned}`;
      }

      if (column.isEditable && column.options) {
        return (
          <EditableSelectCell
            key={column.id}
            cellName={column.id}
            cellValue={rowData[column.id as keyof object]}
            onChange={(newValue: string) => {
              updateCellData(rowData.id, column.id, newValue);
            }}
            options={column.options || []}
          />
        );
      }

      if (column.isEditable) {
        return (
          <EditableTextFieldCell
            key={column.id}
            cellName={column.id}
            inputType={column.inputType}
            cellValue={rowData[column.id as keyof object]}
            onChange={(newValue: string) => {
              updateCellData(rowData.id, column.id, newValue);
            }}
            maxLength={column.maxLength}
          />
        );
      }

      if (column.id === 'photos') {
        return (
          <TablePhotosCell
            key={column.id}
            photosCount={rowData.photos_count}
            onGalleryBtnClick={() => {
              onGalleryBtnClick(rowData.id);
            }}
          />
        );
      }

      return (
        <TableCell key={column.id} align={column.align}>
          {value}
        </TableCell>
      );
    })}
  </TableRow>
);

export default JobTableRow;
