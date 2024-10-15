import { Box, Button, Link, TableCell, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { HupStatus, JobApiListItem } from 'types/montage-jobs';
import { multiValueCellStyles } from 'pages/HouseConnectionPage/MontageJobsList/styles';
import { hupButtonsWrapperStyles } from 'pages/HouseConnectionPage/MontageJobsList/components/styles';
import { TableColumnAlign } from 'types/generic';

type Props = {
  columnAlign?: TableColumnAlign;
  rowData: JobApiListItem;
}

const LocationCell = ({rowData, columnAlign}: Props) => {
  const { t } = useTranslation('montage-jobs', {keyPrefix: 'table.locationCell'});

  return (
    <TableCell
      padding="none"
      align={columnAlign}
      sx={multiValueCellStyles}
    >
      <Box>
        <Typography fontWeight="bold">{rowData.address_line1}, {rowData.address_line2}</Typography>
        <Typography>{rowData.hup_code}</Typography>
        <Box className="hupBox">
          <Typography>{rowData.hup_customer_name}</Typography>
          <Link href={`tel:${rowData.hup_customer_phone_number1}`}>{rowData.hup_customer_phone_number1}</Link>
          <br/>
          {
            rowData.hup_customer_phone_number2 &&
            <Link href={`tel:${rowData.hup_customer_phone_number2}`}>{rowData.hup_customer_phone_number2}</Link>
          }
          <Typography>
            <Link href={`mailto:${rowData.hup_customer_email}`}>{rowData.hup_customer_email}</Link>
          </Typography>
          <Box sx={hupButtonsWrapperStyles}>
            <Button
              variant="contained"
              color={rowData.hup_status === HupStatus.INSTALLED ? 'success' : 'info'}>
                {t('hupAssembly')}
            </Button>
            <Button variant="contained" color="warning">{t('dispatcherFeedback')}</Button>
          </Box>
        </Box>
      </Box>
    </TableCell>
  )
}


export default LocationCell