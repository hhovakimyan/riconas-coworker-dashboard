import { Table, TableBody, TableContainer, TablePagination } from '@mui/material';
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
import HupModal from 'pages/HouseConnectionPage/MontageJobsList/components/HupModal';
import JobTableRow from 'pages/HouseConnectionPage/MontageJobsList/components/JobTableRow';
import { CABEL_POSITIONS, CABEL_TYPES, TUBE_COLORS } from 'constants/montageJobs';

enum TableModalActions {
  openHupModal = 'openHupModal',
}

const cabelTypeOptions = CABEL_TYPES.map(
  (cabelType) => ({label: cabelType, value: cabelType})
);

const tubeColorOptions = TUBE_COLORS.map(
  (tubeColor) => ({label: tubeColor, value: tubeColor})
);

const cabelPositionOptions = CABEL_POSITIONS.map((position) => (
  {label: position, value: position}
));

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
    options: cabelTypeOptions,
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
    options: tubeColorOptions,
  },
  {
    id: 'cabel_length',
    label: 'table.headers.cabelLength',
    minWidth: 40,
    inputType: 'number',
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
    inputType: 'number',
  },
  {
    id: 'cabel_position',
    label: 'table.headers.cabelPosition',
    minWidth: 80,
    options: cabelPositionOptions,
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

  const tableColumnsLocalized = tableColumns.map((tableColumn) => {
    if (tableColumn.id === "cabel_position") {
      return {
        ...tableColumn,
        label: t(tableColumn.label),
        options: tableColumn.options?.map(
          (option) =>
            ({ value: option.value, label: t(`cabelPositions.${option.label}`) })
        ),
      }
    }

    return {
      ...tableColumn,
      label: t(tableColumn.label)
    }
  });

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
                            <JobTableRow
                              key={`job-${row.id}`}
                              tableColumns={tableColumnsLocalized}
                              rowData={row}
                              updateCellData={updateCellData}
                              onHupBtnClick={onHupBtnClick}
                            />
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
