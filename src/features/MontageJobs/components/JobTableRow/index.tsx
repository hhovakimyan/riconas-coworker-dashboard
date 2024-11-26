import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import LocationCell from 'features/MontageJobs/components/LocationCell';
import CabelCodePlannedCell from 'features/MontageJobs/components/CabelCodeCell';
import { ApiListItem } from 'features/MontageJobs/types/jobs';

import EditableSelectCell from 'components/EditableSelectCell';
import EditableTextFieldCell from 'components/EditableTextFieldCell';
import { TableColumn } from 'types/tables';
import TablePhotosCell from 'components/TablePhotosCell';

type Props = {
  rowData: ApiListItem;
  tableColumns: TableColumn[];
  updateCellData: (jobId: string, itemName: string, itemValue: string) => void;
  onHupBtnClick: (jobId: string) => void;
  onHupDispatcherBtnClick: (jobId: string) => void;
  onOntDispatcherBtnClick: (jobId: string, ontId: string) => void;
  onOntBtnClick: (jobId: string, ontId: string) => void;
  onGalleryBtnClick: (jobId: string) => void;
};

const JobTableRow = ({
  rowData,
  tableColumns,
  updateCellData,
  onHupBtnClick,
  onHupDispatcherBtnClick,
  onOntDispatcherBtnClick,
  onOntBtnClick,
  onGalleryBtnClick,
}: Props) => (
  <TableRow hover role="checkbox" tabIndex={-1} key={`job-${rowData.id}`}>
    {tableColumns.map((column) => {
      const value = rowData[column.id as keyof object];
      if (column.id === 'location') {
        return (
          <LocationCell
            key={column.id}
            rowData={rowData}
            columnAlign={column.align}
            onHupBtnClick={onHupBtnClick}
            onHupDispatcherBtnClick={onHupDispatcherBtnClick}
            onOntDispatcherBtnClick={onOntDispatcherBtnClick}
            onOntBtnClick={onOntBtnClick}
          />
        );
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

      if (column.id === 'cabel_code_planned') {
        return <CabelCodePlannedCell key={column.id} rowData={rowData} />;
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
