import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingSpinner from 'components/LoadingSpinner';
import NoDataMessage from 'components/NoDataMessage';
import { ServiceError } from 'services/helperTypes';
import { useSnackbarContext } from 'providers/Snackbar';
import TableWrapper from 'components/TableWrapper';
import { TableColumn } from 'types/generic';
import TableHeader from 'components/TableHeader';
import { montageJobService } from 'services';
import {
  TABLE_DEFAULT_ROWS_PER_PAGE,
  TABLE_DEFAULT_START_PAGE,
  TABLE_ROWS_PER_PAGE_OPTIONS
} from 'constants/main';
import { JobApiListItem } from 'types/montage-jobs';
import { FetchJobListQueryParams } from 'services/models/MontageJobs';
import LocationCell from 'pages/HouseConnectionPage/MontageJobsList/components/LocationCell';
import HupModal from 'pages/HouseConnectionPage/MontageJobsList/components/HupModal';
import EditableSelectCell from 'pages/HouseConnectionPage/MontageJobsList/components/EditableSelectCell';
import { CABEL_TYPES, TUBE_COLORS } from 'constants/montageJobs';
import EditableTextFieldCell from 'pages/HouseConnectionPage/MontageJobsList/components/EditableTextFieldCell';

enum TableModalActions {
  openHupModal = 'openHupModal',
}

const tableColumns: TableColumn[] = [
  {
    id: 'location',
    label: 'table.headers.location',
    minWidth: 300,
  },
  {
    id: 'cabel_type_planned',
    label: 'table.headers.cabelTypePlanned',
    minWidth: 40,
  },
  {
    id: 'cabel_type',
    label: 'table.headers.cabelType',
    minWidth: 40,
  },
  {
    id: 'cabel_code_planned',
    label: 'table.headers.cabelCodePlanned',
    minWidth: 100,
  },
  {
    id: 'cabel_code',
    label: 'table.headers.cabelCode',
    minWidth: 100,
  },
  {
    id: 'tube_color_planned',
    label: 'table.headers.tubeColorPlanned',
    minWidth: 40,
  },
  {
    id: 'tube_color',
    label: 'table.headers.tubeColor',
    minWidth: 40,
  },
  {
    id: 'cabel_length',
    label: 'table.headers.cabelLength',
    minWidth: 40,
  },
  {
    id: 'comment',
    label: 'table.headers.comment',
    minWidth: 40,
  },
  {
    id: 'disability_length',
    label: 'table.headers.disabilityLength',
    minWidth: 40,
  },
  {
    id: 'cabel_position',
    label: 'table.headers.cabelPosition',
    minWidth: 80,
  },
  {
    id: 'completeDate',
    label: 'table.headers.completeDate',
    minWidth: 100,
  },
  {
    id: 'photos',
    label: 'table.headers.photos',
    minWidth: 20,
  }
];

const cabelTypeOptions = CABEL_TYPES.map((cabelType) => ({label: cabelType, value: cabelType}));

const tubeColorOptions = TUBE_COLORS.map((cabelType) => ({label: cabelType, value: cabelType}));

