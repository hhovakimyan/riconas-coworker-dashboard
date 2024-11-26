import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import HupModal from 'features/MontageJobs/components/HupModal';
import JobTableRow from 'features/MontageJobs/components/JobTableRow';
import JobGalleryModal from 'features/MontageJobs/components/JobGalleryModal';
import OntModal from 'features/MontageJobs/components/OntModal';
import DispatcherModal from 'features/MontageJobs/components/DispatcherModal';
import { ApiListItem, OntListItem } from 'features/MontageJobs/types/jobs';
import { Status as HupStatus } from 'features/MontageJobs/types/hups';
import { Status as OntStatus } from 'features/MontageJobs/types/ont';
import {
  CABEL_POSITIONS,
  CABEL_TYPES,
  COMMENT_MAX_LENGTH,
  TUBE_COLORS,
} from 'features/MontageJobs/constants/table';
import { FetchListQueryParams } from 'features/MontageJobs/services/models/Jobs';
import { jobTableService } from 'features/MontageJobs/services';
import { useAppSelector } from 'store/hooks';

import LoadingSpinner from 'components/LoadingSpinner';
import NoDataMessage from 'components/NoDataMessage';
import { ServiceError } from 'services/helperTypes';
import { useSnackbarContext } from 'providers/Snackbar';
import TableWrapper from 'components/TableWrapper';
import { TableColumn } from 'types/tables';
import TableHeader from 'components/TableHeader';
import {
  TABLE_DEFAULT_ROWS_PER_PAGE,
  TABLE_DEFAULT_START_PAGE,
  TABLE_ROWS_PER_PAGE_OPTIONS,
} from 'constants/main';
import {
  tableContainerStyles,
  tableStyles,
} from 'pages/HouseConnectionPage/MontageJobsList/styles';

enum TableModalActions {
  openHupModal = 'openHupModal',
  openOntModal = 'openOntModal',
  openGalleryModal = 'openGalleryModal',
  openHupDispatcherModal = 'openHupDispatcherModal',
  openOntDispatcherModal = 'openOntDispatcherModal',
}

const cabelTypeOptions = CABEL_TYPES.map((cabelType) => ({
  label: cabelType,
  value: cabelType,
}));

const tubeColorOptions = TUBE_COLORS.map((tubeColor) => ({
  label: tubeColor,
  value: tubeColor,
}));

const cabelPositionOptions = CABEL_POSITIONS.map((position) => ({
  label: position,
  value: position,
}));

const tableColumns: TableColumn[] = [
  {
    id: 'location',
    label: 'table.headers.location',
    minWidth: 400,
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
    isEditable: true,
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
    isEditable: true,
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
    isEditable: true,
  },
  {
    id: 'cabel_length',
    label: 'table.headers.cabelLength',
    minWidth: 40,
    inputType: 'number',
    isEditable: true,
  },
  {
    id: 'comment',
    label: 'table.headers.comment',
    minWidth: 40,
    maxLength: COMMENT_MAX_LENGTH,
    isEditable: true,
  },
  {
    id: 'disability_length',
    label: 'table.headers.disabilityLength',
    minWidth: 40,
    inputType: 'number',
    isEditable: true,
  },
  {
    id: 'cabel_position',
    label: 'table.headers.cabelPosition',
    minWidth: 80,
    options: cabelPositionOptions,
    isEditable: true,
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
  },
];

