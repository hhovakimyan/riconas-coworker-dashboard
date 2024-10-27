import { Table, TableBody, TableContainer, TablePagination } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingSpinner from 'components/LoadingSpinner';
import NoDataMessage from 'components/NoDataMessage';
import { ServiceError } from 'services/helperTypes';
import { useSnackbarContext } from 'providers/Snackbar';
import TableWrapper from 'components/TableWrapper';
import { SidebarFilterProps, TableColumn } from 'types/generic';
import TableHeader from 'components/TableHeader';
import { blowInJobService } from 'services';
import {
  TABLE_DEFAULT_ROWS_PER_PAGE,
  TABLE_DEFAULT_START_PAGE,
  TABLE_ROWS_PER_PAGE_OPTIONS,
  YES_NO_OPTIONS,
} from 'constants/main';
import { JobApiListItem, JobUiListItem } from 'types/blow-in-jobs';
import { FetchJobListQueryParams } from 'services/models/BlowInJobs';
import JobTableRow from 'pages/HouseConnectionPage/BlowInJobsList/components/JobTableRow';
import {
  CABEL_TYPES,
  BAND_CODES,
  CABEL_COLORS,
  COMMENT_MAX_LENGTH,
} from 'constants/blowInJobs';
import JobGalleryModal from 'pages/HouseConnectionPage/BlowInJobsList/components/JobGalleryModal';
import {
  tableContainerStyles,
  tableStyles
} from 'pages/HouseConnectionPage/BlowInJobsList/styles';

enum TableModalActions {
  openGalleryModal = 'openGalleryModal',
}

const yesNoOptions = YES_NO_OPTIONS.map(
  (option) => ({label: option, value: option})
);

const cabelTypeOptions = CABEL_TYPES.map(
  (cabelType) => ({label: cabelType, value: cabelType})
);

const cabelColorOptions = CABEL_COLORS.map(
  (color) => ({label: color, value: color})
);

const bandCodeOptions = BAND_CODES.map((code) => (
  {label: code, value: code}
));

const tableColumns: TableColumn[] = [
  {
    id: 'location',
    label: 'table.headers.location',
    minWidth: 200,
  },
  {
    id: 'is_nvt_set',
    label: 'table.headers.isNvtSet',
    minWidth: 40,
    options: yesNoOptions,
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
    id: 'band_color_planned',
    label: 'table.headers.bandColorPlanned',
    minWidth: 20,
  },
  {
    id: 'band_code',
    label: 'table.headers.bandCode',
    minWidth: 40,
    options: bandCodeOptions,
  },
  {
    id: 'cabel_color',
    label: 'table.headers.cabelColor',
    minWidth: 40,
    options: cabelColorOptions,
  },
  {
    id: 'cabel_start',
    label: 'table.headers.cabelStart',
    minWidth: 40,
    inputType: 'number',
  },
  {
    id: 'cabel_end',
    label: 'table.headers.cabelEnd',
    minWidth: 40,
    inputType: 'number',
  },
  {
    id: 'cabel_total_length',
    label: 'table.headers.cabelTotalLength',
    minWidth: 40,
    inputType: 'number',
  },
  {
    id: 'is_blow_in_done',
    label: 'table.headers.isBlowInDone',
    minWidth: 40,
    options: yesNoOptions,
  },
  {
    id: 'comment',
    label: 'table.headers.comment',
    minWidth: 40,
    maxLength: COMMENT_MAX_LENGTH,
  },
  {
    id: 'complete_date',
    label: 'table.headers.completeDate',
    minWidth: 100,
  },
  {
    id: 'photos',
    label: 'table.headers.photos',
    minWidth: 20,
  }
];

type Props = {
  sidebarFilter: SidebarFilterProps | null;
};