const MontageJobsList = () => {
  const [page, setPage] = useState<number>(TABLE_DEFAULT_START_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState<number>(TABLE_DEFAULT_ROWS_PER_PAGE);
  const [items, setItems] = useState<JobApiListItem[]>([]);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [modalAction, setModalAction] = useState<TableModalActions | null>(null);
  const [selectedItem, setSelectedItem] = useState<JobApiListItem | undefined>(undefined);

  // const [filter, setFilter] = useState<MontageJobFilterProps | null>(null);

  const { t } = useTranslation('montage-jobs');

  const { setSnackbarOpen, setSnackbarMessage } = useSnackbarContext();

  const fetchItems = async (
    newPage: number = TABLE_DEFAULT_START_PAGE,
    newPerPage: number = TABLE_DEFAULT_ROWS_PER_PAGE,
    // newFilter: MontageJobFilterProps | null = null,
  ) => {
    // const projectId = newFilter?.project ? newFilter.project.value : undefined;
    const fetchListResponse = await montageJobService.fetchList(
      new FetchJobListQueryParams(newPage, newPerPage),
    );
    setIsLoadingList(false);
    if (fetchListResponse instanceof ServiceError) {
      setSnackbarOpen(true);
      setSnackbarMessage(t('failedToLoadItems'));
      return;
    }

    if (!fetchListResponse.items) {
      return;
    }

    setItems(fetchListResponse.items);
    setTotalCount(fetchListResponse.total_count);
  };

  useEffect(() => {
    setIsLoadingList(true);
    fetchItems();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);

    fetchItems(
      newPage,
      rowsPerPage,
      // filter,
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newRowsPerPage = +event.target.value;

    setRowsPerPage(newRowsPerPage);
    setPage(TABLE_DEFAULT_START_PAGE);

    fetchItems(
      TABLE_DEFAULT_START_PAGE,
      newRowsPerPage,
      // filter,
    );
  };

  // const onFilter = (newFilter: NvtFilterProps | null) => {
  //   setFilter(newFilter);
  //   fetchItems(page, rowsPerPage, newFilter);
  // }

  const onHupBtnClick = (jobId: string) => {
    const targetItem = items.find(
      (item) => item.id === jobId
    );
    setSelectedItem(targetItem);
    setModalAction(TableModalActions.openHupModal);
  }

  const onModalClose = () => {
    setSelectedItem(undefined);
    setModalAction(null);
  }

  const updateCellData = (jobId: string, itemName: string, itemValue: string) => {
    const newItems = items.map((item) => {
      if (item.id === jobId) {
        return {
          ...item,
          [itemName]: itemValue,
        }
      }

      return item;
    });
    setItems(newItems);
  }

  const tableColumnsLocalized = tableColumns.map((tableColumn) => ({
    ...tableColumn,
    label: t(tableColumn.label)
  }));

  return (
    <>
      {/* <JobFilterBlock onFilter={onFilter} filter={filter} /> */}
      {
        isLoadingList ?
          <LoadingSpinner /> :
          (
            !isLoadingList && items.length === 0 ?
              <NoDataMessage message={t('table.noRecords')} /> :
              <TableWrapper>
                <>
                  <TableContainer>
                    <Table>
                      <TableHeader columns={tableColumnsLocalized} />
                      <TableBody>
                        {items
                          .map((row) => (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={`job-${row.id}`}
                            >
                              {tableColumns.map((column) => {
                                const value = row[column.id as keyof object];
                                if (column.id === "location") {
                                  return (
                                    <LocationCell
                                      key={column.id}
                                      rowData={row}
                                      columnAlign={column.align}
                                      onHupBtnClick={onHupBtnClick}
                                    />
                                  )
                                }

                                if (column.id === "cabel_type") {
                                  return (
                                    <EditableSelectCell
                                      key={column.id}
                                      cellName='cabelType'
                                      cellValue={row.cabel_type}
                                      onChange={(newValue: string) => {
                                        updateCellData(row.id, 'cabel_type', newValue);
                                      }}
                                      options={cabelTypeOptions}
                                      defaultValue={CABEL_TYPES[0]}
                                    />
                                  )
                                }

                                if (column.id === "tube_color") {
                                  return (
                                    <EditableSelectCell
                                      key={column.id}
                                      cellName="tubeColor"
                                      cellValue={row.tube_color}
                                      onChange={(newValue: string) => {
                                        updateCellData(row.id, 'tube_color', newValue);
                                      }}
                                      options={tubeColorOptions}
                                      defaultValue={TUBE_COLORS[0]}
                                    />
                                  )
                                }

                                if (column.id === "cabel_code") {
                                  return (
                                    <EditableTextFieldCell
                                      key={column.id}
                                      cellName="cabelCode"
                                      cellValue={row.cabel_code}
                                      onChange={
                                        (newValue: string) => {
                                          updateCellData(row.id, 'cabel_code', newValue);
                                        }
                                      }
                                    />
                                  )
                                }

                                if (column.id === "cabel_length") {
                                  return (
                                    <EditableTextFieldCell
                                      key={column.id}
                                      inputType="number"
                                      cellName="cabelLength"
                                      cellValue={row.cabel_length?.toString()}
                                      onChange={
                                        (newValue: string) => {
                                          updateCellData(row.id, 'cabel_length', newValue);
                                        }
                                      }
                                    />
                                  )
                                }

                                if (column.id === "disability_length") {
                                  return (
                                    <EditableTextFieldCell
                                      key={column.id}
                                      inputType="number"
                                      cellName="disabilityLength"
                                      cellValue={row.disability_length?.toString()}
                                      onChange={
                                        (newValue: string) => {
                                          updateCellData(row.id, 'disability_length', newValue);
                                        }
                                      }
                                    />
                                  )
                                }

                                return (
                                  <TableCell
                                    padding="none"
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={TABLE_ROWS_PER_PAGE_OPTIONS}
                    component="div"
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </>
              </TableWrapper>
          )
      }
      {
        modalAction === TableModalActions.openHupModal &&
        selectedItem &&
        <HupModal jobData={selectedItem} onClose={onModalClose} />
      }
    </>
  );
};

export default MontageJobsList;
