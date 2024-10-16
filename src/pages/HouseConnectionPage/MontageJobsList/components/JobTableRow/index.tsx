import { TableCell, TableRow } from '@mui/material';
import React from 'react';

import LocationCell from 'pages/HouseConnectionPage/MontageJobsList/components/LocationCell';
import EditableSelectCell from 'components/EditableSelectCell';
import EditableTextFieldCell from 'components/EditableTextFieldCell';
import { JobApiListItem } from 'types/montage-jobs';
import { TableColumn } from 'types/generic';

type Props = {
  rowData: JobApiListItem;
  tableColumns: TableColumn[];
  updateCellData: (jobId: string, itemName: string, itemValue: string) => void;
  onHupBtnClick: (jobId: string) => void;
  onOntBtnClick: (jobId: string, ontId: string) => void;
}

const JobTableRow = (
  {rowData, tableColumns, updateCellData, onHupBtnClick, onOntBtnClick}: Props
) => (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      key={`job-${rowData.id}`}
    >
      {tableColumns.map((column) => {
        const value = rowData[column.id as keyof object];
        if (column.id === "location") {
          return (
            <LocationCell
              key={column.id}
              rowData={rowData}
              columnAlign={column.align}
              onHupBtnClick={onHupBtnClick}
              onOntBtnClick={onOntBtnClick}
            />
          )
        }

        if (["cabel_type", "tube_color", "cabel_position"].includes(column.id)) {
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
          )
        }

        if (
          ["cabel_code", "cabel_length", "disability_length", "comment"]
            .includes(column.id)
        ) {
          return (
            <EditableTextFieldCell
              key={column.id}
              cellName={column.id}
              inputType={column.inputType}
              cellValue={rowData[column.id as keyof object]}
              onChange={
                (newValue: string) => {
                  updateCellData(rowData.id, column.id, newValue);
                }
              }
              maxLength={column.maxLength}
            />
          )
        }

        return (
          <TableCell
            key={column.id}
            align={column.align}
          >
            {value}
          </TableCell>
        );
      })}
    </TableRow>
  )

export default JobTableRow;