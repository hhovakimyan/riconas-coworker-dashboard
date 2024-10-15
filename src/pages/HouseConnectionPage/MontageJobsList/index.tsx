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
import { TABLE_DEFAULT_ROWS_PER_PAGE, TABLE_DEFAULT_START_PAGE, TABLE_ROWS_PER_PAGE_OPTIONS } from 'constants/main';
import { JobApiListItem } from 'types/montage-jobs';
import { FetchJobListQueryParams } from 'services/models/MontageJobs';
import LocationCell from 'pages/HouseConnectionPage/MontageJobsList/components/LocationCell';
import HupModal from 'pages/HouseConnectionPage/MontageJobsList/components/HupModal';

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
    minWidth: 40,
  },
  {
    id: 'cabel_code',
    label: 'table.headers.cabelCode',
    minWidth: 40,
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
    id: 'disabilityLength',
    label: 'table.headers.disabilityLength',
    minWidth: 40,
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
                            <React.Fragment key={`job-${row.id}`}>
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                              >
                                {tableColumns.map((column) => {
                                  const value = row[column.id as keyof object];
                                  // let value;
                                  if (column.id === "location") {
                                    return <LocationCell
                                      key={column.id}
                                      rowData={row}
                                      columnAlign={column.align}
                                      onHupBtnClick={onHupBtnClick}
                                    />
                                  }


                                  // if (column.id === "cabel_props") {
                                  //   return <CabelPropsCell key={column.id} jobData={row} columnAlign={column.align} />
                                  // } if (column.id === "hup") {
                                  //   return <HupDataCell key={column.id} jobData={row} columnAlign={column.align} />
                                  // } if (column.id === "stuff") {
                                  //   value = row.coworker || '-';
                                  // } else if (column.id === "registrationDate") {
                                  //   value = row.registrationDate;
                                  // }

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
                            </React.Fragment>
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
