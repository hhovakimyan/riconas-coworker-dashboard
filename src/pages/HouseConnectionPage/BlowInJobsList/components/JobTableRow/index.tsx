import { TableCell, TableRow } from '@mui/material';
import React from 'react';

import LocationCell from 'pages/HouseConnectionPage/BlowInJobsList/components/LocationCell';
import EditableSelectCell from 'components/EditableSelectCell';
import EditableTextFieldCell from 'components/EditableTextFieldCell';
import { JobApiListItem } from 'types/blow-in-jobs';
import { TableColumn } from 'types/generic';
import PhotosCell from 'pages/HouseConnectionPage/MontageJobsList/components/PhotosCell';

type Props = {
  rowData: JobApiListItem;
  tableColumns: TableColumn[];
  updateCellData: (jobId: string, itemName: string, itemValue: string) => void;
  onGalleryBtnClick: (jobId: string) => void;
}

const JobTableRow = (
  {
    rowData,
    tableColumns,
    updateCellData,
    onGalleryBtnClick
  }: Props
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
            />
          )
        }

        if (["cabel_type", "cabel_color", "band_code"].includes(column.id)) {
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
          ["cabel_end", "cabel_start", "cabel_total_length", "comment"]
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

        if (column.id === "photos") {
          return (
            <PhotosCell
              key={column.id}
              photosCount={rowData.photos_count}
              onGalleryBtnClick={() => {
                onGalleryBtnClick(rowData.id);
              }}
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