const MontageJobsList = () => {
  const sidebarFilter = useAppSelector((state) => state.sidebar.filter);

  const [page, setPage] = useState<number>(TABLE_DEFAULT_START_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    TABLE_DEFAULT_ROWS_PER_PAGE,
  );
  const [items, setItems] = useState<ApiListItem[]>([]);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [modalAction, setModalAction] = useState<TableModalActions | null>(
    null,
  );
  const [selectedItem, setSelectedItem] = useState<ApiListItem | undefined>(
    undefined,
  );
  const [selectedOnt, setSelectedOnt] = useState<OntListItem | undefined>(
    undefined,
  );

  // const [filter, setFilter] = useState<MontageJobFilterProps | null>(null);

  const { t } = useTranslation('montage-jobs');

  const { setSnackbarOpen, setSnackbarMessage } = useSnackbarContext();

  const fetchItems = useCallback(
    async (
      newPage: number = TABLE_DEFAULT_START_PAGE,
      newPerPage: number = TABLE_DEFAULT_ROWS_PER_PAGE,
      // newFilter: MontageJobFilterProps | null = null,
    ) => {
      const clientId = sidebarFilter?.clientId || undefined;
      const projectId = sidebarFilter?.projectId || undefined;
      const subprojectId = sidebarFilter?.subprojectId || undefined;
      const nvtId = sidebarFilter?.nvtId || undefined;
      const fetchListResponse = await jobTableService.fetchList(
        new FetchListQueryParams(
          newPage,
          newPerPage,
          clientId,
          projectId,
          subprojectId,
          nvtId,
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

      setItems(fetchListResponse.items);
      setTotalCount(fetchListResponse.total_count);
    },
    [sidebarFilter],
  );

  useEffect(() => {
    setIsLoadingList(true);
    fetchItems();
  }, [fetchItems]);

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
    const targetItem = items.find((item) => item.id === jobId);
    setSelectedItem(targetItem);
    setModalAction(TableModalActions.openHupModal);
  };

  const onHupDispatcherBtnClick = (jobId: string) => {
    const targetItem = items.find((item) => item.id === jobId);
    setSelectedItem(targetItem);
    setModalAction(TableModalActions.openHupDispatcherModal);
  };

  const onOntDispatcherBtnClick = (jobId: string, ontItemId: string) => {
    const targetItem = items.find((item) => item.id === jobId);
    if (!targetItem || !targetItem.ont) {
      return;
    }

    const targetItemOnt = targetItem.ont.find(
      (ontItem) => ontItem.id === ontItemId,
    );
    if (!targetItemOnt) {
      return;
    }

    setSelectedItem(targetItem);
    setSelectedOnt(targetItemOnt);
    setModalAction(TableModalActions.openOntDispatcherModal);
  };

  const onGalleryBtnClick = (jobId: string) => {
    const targetItem = items.find((item) => item.id === jobId);
    setSelectedItem(targetItem);
    setModalAction(TableModalActions.openGalleryModal);
  };

  const onOntBtnClick = (jobId: string, ontItemId: string) => {
    const targetItem = items.find((item) => item.id === jobId);
    if (!targetItem || !targetItem.ont) {
      return;
    }

    const targetItemOnt = targetItem.ont.find(
      (ontItem) => ontItem.id === ontItemId,
    );
    if (!targetItemOnt) {
      return;
    }

    setSelectedItem(targetItem);
    setSelectedOnt(targetItemOnt);
    setModalAction(TableModalActions.openOntModal);
  };

  const onModalClose = () => {
    setSelectedItem(undefined);
    setModalAction(null);
    setSelectedOnt(undefined);
  };

  const onHupModalClose = (newHupStatus?: HupStatus) => {
    if (newHupStatus) {
      const newItems = items.map((item) => {
        if (item.id === selectedItem?.id) {
          return {
            ...item,
            hup_status: newHupStatus,
          };
        }

        return item;
      });

      setItems(newItems);
    }

    onModalClose();
  };

  const onOntModalClose = (newOntStatus?: OntStatus) => {
    if (newOntStatus) {
      const newItems = items.map((item) => {
        if (item.id === selectedItem?.id) {
          const newOntItems = item.ont.map((itemOnt) => {
            if (itemOnt.id === selectedOnt?.id) {
              return {
                ...itemOnt,
                status: newOntStatus,
              };
            }

            return itemOnt;
          });

          return {
            ...item,
            ont: newOntItems,
          };
        }

        return item;
      });

      setItems(newItems);
    }

    onModalClose();
  };

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
  };

  const updateCellData = (
    jobId: string,
    itemName: string,
    itemValue: string,
  ) => {
    const newItems = items.map((item) => {
      if (item.id === jobId) {
        return {
          ...item,
          [itemName]: itemValue,
        };
      }

      return item;
    });

    if (itemName === 'comment') {
      jobTableService.saveComment(jobId, { comment: itemValue });
    } else {
      jobTableService.updateCabelProps(jobId, {
        [itemName]: itemValue,
      });
    }

    setItems(newItems);
  };

  const tableColumnsLocalized = tableColumns.map((tableColumn) => {
    if (tableColumn.id === 'cabel_position') {
      return {
        ...tableColumn,
        label: t(tableColumn.label),
        options: tableColumn.options?.map((option) => ({
          value: option.value,
          label: t(`cabelPositions.${option.label}`),
        })),
      };
    }

    return {
      ...tableColumn,
      label: t(tableColumn.label),
    };
  });

  return (
    <>
      {isLoadingList ? (
        <LoadingSpinner />
      ) : !isLoadingList && items.length === 0 ? (
        <NoDataMessage message={t('table.noRecords')} />
      ) : (
        <TableWrapper>
          <>
            <TableContainer sx={tableContainerStyles}>
              <Table stickyHeader sx={tableStyles}>
                <TableHeader columns={tableColumnsLocalized} />
                <TableBody>
                  {items.map((row) => (
                    <JobTableRow
                      key={`job-${row.id}`}
                      tableColumns={tableColumnsLocalized}
                      rowData={row}
                      updateCellData={updateCellData}
                      onHupBtnClick={onHupBtnClick}
                      onHupDispatcherBtnClick={onHupDispatcherBtnClick}
                      onOntDispatcherBtnClick={onOntDispatcherBtnClick}
                      onOntBtnClick={onOntBtnClick}
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
      )}
      {modalAction === TableModalActions.openHupModal && selectedItem && (
        <HupModal jobData={selectedItem} onClose={onHupModalClose} />
      )}
      {modalAction === TableModalActions.openGalleryModal && selectedItem && (
        <JobGalleryModal
          jobId={selectedItem.id}
          onClose={onJobGalleryModalClose}
        />
      )}
      {modalAction === TableModalActions.openOntModal &&
        selectedItem &&
        selectedOnt && (
          <OntModal
            ontId={selectedOnt.id}
            ontCode={selectedOnt.code}
            onClose={onOntModalClose}
            jobData={selectedItem}
          />
        )}
      {modalAction === TableModalActions.openHupDispatcherModal &&
        selectedItem && (
          <DispatcherModal
            jobData={selectedItem}
            onClose={onModalClose}
            submitFormData={(data) => {
              console.log(data);
            }}
          />
        )}
      {modalAction === TableModalActions.openOntDispatcherModal &&
        selectedItem &&
        selectedOnt && (
          <DispatcherModal
            jobData={selectedItem}
            onClose={onModalClose}
            submitFormData={(data) => {
              console.log(data);
            }}
          />
        )}
    </>
  );
};

export default MontageJobsList;
