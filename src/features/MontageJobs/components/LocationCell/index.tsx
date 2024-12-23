import { Box, Button, TableCell, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  hupButtonsWrapperStyles,
  ontItemsListStyles,
  reportFileWrapperStyles,
} from 'features/MontageJobs/components/LocationCell/styles';
import OntItem from 'features/MontageJobs/components/LocationCell/OntItem';
import TbFileButton from 'features/MontageJobs/components/LocationCell/TbFileButton';
import HbFileButton from 'features/MontageJobs/components/LocationCell/HbFileButton';
import { ApiListItem } from 'features/MontageJobs/types/jobs';
import { Status } from 'features/MontageJobs/types/hups';

import { multiValueCellStyles } from 'pages/HouseConnectionPage/MontageJobsList/styles';
import { TableColumnAlign } from 'types/tables';
import PhoneLink from 'components/PhoneLink';
import EmailLink from 'components/EmailLink';

type Props = {
  columnAlign?: TableColumnAlign;
  rowData: ApiListItem;
  onHupBtnClick: (jobId: string) => void;
  onHupDispatcherBtnClick: (jobId: string) => void;
  onOntBtnClick: (jobId: string, ontId: string) => void;
  onOntDispatcherBtnClick: (jobId: string, ontId: string) => void;
};

const LocationCell = ({
  rowData,
  columnAlign,
  onHupBtnClick,
  onHupDispatcherBtnClick,
  onOntBtnClick,
  onOntDispatcherBtnClick,
}: Props) => {
  const { t } = useTranslation('montage-jobs', {
    keyPrefix: 'table.locationCell',
  });

  return (
    <TableCell align={columnAlign} sx={multiValueCellStyles}>
      <Box>
        <Typography fontWeight="bold">
          {rowData.address_line1}, {rowData.address_line2}
        </Typography>
        <Typography>{rowData.hup_code}</Typography>
        <Box className="hupBox">
          <Typography>{rowData.hup_customer_name}</Typography>
          <PhoneLink phoneNumber={rowData.hup_customer_phone_number1} />
          <br />
          {rowData.hup_customer_phone_number2 && (
            <PhoneLink phoneNumber={rowData.hup_customer_phone_number2} />
          )}
          <Typography>
            <EmailLink emailAddress={rowData.hup_customer_email} />
          </Typography>
          <Box sx={hupButtonsWrapperStyles}>
            <Button
              variant="contained"
              color={
                rowData.hup_status === Status.INSTALLED ? 'success' : 'info'
              }
              onClick={() => {
                onHupBtnClick(rowData.id);
              }}
            >
              {t('hupAssembly')}
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                onHupDispatcherBtnClick(rowData.id);
              }}
            >
              {t('dispatcherFeedback')}
            </Button>
          </Box>
        </Box>
        <Box className="ontItemsList" sx={ontItemsListStyles}>
          {rowData.ont.map((ontItem) => (
            <OntItem
              key={`ont-${ontItem.id}`}
              data={ontItem}
              onOntActivationBtnClick={(ontId: string) => {
                onOntBtnClick(rowData.id, ontId);
              }}
              onOntDispatcherBtnClick={(ontId: string) => {
                onOntDispatcherBtnClick(rowData.id, ontId);
              }}
            />
          ))}
        </Box>
        <Box className="reportFiles" sx={reportFileWrapperStyles}>
          {rowData.tb_file_path && (
            <TbFileButton filePath={rowData.tb_file_path} />
          )}
          {rowData.hb_file_path && (
            <HbFileButton filePath={rowData.hb_file_path} />
          )}
        </Box>
      </Box>
    </TableCell>
  );
};

export default LocationCell;