const BlowInJobsList: React.FC<Props> = ({sidebarFilter}) => {
  const [page, setPage] = useState<number>(TABLE_DEFAULT_START_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState<number>(TABLE_DEFAULT_ROWS_PER_PAGE);
  const [items, setItems] = useState<JobUiListItem[]>([]);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [modalAction, setModalAction] = useState<TableModalActions | null>(null);
  const [selectedItem, setSelectedItem] = useState<JobUiListItem | undefined>(undefined);

  const { t } = useTranslation('blow-in-jobs');
  const { t: mainT } = useTranslation('main', { keyPrefix: 'yesNoSelectOptions' });

  const { setSnackbarOpen, setSnackbarMessage } = useSnackbarContext();


  const mapApiListItemToUiListItem = (apiItem: JobApiListItem): JobUiListItem => ({
      ...apiItem,
      is_nvt_set: apiItem.is_nvt_set === null ?
        '' :
        (apiItem.is_nvt_set ? mainT('yes') : mainT('no')),
      is_blow_in_done: apiItem.is_blow_in_done === null ?
        '' :
        (apiItem.is_blow_in_done ? mainT('yes') : mainT('no')),
  });

  const fetchItems = useCallback(async (
    newPage: number = TABLE_DEFAULT_START_PAGE,
    newPerPage: number = TABLE_DEFAULT_ROWS_PER_PAGE,
    // newFilter: MontageJobFilterProps | null = null,
  ) => {
    const clientId = sidebarFilter?.clientId || undefined;
    const projectId = sidebarFilter?.projectId || undefined;
    const subprojectId = sidebarFilter?.subprojectId || undefined;
    const nvtId = sidebarFilter?.nvtId || undefined;
    const fetchListResponse = await blowInJobService.fetchList(
      new FetchJobListQueryParams(
        newPage,
        newPerPage,
        clientId,
        projectId,
        subprojectId,
        nvtId
      ),
    );
    setIsLoadingList(false);
    if (fetchListResponse instanceof ServiceError) {
      setSnackbarOpen(true);
      setSnackbarMessage(t('table.failedToLoadItems'));
      return;
    }

    if (!fetchListResponse.items) {
      return;
    }

    const uiData = fetchListResponse.items.map(
      (item: JobApiListItem) => mapApiListItemToUiListItem(item)
    );

    setItems(uiData);
    setTotalCount(fetchListResponse.total_count);
  }, [sidebarFilter])

  useEffect(() => {
    setIsLoadingList(true);
    fetchItems();
  }, [fetchItems]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);

    fetchItems(newPage, rowsPerPage);
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
    );
  };

  const onGalleryBtnClick = (jobId: string) => {
    const targetItem = items.find(
      (item) => item.id === jobId
    );
    setSelectedItem(targetItem);
    setModalAction(TableModalActions.openGalleryModal);
  }

  const onModalClose = () => {
    setSelectedItem(undefined);
    setModalAction(null);
  }

  const onJobGalleryModalClose = (photosCount: number) => {
    const newItems = items.map((item) => {
      if (item.id === selectedItem?.id) {
        return {
          ...item,
          photos_count: photosCount,
        };
      }

      return item;
    });

    setItems(newItems);

    onModalClose();
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

    blowInJobService.updateProps(
      jobId,
      {
        [itemName]: itemValue,
      }
    );

    setItems(newItems);
  }

  const tableColumnsLocalized = tableColumns.map((tableColumn) => {
    if (tableColumn.id === "is_nvt_set" || tableColumn.id === "is_blow_in_done") {
      return {
        ...tableColumn,
        label: t(tableColumn.label),
        options: tableColumn.options?.map((option) => ({
            label: mainT(option.label),
            value: option.value,
        }))
      }
    }

    return {
      ...tableColumn,
      label: t(tableColumn.label)
    }
  });

  return (
    <>
      {
        isLoadingList ?
          <LoadingSpinner /> :
          (
            !isLoadingList && items.length === 0 ?
              <NoDataMessage message={t('table.noRecords')} /> :
              <TableWrapper>
                <>
                  <TableContainer sx={tableContainerStyles}>
                    <Table stickyHeader sx={tableStyles}>
                      <TableHeader columns={tableColumnsLocalized} />
                      <TableBody>
                        {items
                          .map((row) => (
                            <JobTableRow
                              key={`job-${row.id}`}
                              tableColumns={tableColumnsLocalized}
                              rowData={row}
                              updateCellData={updateCellData}
                              onGalleryBtnClick={onGalleryBtnClick}
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
        modalAction === TableModalActions.openGalleryModal &&
        selectedItem &&
        <JobGalleryModal jobId={selectedItem.id} onClose={onJobGalleryModalClose} />
      }
    </>
  );
};

export default BlowInJobsList;
