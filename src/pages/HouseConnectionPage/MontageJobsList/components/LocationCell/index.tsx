import { Box, Button, TableCell, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { JobApiListItem } from 'types/montage-jobs';
import { multiValueCellStyles } from 'pages/HouseConnectionPage/MontageJobsList/styles';
import {
  hupButtonsWrapperStyles,
  ontItemsListStyles,
  reportFileWrapperStyles,
} from 'pages/HouseConnectionPage/MontageJobsList/components/LocationCell/styles';
import { TableColumnAlign } from 'types/generic';
import OntItem from 'pages/HouseConnectionPage/MontageJobsList/components/LocationCell/OntItem';
import PhoneLink from 'components/PhoneLink';
import EmailLink from 'components/EmailLink';
import { HupStatus } from 'types/hups';

type Props = {
  columnAlign?: TableColumnAlign;
  rowData: JobApiListItem;
  onHupBtnClick: (jobId: string) => void;
  onOntBtnClick: (jobId: string, ontId: string) => void;
}

const LocationCell = ({rowData, columnAlign, onHupBtnClick, onOntBtnClick}: Props) => {
  const { t } = useTranslation('montage-jobs', {keyPrefix: 'table.locationCell'});

   const openHbFile = () => {
     if (rowData.hb_file_path) {
       window.location.href = rowData.hb_file_path;
     }
   }

  return (
    <TableCell
      align={columnAlign}
      sx={multiValueCellStyles}
    >
      <Box>
        <Typography fontWeight="bold">{rowData.address_line1}, {rowData.address_line2}</Typography>
        <Typography>{rowData.hup_code}</Typography>
        <Box className="hupBox">
          <Typography>{rowData.hup_customer_name}</Typography>
          <PhoneLink phoneNumber={rowData.hup_customer_phone_number1} />
          <br/>
          {
            rowData.hup_customer_phone_number2 &&
            <PhoneLink phoneNumber={rowData.hup_customer_phone_number2} />
          }
          <Typography>
            <EmailLink emailAddress={rowData.hup_customer_email} />
          </Typography>
          <Box sx={hupButtonsWrapperStyles}>
            <Button
              variant="contained"
              color={rowData.hup_status === HupStatus.INSTALLED ? 'success' : 'info'}
              onClick={() => { onHupBtnClick(rowData.id) }}
            >
                {t('hupAssembly')}
            </Button>
            <Button variant="contained" color="warning">{t('dispatcherFeedback')}</Button>
          </Box>
        </Box>
        <Box className="ontItemsList" sx={ontItemsListStyles}>
          {
            rowData.ont.map((ontItem) =>
              <OntItem
                key={`ont-${ontItem.id}`}
                data={ontItem}
                onOntActivationBtnClick={(ontId: string) => {
                  onOntBtnClick(rowData.id, ontId);
                }}
              />
            )
          }
        </Box>
        <Box className="reportFiles" sx={reportFileWrapperStyles}>
          {
            rowData.hb_file_path &&
            <Button
              variant="outlined"
              onClick={openHbFile}
              startIcon={<PictureAsPdfIcon />}
            >
              HB
            </Button>
          }
        </Box>
      </Box>
    </TableCell>
  )
}


export default LocationCell